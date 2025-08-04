
// add redraw function
// add size in text

import { Canvas_BG_COLOR, Circle, Pencil, Rectangle, Shape, Textbox, Tool } from "./Types"

export class Game {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D | null
    private shapes: Shape[]
    private bufferShapes: Shape[]
    private startX: number
    private startY: number
    private clicked: boolean
    private tool: Tool
    private panning: { panX: number, panY: number }
    private lastPanning: { panX: number, panY: number }
    private startClientX: number
    private startClientY: number
    public scale: number
    private color: string
    private lineWidth: number
    private lineWidthMultiplier = 0.6
    private localPencilCoords: { x: number, y: number }[]

    constructor(canvas: HTMLCanvasElement, tool: Tool, lineWidth: number, color: string) {
        this.canvas = canvas
        this.ctx = canvas.getContext("2d")
        this.shapes = []
        this.bufferShapes = []
        this.startX = 0
        this.startY = 0
        this.startClientX = 0
        this.startClientY = 0
        this.clicked = false
        this.panning = { panX: 0, panY: 0 }
        this.lastPanning = { panX: 0, panY: 0 }
        this.scale = 1
        this.tool = tool
        this.color = color
        this.lineWidth = lineWidth * this.lineWidthMultiplier
        this.localPencilCoords = []

        this.init()
    }

    deConstructor() {
        this.removeEventListeners()
    }

    private init() {
        if (!this.ctx) return
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.fillStyle = Canvas_BG_COLOR
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.addEventListeners()
        this.render()
    }

    private addEventListeners() {
        this.canvas.addEventListener("mousedown", this.mouseDownHandler)
        this.canvas.addEventListener("mouseup", this.mouseUpHandler)
        this.canvas.addEventListener("mousemove", this.mouseMoveHandler)
        this.canvas.addEventListener("wheel", this.wheelHandler)
    }

    private removeEventListeners() {
        this.canvas.removeEventListener("mousedown", this.mouseDownHandler)
        this.canvas.removeEventListener("mouseup", this.mouseUpHandler)
        this.canvas.removeEventListener("mousemove", this.mouseMoveHandler)
        this.canvas.removeEventListener("wheel", this.wheelHandler)
    }

    private toCanvasCoords(clientX: number, clientY: number) {
        // const rect = this.canvas.getBoundingClientRect();
        const x = (clientX - this.panning.panX) / this.scale;  //- rect.left
        const y = (clientY - this.panning.panY) / this.scale;   // - rect.top 
        return { x, y };
    }

    private mouseDownHandler = (e: MouseEvent) => {
        const { x, y } = this.toCanvasCoords(e.clientX, e.clientY)
        this.startX = x
        this.startY = y
        this.clicked = true


        this.startClientX = e.clientX
        this.startClientY = e.clientY

        if (this.tool === "hand") {
            this.lastPanning = { panX: this.panning.panX, panY: this.panning.panY }
        }
        // else if (this.tool === 'pencil') {
        //     this.localPencilCoords.length = 0
        //     this.localPencilCoords.push({ x: this.startX, y: this.startY })
        // }
    }

    private mouseUpHandler = (e: MouseEvent) => {
        this.clicked = false

        if (this.bufferShapes.length > 0) {
            this.shapes = [...this.shapes, ...this.bufferShapes]
            this.bufferShapes.length = 0
        }

        if (this.tool === "rectangle") {
            const { x, y } = this.toCanvasCoords(e.clientX, e.clientY)
            const rectangle: Rectangle = {
                type: "rectangle",
                startX: this.startX,
                startY: this.startY,
                endX: x,
                endY: y,
                color: this.color,
                lineWidth: this.lineWidth
            }

            this.shapes.push(rectangle)
        }
        else if (this.tool === 'circle') {
            const { x, y } = this.toCanvasCoords(e.clientX, e.clientY)
            const circle: Circle = {
                type: "circle",
                startX: this.startX,
                startY: this.startY,
                endX: x,
                endY: y,
                color: this.color,
                lineWidth: this.lineWidth
            }

            this.shapes.push(circle)
        }
        else if (this.tool === 'pencil') {

            const pencil: Pencil = {
                type: "pencil",
                startPoints: { x: this.startX, y: this.startY },
                cords: [...this.localPencilCoords],
                color: this.color,
                lineWidth: this.lineWidth
            }

            this.shapes.push(pencil)

            this.localPencilCoords.length = 0
        }


        this.render()

    }

