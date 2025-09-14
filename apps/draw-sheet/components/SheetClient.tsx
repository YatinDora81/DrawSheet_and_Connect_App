"use client"

import { useEffect, useRef, useState } from "react"
import BottomBar from "./BottomBar"
import RightBar from "./RightBar"
import SideBar from "./SideBar"
import { Game } from "../utils/Game"
import { Tool } from "../utils/Types"
import toast, { Toaster } from "react-hot-toast"
import { LiaDownloadSolid } from "react-icons/lia"
import { useSocket } from "../hooks/useSocket"
import { GET_ALL_CHATS } from "@repo/config/URL"
import { toast_darktheme } from "../utils/toast-darktheme"
import { AuthProvider } from "../hooks/useAuth"
import { AvatarProvider } from "../hooks/useAvatars"
import { authenticatedFetch } from "@repo/ui/tokenManager"
import { useDevice } from "../hooks/useDevice"
import SheetMobileView from "./SheetMobileView"


function SheetClient({ sheetId }: { sheetId: string }) {

  const [game, setGame] = useState<Game | null>(null)
  const [selectedTool, setSelectedTool] = useState<Tool>("pencil")
  const [lineWidth, setLineWidth] = useState(5)
  const [color, setColor] = useState("#2A85FF") //blue color
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [textTool, setTextTool] = useState("")
  const [currCords, setCurrCords] = useState<{ x: number, y: number } | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const textAreaDivRef = useRef<HTMLDivElement | null>(null);
  const { socket } = useSocket()
  const [currOnlineUsers, setCurrOnlineUsers] = useState<number>(1)
  const [isBarOpen, setIsBarOper] = useState(false)


  useEffect(() => {
    if (socket?.OPEN === 1) {
      JoinAndSubscribeToRoom()
    }
    return () => {
      unSubscribeToRoom()
    }
  }, [socket])

  const JoinAndSubscribeToRoom = () => {
    if (socket?.OPEN) {
      // socket.send(JSON.stringify({
      //     type: "join",
      //     payload: {
      //         roomId: currRoom.id
      //     }
      // }))
      socket?.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: sheetId
        }
      }))
      socket.send(JSON.stringify({
        type: "subscribe",
        payload: {
          roomId: sheetId
        }
      }))
      socket.send(JSON.stringify({
        type: "get-online-users"
      }))
    }
  }

  const unSubscribeToRoom = () => {
    if (socket?.OPEN) {
      socket.send(JSON.stringify({
        type: "unsubscribe",
        payload: {
          roomId: sheetId
        }
      }))
    }
  }

  const loadPreviousChat = async () => {

    const res = authenticatedFetch(GET_ALL_CHATS + `/${sheetId}`, { method: "GET", credentials: "include" }).then(async (res) => {
      const d = await res.json()
      if (d.success) {
        // console.log('ferq', d.data.map((m: any) => JSON.parse(m?.message)));
        game?.addBufferShapes(d?.data?.map((m: any) => JSON.parse(m?.message)))
        game?.render()
      }
      else {
        throw new Error(d.message || 'Something Went Wrong!!!');
      }
    }).catch((err) => {
      throw new Error(err.message || 'Something Went Wrong!!!');
    })

    await toast.promise(
      res,
      {
        loading: "Fetching drawings...",
        success: "Drawings fetched successfully ",
        error: "Failed to fetch drawings ",
      },
      toast_darktheme
    )

  }

  const incommingMessages = () => {

    if (socket?.OPEN) {

      socket.onmessage = (ev) => {

        const obj = JSON.parse(ev.data)
        if (obj.type === "chat") {

          // setChats((prev) => [...prev, obj.data])
          if (game) {
            game.addBufferShapes([JSON.parse(obj?.data?.message)])
            game.render()
            console.log("datat", [JSON.parse(obj?.data?.message)]);
          }
          else console.log("lolaa");

        }
        else if (obj.type === "online-users" && obj?.data?.roomId === sheetId) {
          setCurrOnlineUsers(obj.data.online_count)
          // {
          //     type: "online-users",
          //     success: true,
          //     data: {
          //         online_count: uniqueUsers.size,
          //         users : uniqueUsers,
          //         roomId,
          //     },
          //     message: "user is online😊"
          // }
        }

      }
    }

  }

  useEffect(() => {
    if (game) {
      incommingMessages()
      loadPreviousChat()
    }
  }, [game])

  const addingTextHandler = () => {
    if (currCords) {
      textAreaRef.current?.blur()
      setCurrCords(null)
      if (textTool.trim().length !== 0 && game) game.addTextBox(textTool, color, `${lineWidth * 5}px Arial`, currCords)
      setTextTool("")
    }
  }

  useEffect(() => {
    if (canvasRef.current && game === null && socket?.OPEN === 1) {
      const canvas = canvasRef.current
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      setGame(new Game(canvas, selectedTool, lineWidth, color, socket, sheetId))

    }

    return () => {
      if (!game) return
      game.deConstructor()
    }

  }, [canvasRef.current, socket])

  useEffect(() => {
    if (textAreaDivRef.current && currCords) {
      const divElement = textAreaDivRef.current
      const wheelStopper = (e: WheelEvent) => {
        e.stopPropagation();
        e.preventDefault();
      };
      divElement.addEventListener("wheel", wheelStopper)

      return () => {
        divElement.removeEventListener("wheel", wheelStopper)
      }
    }
  }, [currCords])

  useEffect(() => {
    if (!game) return
    game.changeTool(selectedTool)
  }, [selectedTool])

  useEffect(() => {
    if (!game) return
    game.changeColor(color)
  }, [color])

  useEffect(() => {
    if (!game) return
    game.changeLineWidth(lineWidth)
  }, [lineWidth])

  const downloadCanvasAsImageHandler = () => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const image = canvas.toDataURL('/image/png')
    const link = document.createElement("a")
    link.href = image
    link.download = 'draw-sheet.png'
    link.click()
    toast('', {
      icon: (
        <div className="flex items-center justify-start gap-1 p-2" style={{ padding: "0.15rem" }}>
          <LiaDownloadSolid className="text-green-400 text-lg" />
          <span className="text-sm font-medium text-white font-serif">Drawing saved!</span>
        </div>
      ),
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
      duration: 3000,
    });
  }

  return (
    <>
      <div className=" w-full h-full block lg:hidden"><SheetMobileView /></div>
      <div className=" h-full relative hidden lg:block">

        {/* Add resize here when screen size changes */}

        <Toaster
          position="bottom-right"
          reverseOrder={false} />
        <SideBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} downloadCanvasAsImageHandler={downloadCanvasAsImageHandler} />
        <BottomBar selectedColor={color} setSelectedColor={setColor} lineWidth={lineWidth} setLineWidth={setLineWidth} />

        <AuthProvider>
          <AvatarProvider>
            <RightBar isBarOpen={isBarOpen} setIsBarOper={setIsBarOper} currOnlineUsers={currOnlineUsers} sheetId={sheetId} />
          </AvatarProvider>
        </AuthProvider>

        <canvas onClick={(e) => {
          if (selectedTool === "textbox" && !currCords) setCurrCords({ x: e.clientX, y: e.clientY })
          else if (selectedTool === "textbox") addingTextHandler()
        }} ref={canvasRef} className={` h-full w-full ${selectedTool === "hand" ? 'cursor-move' : 'cursor-crosshair'}`}></canvas>
        {currCords !== null && selectedTool === 'textbox' &&
          <div
            ref={textAreaDivRef}
            className={`absolute overflow-hidden  `}
            style={{
              top: currCords.y,
              left: currCords.x,
              width: `calc(100% - ${currCords.x}px)`,
              height: `calc(100% - ${currCords.y}px)`,
              zIndex: 1
            }}
          >
            <div
              className=" bg-transparent w-full h-full absolute z-10"
              onClick={() => addingTextHandler}
            ></div>
            <textarea
              autoFocus={true}
              className={`w-full  h-full outline-none resize-none overflow-hidden bg-transparent border-none no-underline caret-white `}
              value={textTool}
              spellCheck={false}
              ref={textAreaRef}
              onChange={(e) => setTextTool(e.target.value)}
              onBlur={addingTextHandler}
              style={{
                fontSize: `calc(${lineWidth * 5 * (game?.scale || 1)}px)`,
                fontFamily: 'sans-serif',
                lineHeight: '1',
                color: color,
              }}
            /></div>}

      </div>
    </>
  )
}

export default SheetClient