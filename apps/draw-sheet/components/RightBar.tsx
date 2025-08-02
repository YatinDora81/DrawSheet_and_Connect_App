"use client"
import React, { useState } from 'react'
import { LuUsers } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { FaRegCopy, FaRegUser } from 'react-icons/fa';

function RightBar() {

    const [isBarOpen, setIsBarFalse] = useState(false)

    return (
        !isBarOpen ?
            <div className='z-[123] absolute top-[1.2rem] right-[1.2rem]'>

                <div className=' text-xl text-zinc-300 hover:text-white transition-all duration-200 hover:bg-[#26262A]/80 rounded-xl cursor-pointer' style={{ padding: "1rem" }}><LuUsers /></div>

            </div>

            :

            <div className='z-[123] absolute h-full w-[18rem] bg-zinc-950/40 right-0 top-0 flex-col items-' >

                <div className=' w-full font-semibold text-[1.1rem] flex justify-between items-center border-b border-zinc-800/90 h-[9%]' style={{ paddingInline: "1rem", paddingBlock: "0.5rem" }}>
                    <div>Collaboration</div>
                    <div className=' cursor-pointer  hover:bg-blue-500/80 transition-all duration-200 rounded-sm text-gray-300 hover:text-white ' style={{ padding: "0.35rem" }}><IoClose /></div>
                </div>


                <div className=' roomcode h-[17%] flex flex-col gap-2 justify-evenly ' style={{ paddingInline: "1rem", paddingBlock: "0.5rem" }}>
                    <div className=' text-[0.95rem]'>Room Code</div>
                    <div className=' flex justify-between items-center bg-zinc-800/50 rounded-2xl' style={{ paddingBlock: "0.8rem", paddingInline: "0.9rem", paddingRight: "0.9rem" }}>
                        <div className=' text-lg font-semibold flex items-center justify-center gap-3 text-white'> <span className=' text-zinc-200 select-none cursor-pointer'>#</span> ABC-123-456-CG </div>
                        <div className=' cursor-pointer  hover:bg-blue-500/80 transition-all duration-200 rounded-lg text-gray-300 hover:text-white ' style={{ padding: "0.6rem" }}><FaRegCopy /></div>
                    </div>
                </div>


                <div className=' w-full h-full' style={{ paddingInline: "1rem", paddingBlock: "0.5rem", paddingRight: "1.4rem" }}>
                    <div className='flex justify-between items-center'>
                        <div className=' text-zinc-300 text-[0.95rem]'> Members (3) </div>
                        <div className='text-[0.8rem] text-green-500 bg-green-500/10 rounded-2xl' style={{ paddingBlock: "0.4rem", paddingInline: "0.6rem" }}>2 online</div>
                    </div>

                    <div className='flex flex-col justify-start items-start custom-scrollbar h-[60%] overflow-y-auto gap-[9px]' style={{ paddingBlock: "0.4rem", paddingInline: "0.4rem  " }}>

                        <div className=' w-full flex items-center justify-start gap-3'>

                            <div className=' relative'>
                                <div className={` w-[2.3rem] flex justify-center items-center h-[2.3rem] rounded-full text-[1rem] bg-[#26262A]/80 text-white/70  cursor-pointer  transition-colors duration-300  relative `} >
                                    {/* default icon */}
                                    {/* <FaRegUser /> */}
                                    {/* img */}
                                    <img src={'https://res.cloudinary.com/dqrthr3ow/image/upload/v1742235079/DrawSheet_And_Connect_App_Pics/dwgqou91vzldt8147bcd.jpg'} alt='avatar' className=' h-full w-full rounded-full object-cover object-center'></img>
                                    
                                    <div className='h-2 absolute right-0 bottom-[0.1rem] aspect-square bg-green-600 rounded-full'></div>
                                </div>

                            </div>

                            <div className=' text-[0.9rem]'>You</div>



                        </div>


                        <div className=' w-full flex items-center justify-start gap-3'>

                            <div className=' relative'>
                                <div className={` w-[2.3rem] flex justify-center items-center h-[2.3rem] rounded-full text-[1rem] bg-[#26262A]/80 text-white/70  cursor-pointer  transition-colors duration-300  relative `} >
                                    {/* default icon */}
                                    {/* <FaRegUser /> */}
                                    {/* img */}
                                    <img src={'/avatar.png'} alt='avatar' className=' h-full w-full rounded-full object-cover object-center'></img>
                                    <div className='h-2 absolute right-0 bottom-[0.1rem] aspect-square bg-green-600 rounded-full'></div>
                                </div>

                            </div>

                            <div className=' text-[0.9rem]'>Yatin</div>



                        </div>

                    </div>

                </div>


                <div className=' w-[18rem] font-semibold text-[1.1rem] flex fixed bottom-0 justify-between items-center border-t border-zinc-800/90 h-[9%]' style={{ paddingInline: "1rem", paddingBlock: "0.5rem" }}>
                    <button className=' w-full cursor-pointer flex items-center justify-center gap-1 bg-blue-500/80 transition-all duration-200 rounded-sm text-white hover:bg-blue-600 hover:text-white/90' style={{ padding: "0.35rem" }}>Share Room Code</button>
                </div>

            </div>
    )
}

export default RightBar