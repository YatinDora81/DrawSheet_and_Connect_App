"use client"
import React from 'react'
import { useModal } from '../../hooks/useModal'
import { IoClose, IoReloadOutline } from 'react-icons/io5'

function ChooseAvatar() {
    const { setShowModal } = useModal()
    return (
        <div onClick={(e) => e.stopPropagation()} className=' relative flex flex-col justify-start items-start bg-zinc-950 border border-zinc-700 rounded-xl text-white h-[20rem] w-[32%]' style={{ paddingInline: "1.3rem", paddingBlock: "1.5rem" , paddingBottom : "0.5rem" }}>

            <div onClick={() => setShowModal(-1)} className=' cursor-pointer absolute top-[6%] text-gray-400 hover:text-white transition-colors duration-100 right-[3%]'><IoClose /></div>
            <div className=' flex  flex-col items-start justify-start'>
                <div className=' text-lg font-semibold'>
                    Choose an Avatar
                </div>
                <div className=' text-sm text-gray-400'>
                    Select one of the avatars below or load more options
                </div>
            </div>


            <div className=' w-full flex flex-col justify-center h-full items-center gap-3'>

                {/* Avatar Container */}
                <div className=' border-b-2 border-zinc-800 w-full h-[55%] overflow-y-auto custom-scrollbar  flex flex-wrap justify-center items-start scroll-smooth gap-5' style={{paddingBottom : "0.66rem"}}>
 
                   


                    {/* // {
                    //     new Array(100).fill(".").map((_,i)=><div><img key={i} className=' h-[3.8rem] aspect-square rounded-full' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc9APxkj0xClmrU3PpMZglHQkx446nQPG6lA&s' loading='lazy'></img></div>)
                    // } */}





                </div>

                <div className=' w-full'>
                    <button style={{paddingBlock : "0.4rem"}} className=' text-[16px] hover:bg-blue-500 gap-3 cursor-pointer flex justify-center items-center w-full border-zinc-800 border font-mono'><IoReloadOutline />Load More Avatars</button>
                </div>

            </div>


        </div>
   
    )
}

export default ChooseAvatar