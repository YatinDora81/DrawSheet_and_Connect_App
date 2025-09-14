"use client"
import React, { useEffect, useState } from 'react'
import { useModal } from '../../hooks/useModal'
import { IoClose, IoReloadOutline } from 'react-icons/io5'
import Avatar_Container from '../Avatar_Container'
import { AvatarProvider } from '../../hooks/useAvatars'
import { AuthProvider } from '../../hooks/useAuth'
// import multiavatar from '@multiavatar/multiavatar'

function ChooseAvatar() {
    const { setShowModal } = useModal()


    return (
        <div onClick={(e) => e.stopPropagation()} className=' relative flex flex-col justify-start items-start bg-zinc-950 border border-zinc-700 rounded-xl text-white h-[28rem] md:h-[20rem] w-[22rem] md:w-[32rem]' style={{ paddingInline: "1.3rem", paddingTop: "1.5rem", paddingBottom: "0.5rem" }}>

            <div onClick={() => setShowModal(-1)} className=' h-[15%] cursor-pointer absolute top-[6%] text-gray-400 hover:text-white transition-colors duration-100 right-[3%]'><IoClose /></div>
            <div className=' flex  flex-col items-start justify-start'>
                <div className=' text-lg font-semibold'>
                    Choose an Avatar
                </div>
                <div className=' text-sm text-gray-400'>
                    Select one of the avatars below or load more options
                </div>
            </div>


            <div className=' w-full flex flex-col justify-center h-[85%] items-center gap-3'>

                {/* Avatar Container */}
                <div className=' w-full h-full overflow-y-auto custom-scrollbar  flex flex-wrap justify-center items-start scroll-smooth gap-5' style={{ paddingBlock: "0.5rem" }}>


                    <AuthProvider>
                    <AvatarProvider>
                        <Avatar_Container />
                    </AvatarProvider>
                    </AuthProvider>




                </div>

                {/* <div className=' w-full'>
                    <button style={{ paddingBlock: "0.4rem" }} className=' text-[16px] hover:bg-blue-500 gap-3 cursor-pointer flex justify-center items-center w-full border-zinc-800 border font-mono'><IoReloadOutline />Load More Avatars</button>
                </div> */}

            </div>


        </div>

    )
}

export default ChooseAvatar