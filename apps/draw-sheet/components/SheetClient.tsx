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

  return (
    <div className=" h-full relative">


      {/* Add resize here when screen size changes */}



      <SideBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
      <BottomBar selectedColor={color} setSelectedColor={setColor} lineWidth={lineWidth} setLineWidth={setLineWidth} />
      <RightBar />
      <canvas ref={canvasRef} className=" h-full w-full "></canvas>
    </div>
  )
}

export default SheetClient