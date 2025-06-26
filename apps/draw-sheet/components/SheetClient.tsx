"use client"

import { useEffect, useRef, useState } from "react"
import BottomBar from "./BottomBar"
import RightBar from "./RightBar"
import SideBar from "./SideBar"
import { Game } from "../utils/Game"
import { Tool } from "../utils/Types"

function SheetClient() {

  const [game, setGame] = useState<Game | null>(null)
  const [selectedTool, setSelectedTool] = useState<Tool>("rectangle")
  const [lineWidth, setLineWidth] = useState(1)
  const [color, setColor] = useState("rgb(59 130 246)")
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

  return (
    <div className=" h-full relative">


      {/* Add resize here when screen size changes */}



      <SideBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
      <BottomBar />
      <RightBar />
      <canvas ref={canvasRef} className=" h-full w-full "></canvas>
    </div>
  )
}

export default SheetClient