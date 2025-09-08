"use client"

import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react"
import { BASE_WS_URL } from "@repo/config/URL"
import toast from "react-hot-toast"
import { toast_darktheme } from "../utils/toast-darktheme"


interface SocketInterface {
    socket: WebSocket | null
    socketLoading: boolean,
    setSocketLoading: React.Dispatch<React.SetStateAction<boolean>>,
    connectWs: () => Promise<void>,
    disconnectWs: () => void
}

const SocketContext = createContext<SocketInterface | null>(null)

export const SocketProvider = ({ children }: { children: ReactNode }) => {

    const socket = useRef<WebSocket | null>(null)
    const [socketLoading, setSocketLoading] = useState<boolean>(false)

    const getCookie = (cookieName: string) => {
        return document.cookie.split("; ").find((s) => s.startsWith(cookieName))?.split("=")[1] || ""
    }


    const connectWs = async () => {
        try {
            setSocketLoading(true)
            const token = getCookie("authToken");

            await toast.promise(
                new Promise<string>((resolve, reject) => {
                    const ws = new WebSocket(BASE_WS_URL + `?token=${token}`);

                    ws.onopen = () => {
                        socket.current = ws;
                        resolve("WS Connected Successfully");
                    };

                    ws.onerror = (err) => {
                        reject("Failed to connect WebSocket");
                    };

                    ws.onmessage = (ev) => {
                        const obj = JSON.parse(ev.data);
                        if (obj.type === "error") {
                            console.log("WS ", obj);
                            toast.error(obj.message);
                        } else if (obj.type === "notification") {
                            // toast(obj.message)
                        }
                    };
                }),
                {
                    loading: "Connecting WebSocket...",
                    success: (msg: string) => msg,
                    error: (err: string) => err,
                },
                toast_darktheme
            );
        } catch (error) {
            console.log("Error at connecting socket", error);
        }finally{
            setSocketLoading(false)
        }
    };


    const disconnectWs = () => {
        if (socket.current) {
            socket.current.onopen = null;
            socket.current.onmessage = null;
            socket.current.onerror = null;
            socket.current.onclose = null;
            socket.current.close();
            socket.current = null;
            setSocketLoading(false)
            console.log("Ws Disconnected!!!");
        }
    }

    useEffect(() => {
        connectWs()
        return () => {
            disconnectWs()
        }
    }, [])

    return <SocketContext.Provider value={{ socket: socket.current, socketLoading, setSocketLoading, connectWs, disconnectWs }}>{children}</SocketContext.Provider>
}

export const useSocket = () => {
    const context = useContext(SocketContext)
    if (!context) throw new Error("Wrap Component with SocketProvider")
    return context
}