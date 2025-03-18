"use client"
type Tool = "rect" | "circle"

// type LineWidth =

type Shape = {
    type: "rect",
    startX: number,
    startY: number,
    width: number,
    height: number
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
        this.selectedTool = "rect"
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

            this.existingShapes.forEach((shape : Shape)=>{
                if(shape.type==="rect") this.drawRect( shape.startX , shape.startY , shape.width , shape.height )
            })


            if (this.selectedTool === "rect") {
                const width = endX - this.startX;
                const height = endY - this.startY;

                this.ctx.strokeStyle = "rgba(255,255,255)"
                this.ctx.strokeRect(this.startX, this.startY, width, height)

            }


        }
    }

    drawRect = (startX : number , startY : number, width : number, height : number) => {
        if(!this.ctx) return
        this.ctx.strokeStyle = "rgba(255,255,255)"
        this.ctx.strokeRect(startX, startY, width, height)
    }

}