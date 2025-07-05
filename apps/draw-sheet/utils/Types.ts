import { FaRegHandPaper, FaRegCircle } from "react-icons/fa"
import { BiPencil, BiRectangle } from "react-icons/bi";
import { PiTextbox } from "react-icons/pi"
import { MdOutlineSave } from "react-icons/md";
import { IconType } from "react-icons";
// hand for panning only for left , right , up , down ,
export type Tool = "pencil" | "rectangle" | "circle" | "hand" | "save" | "undo" | "redo" | "textbox"

export const Frontend_SideBar_Tools: {
  tool: Tool,
  icon: IconType
}[] = [
    {
      tool: "hand",
      icon: FaRegHandPaper
    },
    {
      tool: "pencil",
      icon: BiPencil
    },
    {
      tool: "rectangle",
      icon: BiRectangle
    },
    {
      tool: "circle",
      icon: FaRegCircle
    },
    {
      tool: "textbox",
      icon: PiTextbox
    },
    {
      tool: "save",
      icon: MdOutlineSave
    }
  ]

export const Colors: {
  color_name: string;
  color_code: string;
}[] = [
    {
      color_name: "Blue",
      color_code: "#2A85FF"
    },
    {
      color_name: "Red",
      color_code: "#FF5757"
    },
    {
      color_name: "Green",
      color_code: "#7BBC5F"
    },
    {
      color_name: "Yellow",
      color_code: "#FFBC3F"
    },
    {
      color_name: "Purple",
      color_code: "#C97BFC"
    },
    {
      color_name: "Orange",
      color_code: "#FF8C5F"
    },
    {
      color_name: "White",
      color_code: "#FFFFFF"
    },
    {
      color_name: "Gray",
      color_code: "#BEBEBE"
    }
  ];

export type Rectangle = {
  type: "rectangle",
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  lineWidth: number,
  color: string
}

export type Circle = {
  type: "circle",
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  lineWidth: number,
  color: string
}

export type Pencil = {
  type: 'pencil',
  startPoints: { x: number, y: number }
  cords: { x: number, y: number }[],
  lineWidth: number,
  color: string
}

export type Shape = Rectangle | Circle | Pencil |
{
  type: "textbox",
  startX: number,
  startY: number,
  text: string,
  font: string,
  lineWidth: number,
  color: string
}

export const Canvas_BG_COLOR = "#1A1A1F"