"use client"
import React, { SetStateAction } from 'react'
import { Frontend_SideBar_Tools, Tool } from '../utils/Types'
import { IconType } from 'react-icons'

function SideBar({ selectedTool, setSelectedTool , downloadCanvasAsImageHandler }: { selectedTool : Tool, setSelectedTool: React.Dispatch<SetStateAction<Tool>> , downloadCanvasAsImageHandler : ()=>void }) {



    return (
        <div className=' absolute bg-[#26262A]/70 top-[50%] left-[3vh] translate-y-[-50%] flex  flex-col justify-evenly items-center min-h-[25rem] w-[4.5rem] rounded-2xl gap-1 border border-gray-700 z-[123]'>
            {
                Frontend_SideBar_Tools.map((t: { tool: Tool, icon: IconType }) => <div 
                onClick={()=>{
                    if(t.tool!=="save") setSelectedTool(t.tool)
                    else{
                        downloadCanvasAsImageHandler()
                    }
                }} 
                className={`relative flex justify-center items-center  duration-300 transition-colors rounded-xl hover:text-white group w-[70%] aspect-square ${selectedTool === t.tool ? 'bg-blue-500 hover:bg-blue-500/80' : 'hover:bg-gray-700/70'} `} style={{ padding: "10px" }} key={t.tool}>

                    {<t.icon className={` text-[1.4rem] text-gray-400  cursor-pointer  transition-colors duration-300   ${selectedTool === t.tool ? 'text-white' : 'group-hover:text-white'} `} />}
                    <div className={`text-white text-sm font-normal rounded-lg absolute invisible transition-all duration-100 ease-initial group-hover:visible capitalize left-[3.5rem] bg-white/10 `} style={{ paddingBlock: "0.35rem", paddingInline: "0.5rem" }}>{t.tool}</div>
                </div>)
            }
        </div>
    )
}

export default SideBar