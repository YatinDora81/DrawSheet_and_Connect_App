"use client"
import React from 'react'
import Link from 'next/link'
import Avatar from './Avatar'
import { Toaster } from "react-hot-toast"
import { useAuth } from '../hooks/useAuth'
import { IoChatbubbleOutline, IoChatbubbleSharp } from 'react-icons/io5'
import { usePathname, useRouter } from 'next/navigation'
import { useSocket } from '../hooks/useSocket'
import { FaArrowRotateLeft } from "react-icons/fa6";

const NavbarClient = () => {

    const { user, userLoading, setUser, logoutUser, fetchUser } = useAuth()
    const { socket, socketLoading, connectWs } = useSocket();
    const router = useRouter()
    const pathName = usePathname();

    return (
        <div className={` text-white w-full border-b-[1px] border-b-zinc-800 bg-[#09090B] flex items-center justify-between h-[10vh] ${pathName === "/" && " bg-zinc-950/80 backdrop-blur-sm z-[1000] fixed top-0"} `}>
            <div><Toaster position="bottom-right"
                reverseOrder={false} /></div>
            <div className=' w-[90%]  flex justify-between items-center  h-full sm:px-[1.5rem]' style={{ marginInline: "auto", }}>
                <div >
                    <div onClick={() => router.push("/")} className=' cursor-pointer text-[25px] font-[700] leading-[28px] flex justify-center items-center gap-2 ff' ><span className=' text-green-600 text-3xl'><IoChatbubbleOutline /></span><span>connect</span></div>
                </div>


                {!user && <div className=' flex justify-center items-center gap-2'>

                    <Link className='text-lg bg-white ff font-medium text-zinc-700 px-4 py-[6px] hover:bg- zinc-900/50 transition-all duration-200 hover:text -gray-300 rounded-md  hover:opacity-80'
                        href="/signin">Login</Link>
                    <Link className='text-lg bg-green-600 ff font-medium text-white px-4 py-[6px]  hover:bg-green-700 transition-all duration-200 hover:text-gray-300 rounded-md' href="/signup">Get Started</Link>

                </div>}


                {user && <div className=' flex justify-center items-center gap-2'>

                    {socket && socket.OPEN === 1 && <div className=' flex  items-center gap-2 rounded-2xl border-2 border-zinc-800 px-2'>
                        <div className=' bg-green-500 h-2 aspect-square rounded-full '></div>
                        <div>Connected</div>
                    </div>}
                    {socketLoading && <div className=' flex  items-center gap-2 rounded-2xl border-2 border-zinc-800 px-2'>
                        <div className=' bg-yellow-500 h-2 aspect-square rounded-full '></div>
                        <div>Connecting...</div>
                    </div>}
                    {(socket && socket.OPEN !== 1) && <div onClick={() => { connectWs() }} className=' flex  items-center gap-2 rounded-2xl border-2 border-zinc-800 px-2'>
                        <div className=' bg-red-500 h-2 aspect-square rounded-full '></div>
                        <div>Retry... </div>
                        <FaArrowRotateLeft />
                    </div>}
                    {/* <Link className='  border text-lg' style={{
                        paddingInline: "15px",
                        paddingBlock: "5px",
                        marginTop: "2px",
                        position: "relative",
                        background: "white",
                        border: "2px solid transparent",
                        borderRadius: "4px",
                        backgroundImage: "linear-gradient(rgb(24 24 27), rgb(24 24 27)), linear-gradient(to right, #A9A5FD, #EBD75D)",
                        backgroundOrigin: "border-box",
                        backgroundClip: "padding-box, border-box"
                    }}
                        href="/signin">LogOut</Link> */}

                    {user && <Avatar img={user.profilePic && user.profilePic.trim() !== "" ? user.profilePic : null} username={user.name} ></Avatar>}

                </div>}
            </div>

        </div>
    )
}

export default NavbarClient
