import { FaRegHandPaper , FaRegCircle  } from "react-icons/fa"
import { BiPencil , BiRectangle  } from "react-icons/bi"; 
import { PiTextbox } from "react-icons/pi"
import { MdOutlineSave } from "react-icons/md";
import { IconType } from "react-icons";
// hand for panning only for left , right , up , down ,
export type Tool = "pencil" | "rectangle" | "circle" | "hand" | "save" | "undo" | "redo" | "textbox" 

export const Frontend_SideBar_Tools : {
    tool : Tool,
    icon : IconType 
}[] = [
    {
        tool : "hand",
        icon : FaRegHandPaper
    },
    {
        tool : "pencil",
        icon : BiPencil
    },
    {
        tool : "rectangle",
        icon : BiRectangle 
    },
    {
        tool : "circle",
        icon : FaRegCircle 
    },
    {
        tool : "textbox",
        icon : PiTextbox
    },
    {
        tool : "save",
        icon : MdOutlineSave
    }
]