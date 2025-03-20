"use client"
type Tool = "rect" | "circle" | "pencil" | "textbox"

// type LineWidth =
// add redraw function
// add size in text
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
    type: 'pencil',
    startPoints: { x: number, y: number }
    cords: { x: number, y: number }[],
} | {
    type : "textbox",
    startX : number,
    startY : number,
    text : string,
    font : string
}

export class Game {
    private existingShapes: Shape[]
    private startX: number
    private startY: number
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D | null
    private isClicked: boolean = false
    private localCords: { x: number, y: number }[];
    private localText : string
    selectedTool: Tool


    constructor(canvas: HTMLCanvasElement) {
        this.startX = 0
        this.startY = 0
        this.existingShapes = [] // get from backend
        this.selectedTool = "textbox"
        this.canvas = canvas
        this.isClicked = false
        this.ctx = canvas.getContext("2d")
        this.localCords = []
        this.localText = ""

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
        else if (this.selectedTool === "pencil") {
            shape = {
                type: "pencil",
                startPoints: { x: this.startX, y: this.startY },
                cords: [...this.localCords]
            }
            this.localCords = []
        }
        else if(this.selectedTool==="textbox"){
            // shape = {
            //     type : "textbox",
            //     startX : this.startX,
            //     startY : this.startY,
            //     text : this.localText,
            //     font : "20px Arial"
            // }
        }
        if (!shape) return;
        this.existingShapes.push(shape);


        // send socket message here

    }

    reDraw = () => {
        if (!this.ctx) return

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.fillStyle = "rgba(0,0,0)"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.existingShapes.forEach((shape: Shape) => {
            if (shape.type === "rect") this.drawRect(shape.startX, shape.startY, shape.width, shape.height)
            else if (shape.type === "circle") this.drawCircle(shape.startX, shape.startY, shape.radius)
            else if (shape.type === "pencil") this.drawPencil(shape.startPoints, shape.cords)
        })

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
                else if (shape.type === "circle") this.drawCircle(shape.startX, shape.startY, shape.radius)
                else if (shape.type === "pencil") this.drawPencil(shape.startPoints, shape.cords)
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
            else if (this.selectedTool === "pencil") {
                this.localCords.push({ x: e.clientX, y: e.clientY })
                this.ctx.beginPath()
                this.ctx.strokeStyle = "rgba(255,255,255)"
                this.ctx.moveTo(this.startX, this.startY)
                this.localCords.forEach(({ x, y }) => this.ctx?.lineTo(x, y))
                this.ctx.stroke()
            }


        }
    }

    drawRect = (startX: number, startY: number, width: number, height: number) => {
        if (!this.ctx) return
        this.ctx.strokeStyle = "rgba(255,255,255)"
        this.ctx.strokeRect(startX, startY, width, height)
    }
    drawCircle = (startX: number, startY: number, radius: number) => {
        if (!this.ctx) return
        this.ctx.beginPath()
        this.ctx.strokeStyle = "rgba(255,255,255)"
        this.ctx.arc(startX, startY, radius, 0, 360)
        this.ctx.stroke()
    }
    drawPencil = (startPoints: { x: number, y: number }, cords: { x: number, y: number }[]) => {
        if (!this.ctx) return
        this.ctx.beginPath()
        this.ctx.strokeStyle = "rgba(255,255,255)"
        this.ctx.moveTo(startPoints.x, startPoints.y)
        cords.forEach((cord) => this.ctx?.lineTo(cord.x, cord.y))
        this.ctx.stroke()
    }

}