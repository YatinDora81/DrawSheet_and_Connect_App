"use client"
type Tool = "rect" | "circle" | "pencil"

// type LineWidth =

type Shape = {
    type: "rect",
    startX: number,
    startY: number,
    width: number,
    height: number
} | {
    type: "circle",
    startX: number,
    startY: number,
    radius: number
} | {
    type : 'pencil',
    xCord : number[],
    yCord : number[]
}

export class Game {
    private existingShapes: Shape[]
    private startX: number
    private startY: number
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D | null
    private isClicked: boolean = false
    selectedTool: Tool


    constructor(canvas: HTMLCanvasElement) {
        this.startX = 0
        this.startY = 0
        this.existingShapes = [] // get from backend
        this.selectedTool = "circle"
        this.canvas = canvas
        this.isClicked = false
        this.ctx = canvas.getContext("2d")

        this.init()

        this.addEventHandler();

    }

    init() {
        if (!this.ctx) return
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.fillStyle = "rgba(0,0,0)"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }


    addEventHandler() {
        this.canvas.addEventListener("mousedown", this.mouseDownEventHandler)
        this.canvas.addEventListener("mouseup", this.mouseUpEventHandler)
        this.canvas.addEventListener("mousemove", this.mouseMoveEventHandler)
    }

    mouseDownEventHandler = (e: MouseEvent) => {
        this.isClicked = true
        this.startX = e.clientX
        this.startY = e.clientY
    }

    mouseUpEventHandler = (e: MouseEvent) => {
        this.isClicked = false

        let shape: Shape | null = null
        if (this.selectedTool === "rect") {
            shape = {
                type: "rect",
                startX: this.startX,
                startY: this.startY,
                width: e.clientX - this.startX,
                height: e.clientY - this.startY
            }
        }
        else if (this.selectedTool === "circle") {
            const height = Math.abs(e.clientY - this.startY)
            const width = Math.abs(e.clientX - this.startX)
            shape = {
                type: "circle",
                startX: this.startX,
                startY: this.startY,
                radius: Math.max(height, width) / 2
            }
        }
        else if(this.selectedTool==="pencil"){
            
        }
        if (!shape) return;
        this.existingShapes.push(shape);

        // send socket message here

    }

    mouseMoveEventHandler = (e: MouseEvent) => {
        if (this.isClicked) {
            if (!this.ctx) return

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.fillStyle = "rgba(0,0,0)"
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

            const endX = e.clientX;
            const endY = e.clientY

            this.existingShapes.forEach((shape: Shape) => {
                if (shape.type === "rect") this.drawRect(shape.startX, shape.startY, shape.width, shape.height)
                else if (shape.type === "circle") this.drawCircle(shape.startX,shape.startY,shape.radius)
            })


            if (this.selectedTool === "rect") {
                const width = endX - this.startX;
                const height = endY - this.startY;

                this.ctx.strokeStyle = "rgba(255,255,255)"
                this.ctx.strokeRect(this.startX, this.startY, width, height)
            }
            else if (this.selectedTool === "circle") {
                const height = Math.abs(e.clientY - this.startY)
                const width = Math.abs(e.clientX - this.startX)
                const radius = Math.max(height, width) / 2
                this.ctx.beginPath()
                this.ctx.strokeStyle = "rgba(255,255,255)"
                this.ctx.arc(this.startX, this.startY, radius, 0, 360)
                this.ctx.stroke()
            }


        }
    }

    drawRect = (startX: number, startY: number, width: number, height: number) => {
        if (!this.ctx) return
        this.ctx.strokeStyle = "rgba(255,255,255)"
        this.ctx.strokeRect(startX, startY, width, height)
    }
    drawCircle = (startX: number,startY: number,radius: number)=>{
        if(!this.ctx) return
        this.ctx.beginPath()
        this.ctx.strokeStyle = "rgba(255,255,255)"
        this.ctx.arc(startX,startY,radius,0,360)
        this.ctx.stroke()
    }

}