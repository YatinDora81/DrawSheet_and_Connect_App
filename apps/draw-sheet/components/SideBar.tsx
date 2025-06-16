import React from 'react'
import { Frontend_SideBar_Tools, Tool } from '../utils/Game_Types'
import { IconType } from 'react-icons'

function SideBar({selectedTool = 'hand'} : {selectedTool ?: Tool}) {
    return (
        <div className=' absolute bg-[#26262A]/70 top-[50%] left-[3vh] translate-y-[-50%] flex  flex-col justify-evenly items-center min-h-[25rem] w-[4.5rem] rounded-2xl gap-1 border border-gray-700'>
            {
                Frontend_SideBar_Tools.map((t: { tool: Tool, icon: IconType }) => <div className={`flex justify-center items-center cursor-pointer  duration-300 transition-colors rounded-xl hover:text-white group w-[70%] aspect-square ${selectedTool===t.tool ? 'bg-blue-500 hover:bg-blue-500/80' : 'hover:bg-gray-700/70'} `} style={{ padding: "10px" }} key={t.tool}>
                    {<t.icon className={` text-[1.4rem] text-gray-400    transition-colors duration-300   ${selectedTool===t.tool ? 'text-white' : 'group-hover:text-white' } `} />}
                </div>)
            }
        </div>
    )
}

export default SideBar