"use client"
import React, { useEffect, useRef, useState } from 'react'

const SheetClient = () => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [shapes ,setShapes] = useState([])
 
    

    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas) {
            const ctx = canvas.getContext("2d")
            if (!ctx) return
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = "rgba(0,0,0)"
            
            
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            let startX = 0;
            let startY = 0;
            

            const mouseDownHandler = (e: MouseEvent) => {
                startX = e.clientX
                startY = e.clientY
                console.log(startX , startY);
                
            }

            const mouseUpHandler = (e : MouseEvent)=>{
                console.log("end" , e.clientX );
                
                ctx.clearRect(0,0,canvas.width,canvas.height)
                ctx.beginPath()
                ctx.strokeStyle = "rgba(255,255,255)"
                ctx.rect(startX , startY ,100 , 200)
                ctx.stroke()
                
                ctx.fillRect(0,0,canvas.width , canvas.height)
            }

            canvas.addEventListener("mousedown", mouseDownHandler)
            canvas.addEventListener("mouseup",mouseUpHandler)



        }
    }, [])

    return (
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} style={{ height: "100vh", overflow: "hidden" }}>

        </canvas>
    )
}

export default SheetClient
