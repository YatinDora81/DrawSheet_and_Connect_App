"use client"

import { useEffect, useRef, useState } from "react"
import BottomBar from "./BottomBar"
import RightBar from "./RightBar"
import SideBar from "./SideBar"
import { Game } from "../utils/Game"
import { Tool } from "../utils/Types"
import toast, { Toaster } from "react-hot-toast"
import { IoIosDownload } from "react-icons/io"
import { MdOutlineDownloadDone } from "react-icons/md"
import { LiaDownloadSolid } from "react-icons/lia"


function SheetClient() {

  const [game, setGame] = useState<Game | null>(null)
  const [selectedTool, setSelectedTool] = useState<Tool>("rectangle")
  const [lineWidth, setLineWidth] = useState(5)
  const [color, setColor] = useState("#2A85FF") //blue color
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (canvasRef.current && game === null) {
      const canvas = canvasRef.current
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      setGame(new Game(canvas, selectedTool, lineWidth, color))
    }

    return () => {
      if (!game) return
      game.deConstructor()
    }

  }, [canvasRef.current])

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
      duration: 3000,  // Optional: fade after 3 seconds
    });
  }

  return (
    <div className=" h-full relative">


      {/* Add resize here when screen size changes */}


      <Toaster
        position="bottom-right"
        reverseOrder={false} />
      <SideBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} downloadCanvasAsImageHandler={downloadCanvasAsImageHandler} />
      <BottomBar selectedColor={color} setSelectedColor={setColor} lineWidth={lineWidth} setLineWidth={setLineWidth} />
      <RightBar />
      <canvas ref={canvasRef} className=" h-full w-full "></canvas>
    </div>
  )
}

export default SheetClient