"use client"
import React from 'react'
import Link from 'next/link'
import Avatar from './Avatar'
import { Toaster } from "react-hot-toast"
import { useAuth } from '../hooks/useAuth'
import { IoChatbubbleOutline, IoChatbubbleSharp } from 'react-icons/io5'

const NavbarClient = () => {

    const {user , userLoading,  setUser , logoutUser , fetchUser} = useAuth()
    
    

  return (
    <div className=' text-white w-full border-b-[1px] border-b-zinc-800 bg-[#09090B] flex items-center justify-between h-[10vh] '>
            <div><Toaster position="bottom-right"
                reverseOrder={false} /></div>
            <div className=' w-[90%]  flex justify-between items-center h-full' style={{ marginInline: "auto", paddingInline: "1.5rem" }}>
                <div>
                    <div className=' text-[25px] font-[700] leading-[28px] flex justify-center items-center gap-2 ff' ><span className=' text-green-600 text-3xl'><IoChatbubbleOutline /></span><span>connect</span></div>
                </div>

                
                {!user && <div className=' flex justify-center items-center gap-2'>

                    <Link className='  border text-lg' style={{
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
                        href="/signin">Login</Link>
                    <Link style={{
                        paddingInline: "15px",
                        paddingBlock: "5px",
                        marginTop: "2px",
                        position: "relative",
                        border: "2px solid transparent",
                        borderRadius: "4px",
                        background: "linear-gradient(to right, #A9A5FD, #EBD75D)",
                        backgroundOrigin: "border-box",
                        backgroundClip: "padding-box, border-box"
                    }} className=' text-black  border text-lg' href="/signup">SignUp</Link>

                </div>}

                {user && <div className=' flex justify-center items-center gap-2'>

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

                    {user &&  <Avatar img={user.profilePic && user.profilePic.trim()!=="" ? user.profilePic : null} username={user.name} ></Avatar>}

                </div>}
            </div>

        </div>
  )
}

export default NavbarClient
