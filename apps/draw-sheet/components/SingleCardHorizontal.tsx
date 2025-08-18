import React from 'react'
import { FaRegFileLines } from 'react-icons/fa6'
import { GoStarFill } from 'react-icons/go'
import { HiDotsVertical } from 'react-icons/hi'
import { IoShareOutline } from 'react-icons/io5'
import { LuStarOff } from 'react-icons/lu'
import { MdOutlineDeleteOutline, MdOutlineFileDownload } from 'react-icons/md'
import { PiPencilSimpleLineLight } from 'react-icons/pi'

function SingleCardHorizontal({ showSubMenu, setShowSubMenu, index , data }: { showSubMenu: number, setShowSubMenu: (n: number) => void, index: number , data : any }) {
    return (
        <div className='  w-full min-h-[5rem]  border border-zinc-800 bg-gradient-to-r rounded-b-lg from-zinc-950 to-zinc-900/20  rounded-lg transition-all duration-200 cursor-pointer relative group hover:border-blue-500/60 flex justify-between items-center'>


            {/* Left Section */}
            <div className=' h-full flex justify-start items-center gap-3'>
                <div className=' h-full flex items-center justify-center bg-blue-900/10 rounded-l-lg group-hover:bg-blue-500/20 transition-colors duration-200' style={{ padding: "1rem" }}>
                    <div className=" text-blue-500 rounded-xl transition-colors duration-200 group-hover:text-blue-500/80 text-2xl border border-zinc-800 bg-zinc-950 " style={{ padding: "0.7rem" }}>
                        <FaRegFileLines />
                    </div>
                </div>

                <div className=" text-center flex justify-center items-start  flex-col">
                    <div className=" font-semibold group-hover:text-blue-500 capitalize transition-colors duration-200">{data?.room?.roomName}</div>
                    <div className=" text-sm text-gray-400 font-sans flex gap-x-2 gap-y-0 justify-center items-center">
                        <div className=" w-[0.5rem] aspect-square rounded-full bg-green-500 cursor-default" ></div>
                        <div className=' font-semibold'>{(new Date(data?.room?.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }))}</div>
                    </div>
                </div>
            </div>


            {/* Right Section */}
            <div className=' flex items-center justify-evenly gap-[2px]' style={{ paddingInline: "1rem" }}>

                <div className=" text-lg rounded-xl hover:bg-zinc-800/70 opacity-100 transition-all duration-300  hover:scale-[1.06]" style={{ padding: "0.6rem" }}>
                    {data?.room?.isFavourite ?
                        <GoStarFill className=" text-yellow-500" />
                        :
                        <LuStarOff />}
                </div>

                <div className=" text-lg rounded-xl hover:bg-zinc-800/70 opacity-100 transition-all duration-300  hover:scale-[1.06]" style={{ padding: "0.6rem" }} ><MdOutlineFileDownload /></div>

                <div onClick={(e) => {
                    e.stopPropagation()
                    if(showSubMenu===index) setShowSubMenu(-1)
                    else setShowSubMenu(index)
                }}
                    className="text-lg rounded-xl hover:bg-zinc-800/70 opacity-100 transition-all duration-300  hover:scale-[1.06]" style={{ padding: "0.6rem" }} ><HiDotsVertical /></div>

            </div>


            {/* Menu Section */}
            {showSubMenu === index && <div onClick={(e) => { e.stopPropagation() }} className=' absolute bg-zinc-950 backdrop-blur-2xl border border-zinc-800 rounded-lg z-[90] min-h-[8.9rem] w-[15%] h-fit -bottom-[160%] right-[1%] '>
                <div className=' cursor-default border-b border-zinc-800 font-semibold' style={{ paddingInline: "0.7rem", paddingBlock: "0.4rem" }}>Actions</div>

                <div className=' flex flex-col justify-start items-start'>
                    <div className=' flex justify-start items-center gap-1 text-sm w-full rounded-lg transition-colors duration-200 hover:bg-blue-500/70 font-[400]' style={{ padding: "0.5rem" }}><PiPencilSimpleLineLight className=' text-blue-500 text-lg' /><div>Edit</div></div>
                    <div className=' flex justify-start items-center gap-1 text-sm w-full rounded-lg transition-colors duration-200 hover:bg-blue-500/70 font-[400]' style={{ padding: "0.5rem" }}><IoShareOutline className=' text-lg' /><div>Share</div></div>
                </div>

                <div className=' border-t border-zinc-800 font-semibold flex text-sm justify-start items-center gap-1 text-red-400 hover:bg-blue-500/70 rounded-lg transition-colors duration-200' style={{ paddingInline: "0.5rem", paddingBlock: "0.5rem" }}><MdOutlineDeleteOutline className=' text-lg' /> Delete</div>


            </div>}


        </div>
    )
}

export default SingleCardHorizontal