    private mouseMoveHandler = (e: MouseEvent) => {
        if (!this.clicked || !this.ctx) return

        if (this.bufferShapes.length > 0) {
            this.shapes = [...this.shapes, ...this.bufferShapes]
            this.bufferShapes.length = 0
        }



        const { x, y } = this.toCanvasCoords(e.clientX, e.clientY)
        if (this.tool === "hand") {
            this.panning.panX = this.lastPanning.panX + e.clientX - this.startClientX
            this.panning.panY = this.lastPanning.panY + e.clientY - this.startClientY
            this.render()
        }
        else if (this.tool === "rectangle") {
            this.render()
            this.ctx.strokeStyle = this.color
            this.ctx.lineWidth = this.lineWidth
            this.ctx.strokeRect(this.startX, this.startY, x - this.startX, y - this.startY)
        }
        else if (this.tool === "circle") {
            this.render()

            const width = x - this.startX;
            const height = y - this.startY;
            const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
            const centerX = this.startX + width / 2;
            const centerY = this.startY + height / 2;

            this.ctx.beginPath();
            this.ctx.strokeStyle = this.color;
            this.ctx.lineWidth = this.lineWidth;
            this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            this.ctx.stroke();
        }
        else if (this.tool === 'pencil') {
            this.render()

            this.localPencilCoords.push({ x, y })

            this.ctx.beginPath();
            this.ctx.strokeStyle = this.color;
            this.ctx.lineWidth = this.lineWidth;
            this.ctx.moveTo(this.startX, this.startY)
            this.localPencilCoords.forEach(({ x, y }) => {
                if (!this.ctx) return
                this.ctx.lineTo(x, y)
            })
            this.ctx.stroke()
        }
    }


    private render() {

        if (!this.ctx) return

        // Clear screen
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.fillStyle = Canvas_BG_COLOR
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.setTransform(this.scale, 0, 0, this.scale, this.panning.panX, this.panning.panY);

        // draw shapes
        this.shapes.forEach((shape: Shape) => {
            if (shape.type === "rectangle") this.drawRectangle(shape)
            else if (shape.type === 'circle') this.drawCircle(shape)
            else if (shape.type === 'pencil') this.drawPencil(shape)
            else if (shape.type === 'textbox') this.drawTextBox(shape)
        })

    }

    private drawTextBox = (shape: Textbox) => {
        if (!this.ctx) return
        
        this.ctx.font = shape.fontStyle;
        this.ctx.fillStyle = shape.color;
        this.ctx.textBaseline = 'top'; // optional: aligns better
        this.ctx.fillText(shape.text, shape.startX, shape.startY);

    }

    private drawPencil = (shape: Pencil) => {
        if (!this.ctx) return

        this.ctx.beginPath();
        this.ctx.strokeStyle = shape.color;
        this.ctx.lineWidth = shape.lineWidth;
        this.ctx.moveTo(shape.startPoints.x, shape.startPoints.y)
        shape.cords.forEach(({ x, y }) => {
            if (!this.ctx) return
            this.ctx.lineTo(x, y)
        })
        this.ctx.stroke()
    }

    private drawCircle = (shape: Circle) => {
        if (!this.ctx) return

        const width = shape.endX - shape.startX;
        const height = shape.endY - shape.startY;
        const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
        const centerX = shape.startX + width / 2;
        const centerY = shape.startY + height / 2;

        this.ctx.beginPath();
        this.ctx.strokeStyle = shape.color;
        this.ctx.lineWidth = shape.lineWidth;
        this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        this.ctx.stroke();

    }

    private drawRectangle = (shape: Rectangle) => {
        if (!this.ctx) return
        this.ctx.strokeStyle = shape.color
        this.ctx.lineWidth = shape.lineWidth
        this.ctx.strokeRect(shape.startX, shape.startY, shape.endX - shape.startX, shape.endY - shape.startY)

    }

    private wheelHandler = (e: WheelEvent) => {
        e.preventDefault()
        if (e.ctrlKey || e.metaKey) {
            if (!this.ctx) return
            let zoomFactor = 0.03;
            let zoom = e.deltaY > 0 ? -zoomFactor : zoomFactor;
            this.scale = Math.min(7, Math.max(0.1, this.scale + zoom));

        }
        else {
            this.panning.panX -= e.deltaX
            this.panning.panY -= e.deltaY
        }
        this.render()
    }

    changeColor = (color: string) => {
        this.color = color
    }

    changeLineWidth = (lineWidth: number) => {
        this.lineWidth = lineWidth * this.lineWidthMultiplier
    }

    changeTool = (tool: Tool) => {
        this.tool = tool
    }
    addTextBox = (text: string, color: string, fontStyle: string, coordinates: { x: number, y: number }) => {
        if (this.bufferShapes.length > 0) {
            this.shapes = [...this.shapes, ...this.bufferShapes]
            this.bufferShapes.length = 0
        }

        const { x: pannedX, y: pannedY } = this.toCanvasCoords(coordinates.x, coordinates.y)

        const textbox: Textbox = {
            type: 'textbox',
            startX: pannedX,
            startY: pannedY,
            color,
            fontStyle,
            text
        }
        this.shapes.push(textbox)
        console.log("it is ", textbox);

        this.render()
    }

    addBufferShapes = (New_Shapes: Shape[]) => {
        this.bufferShapes = [...this.bufferShapes, ...New_Shapes]
    }


}