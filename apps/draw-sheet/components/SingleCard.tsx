"use client"
import { FaRegFileLines } from 'react-icons/fa6'
import { GoStarFill } from 'react-icons/go'
import { HiDotsVertical } from 'react-icons/hi'
import { IoShareOutline } from 'react-icons/io5'
import { LuStarOff } from 'react-icons/lu'
import { MdOutlineDeleteOutline, MdOutlineFileDownload } from 'react-icons/md'
import { PiPencilSimpleLineLight } from 'react-icons/pi'

function SingleCard({ showSubMenu, setShowSubMenu, index, data }: { showSubMenu: number, setShowSubMenu: (n: number) => void, index: number, data: any }) {

    return <div className="w-[20rem] border border-zinc-800  h-[25rem] rounded-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer relative group hover:border-blue-500/60">

        {/* Background */}
        <div className=" w-full h-full absolute top-0 left-0 blur-lg">
            <div className="h-10 aspect-square rounded-full group-hover:scale-[1.2] transition-all duration-300  bg-blue-500/60 absolute top-[1rem] left-[1.3rem]"></div>
            <div className="h-7 aspect-square rounded-full bg-blue-500/60 absolute right-[2.2rem] group-hover:scale-[1.2] transition-all duration-500 bottom-[5.5rem]"></div>
        </div>

        {/* Foreground */}
        <div
            className=" w-full relative h-full flex flex-col justify-start items-start">

            {/* Upper Section */}
            <div
                onClick={(e) => {
                    e.stopPropagation()
                    if (showSubMenu !== -1) setShowSubMenu(-1)
                    console.log("clicked on sheet card to navigate")
                }}
                className=" h-[82%] w-full gap-3 relative group-hover:bg-blue-500/10 flex flex-col justify-center items-center ">

                <div className=" absolute text-xl rounded-lg bg-zinc-950 opacity-0 group-hover:opacity-100 transition-all duration-300  top-[4%] right-[4%] hover:scale-[1.06]" style={{ padding: "0.7rem" }}>
                    {data?.room?.isFavourite ?
                        <GoStarFill className=" text-yellow-500" />
                        :
                        <LuStarOff />}
                </div>

                <div className=" text-blue-500 rounded-xl transition-colors duration-200 group-hover:text-blue-500/80 text-4xl border border-zinc-800 bg-zinc-950 " style={{ padding: "1rem" }}>
                    <FaRegFileLines />
                </div>

                <div className=" text-center flex justify-center items-center  flex-col">
                    <div className=" font-semibold group-hover:text-blue-500 capitalize transition-colors duration-200">{data?.room?.roomName}</div>
                    <div className=" text-sm text-gray-400 font-sans font-semibold">{(new Date(data?.room?.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }))}</div>
                </div>
            </div>


            {/* Lower Section */}
            <div className=" cursor-default h-[18%] w-full bg-gradient-to-r rounded-b-lg from-zinc-950 to-zinc-800/30 flex justify-between items-center" style={{ paddingLeft: "1.8rem", paddingRight: "1.4rem" }}>

                <div className=" cursor-text flex justify-center gap-2 text-sm text-gray-400 font-semibold items-center"><div className=" w-[0.7rem] aspect-square rounded-full bg-green-500 cursor-default" ></div>Ready to edit</div>

                <div onClick={(e) => {
                    e.stopPropagation();
                    if (showSubMenu === index) setShowSubMenu(-1)
                    else setShowSubMenu(index)
                }}
                    className=" cursor-pointer text-gray-400 rounded-lg hover:bg-zinc-800/70 transition-all duration-200 z-[10]" style={{ padding: "0.7rem" }} ><HiDotsVertical /></div>

            </div>


            {/* Menu Section */}
            {showSubMenu === index && <div onClick={(e) => { e.stopPropagation() }} className=' absolute bg-zinc-950 backdrop-blur-2xl border border-zinc-800 rounded-lg z-[90] min-h-[8rem] w-[50%] h-fit bottom-[13%] right-[13%] '>
                <div className=' cursor-default border-b border-zinc-800 font-semibold' style={{ paddingInline: "0.7rem", paddingBlock: "0.4rem" }}>Actions</div>

                <div className=' flex flex-col justify-start items-start'>
                    <div className=' flex justify-start items-center gap-1 text-sm w-full rounded-lg transition-colors duration-200 hover:bg-blue-500/70 font-[400]' style={{ padding: "0.5rem" }}><PiPencilSimpleLineLight className=' text-blue-500 text-lg' /><div>Edit</div></div>
                    {/* <div className=' flex justify-start items-center gap-1 text-sm w-full rounded-lg transition-colors duration-200 hover:bg-blue-500/70 font-[400]' style={{ padding: "0.5rem" }}><MdOutlineFileDownload className=' text-lg' /><div>Download</div></div> */}
                    <div className=' flex justify-start items-center gap-1 text-sm w-full rounded-lg transition-colors duration-200 hover:bg-blue-500/70 font-[400]' style={{ padding: "0.5rem" }}><IoShareOutline className=' text-lg' /><div>Share</div></div>
                </div>

                <div className=' border-t border-zinc-800 font-semibold flex text-sm justify-start items-center gap-1 text-red-400 hover:bg-blue-500/70 rounded-lg transition-colors duration-200' style={{ paddingInline: "0.5rem", paddingBlock: "0.5rem" }}><MdOutlineDeleteOutline className=' text-lg' /> Delete</div>


            </div>}

        </div>

    </div>
}

export default SingleCard