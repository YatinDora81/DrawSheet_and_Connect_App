"use client"

import { useEffect, useRef } from "react"

const HEALTH_CHECK_INTERVAL_MS = 5000
const HEALTH_CHECK_TIMEOUT_MS = 4500

type HealthTargetName = "http-server" | "ws-server" | "worker1" | "worker2"

type HealthStatus = "ok" | "reachable" | "down"

type HealthTarget = {
  name: HealthTargetName
  url: string
}

// NEXT_PUBLIC_* vars are inlined by Next.js only when written as full static member
// expressions, so each one is read directly here (never destructured or indexed).
const CONFIGURED_TARGETS: { name: HealthTargetName; url: string | undefined }[] = [
  { name: "http-server", url: process.env.NEXT_PUBLIC_HTTP_BASE_URL },
  { name: "ws-server", url: process.env.NEXT_PUBLIC_WS_HTTP_BASE_URL },
  { name: "worker1", url: process.env.NEXT_PUBLIC_WORKER1_BASE_URL },
  { name: "worker2", url: process.env.NEXT_PUBLIC_WORKER2_BASE_URL },
]

const HEALTH_TARGETS: HealthTarget[] = CONFIGURED_TARGETS
  .filter((target): target is HealthTarget => typeof target.url === "string" && target.url.length > 0)
  .map((target) => ({ name: target.name, url: target.url.replace(/\/$/, "") }))

const HealthCheck = () => {

  const isRunningRef = useRef<boolean>(false)

  useEffect(() => {
    if (HEALTH_TARGETS.length === 0) return

    let cancelled = false
    const controllers = new Set<AbortController>()

    const pingTarget = async (target: HealthTarget): Promise<HealthStatus> => {
      const url = `${target.url}/health`
      const controller = new AbortController()
      controllers.add(controller)
      const timeoutId = setTimeout(() => controller.abort(), HEALTH_CHECK_TIMEOUT_MS)
      try {
        const response: Response = await fetch(url, { signal: controller.signal, cache: "no-store" })
        return response.ok ? "ok" : "down"
      } catch {
        // Server asleep or CORS headers missing: retry once opaquely so the request still
        // reaches the server and keeps it warm. The retry needs its own controller because
        // the first one may already have been aborted by its timeout.
        if (cancelled) return "down"
        const retryController = new AbortController()
        controllers.add(retryController)
        const retryTimeoutId = setTimeout(() => retryController.abort(), HEALTH_CHECK_TIMEOUT_MS)
        try {
          await fetch(url, { mode: "no-cors", cache: "no-store", signal: retryController.signal })
          return "reachable"
        } catch {
          return "down"
        } finally {
          clearTimeout(retryTimeoutId)
          controllers.delete(retryController)
        }
      } finally {
        clearTimeout(timeoutId)
        controllers.delete(controller)
      }
    }

    const runRound = async (): Promise<void> => {
      if (cancelled || isRunningRef.current) return
      isRunningRef.current = true
      try {
        const settled = await Promise.allSettled(HEALTH_TARGETS.map((target) => pingTarget(target)))
        if (cancelled) return
        const results: Record<string, HealthStatus> = {}
        settled.forEach((outcome, index) => {
          const target = HEALTH_TARGETS[index]
          if (!target) return
          results[target.name] = outcome.status === "fulfilled" ? outcome.value : "down"
        })
        console.log("[health]", results)
      } finally {
        // Only the live effect may release the guard: a stale round left over from a
        // StrictMode remount must not unlock a round that is still in flight.
        if (!cancelled) isRunningRef.current = false
      }
    }

    void runRound()
    const intervalId = setInterval(() => {
      void runRound()
    }, HEALTH_CHECK_INTERVAL_MS)

    return () => {
      cancelled = true
      clearInterval(intervalId)
      controllers.forEach((controller) => controller.abort())
      controllers.clear()
      isRunningRef.current = false
    }
  }, [])

  return null
}

export default HealthCheck
