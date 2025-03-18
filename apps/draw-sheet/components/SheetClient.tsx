"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Game } from '../utils/Game'

const SheetClient = () => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [game , setGame] = useState<Game | null>();

    console.log(game);
    

    useEffect(()=>{
        if(canvasRef.current){
            const g = new Game(canvasRef.current);
            setGame(g)
            
            return ()=>{
                console.log("Hello");
                
            }
        }
    } , [canvasRef])



    // useEffect(() => {
    //     const canvas = canvasRef.current
    //     if (!canvas) return
    //     const ctx = canvas.getContext("2d")
    //     if (!ctx) return

    //     ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    //     ctx.fillStyle = "rgba(0,0,0)"
    //     ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    //     let startX = 0
    //     let startY = 0
    //     let isClicked = false

    //     const mouseDownHandler = (e: MouseEvent) => {
    //         startX = e.clientX
    //         startY = e.clientY
    //         isClicked = true
    //     }

    //     const mouseUpHandler = (e: MouseEvent) => {
    //         ctx.clearRect(0, 0, 1500, 700)
    //         ctx.fillStyle = "rgba(0,0,0)"
    //         ctx.fillRect(0, 0, 1500, 700);

    //         ctx.strokeStyle = "rgba(255,255,255)"
    //         ctx.lineWidth = 10
    //         ctx.strokeRect(startX, startY, e.clientX - startX, e.clientY - startY)

    //         // isClicked = false

    //         // ctx.rect( startX , startY , e.clientX - startX , e.clientY - startY )
    //         // ctx.stroke()
    //         // ctx.fillRect(0,0,window.innerWidth , window.innerHeight);

    //     }

    //     canvas.addEventListener("mousedown", mouseDownHandler)
    //     canvas.addEventListener("mouseup", mouseUpHandler)
    //     // canvas.addEventListener("mousemove", (e) => {
    //     //     if (isClicked) {
    //     //         ctx.clearRect(0, 0, 1500, 700)
    //     //         ctx.fillStyle = "rgba(0,0,0)"
    //     //         ctx.fillRect(0, 0, 1500, 700);

    //     //         ctx.strokeStyle = "rgba(255,255,255)"
    //     //         ctx.strokeRect(startX, startY, e.clientX - startX, e.clientY - startY)
    //     //     }
    //     // })

    // }, [canvasRef])

    return (
        <canvas ref={canvasRef} width={1500} height={700} style={{ overflow: "hidden" }}>

        </canvas>
    )
}

export default SheetClient
