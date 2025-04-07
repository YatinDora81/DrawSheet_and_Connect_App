"use client"

import React, { useEffect, useState } from 'react'
import NavbarClient from './NavbarClient';
import NavbarGuest from './NavbarGuest';
import { AuthProvider } from '../hooks/useAuth';
import SingleChat from "./SingleChat"
import { IoChatbubbleOutline } from 'react-icons/io5';

const HomePage = () => {

    const [isToken, setIsToken] = useState(false)
    const getCookie = (cookieName: string) => {
        return document.cookie.split("; ").find((s) => s.startsWith(cookieName))?.split("=")[1] || ""
    }


    useEffect(() => {
        const token = getCookie("authToken")
        if (token && typeof token === "string" && token !== "") setIsToken(true)
        else setIsToken(false);
    }, [])


    return (
        <div style={{ overflowX: "hidden" }} className=' bg-zinc-950 text-white h-fit w-full flex flex-col justify-start items-start'>

            {isToken ? <AuthProvider ><NavbarClient /></AuthProvider> : <NavbarGuest />}

            <div className=' flex  w-[85%]  flex-col justify-start items-center mx-auto gap-24 '>

                {/* hero section */}
                <div className='w-[65%] text-center h-[50vh] flex py-10 pt-14 items-center flex-col gap-5  relative'>
                    <div className=' z-10 text-green-400 font-[500]  px-3 py-1 rounded-2xl bg-green-400/20 '>New: Real Time Notification Released</div>
                    <div className='hero z-10'>Connect with <span className=' text-green-500'>everyone</span>, all in one place</div>
                    <div className='z-10 w-[75%] text-zinc-400 text-lg'>The messaging platform that brings your conversations together. Simple, secure, and designed for modern teams and friends.</div>
                    <div>
                        <button className='z-10 cursor-pointer hover:opacity-80 transition-all duration-200 bg-green-600 text-white py-3 px-7 text-xl rounded-lg'>Get Started Free</button>

                    </div>
                    {/* green bg */}
                    <div className=' bg-green-500 blur-[180px] h-[10vh] z-[1] w-[30vw]  bottom-0 absolute'></div>

                </div>

                {/* display chat  */}
                <div className=' z-10 border border-zinc-800 bg-zinc-900/70 rounded-xl min-h-[40vh] w-[80%] flex flex-col justify-start items-start'>

                    <div className=' flex justify-start items-center gap-[6px] p-3 '>
                        <div className='w-3 rounded-full h-3 bg-zinc-700'></div>
                        <div className='w-3 rounded-full h-3 bg-zinc-700'></div>
                        <div className='w-3 rounded-full h-3 bg-zinc-700'></div>
                    </div>

                    <div className=' w-full p-4 '>

                        <SingleChat left={true} sender='A' message='Hey team! Just finished the new design system.'></SingleChat>
                        <SingleChat left={false} sender='Y D' message={`Looks amazing! Let's review it together.`}></SingleChat>
                        <SingleChat left={true} sender='D' message={`I've added some comments. Check them out when you get a chance.`}></SingleChat>

                    </div>

                </div>


                {/* Sub Hero Section */}
                <div className=' flex flex-col justify-center items-center w-full gap-[13vh] '>

                    <div className=' flex flex-col justify-center items-center gap-5'>
                        <div className=' text-4xl font-bold'>Everything you need to stay connected</div>
                        <div className=' text-lg text-zinc-400'>Powerful features designed for seamless communication and collaboration.</div>
                    </div>

                    <div className=' w-full flex flex-wrap justify-start items-center gap-5 px-2 relative'>

                    <div className=' bg-green-500 blur-[250px] h-[10vh] z-[1] w-[30vw]  -top-[10%] right-[30%] absolute'></div>   

                        {
                            new Array(5).fill("").map((_,i) =>
                                <div key={i} className='  text-white z-10 bg-zinc-900/40 hover:bg-zinc-900/70 transition-all duration-200 w-[32%] max-w-[32%] py-6 pb-8 rounded-xl border border-zinc-800 px-3 flex flex-col justify-start gap-3 items-start'>

                                    <div className=' text-green-500 text-2xl bg-green-800/20 h-11 w-11 flex justify-center items-center p-2 rounded-full'><IoChatbubbleOutline /></div>
                                    <div className=' flex flex-col w-full justify-start items-start gap-1'>
                                        <div className=' text-xl font-semibold'>
                                            Real-time Messaging
                                        </div>
                                        <div className=' text-zinc-400 text-sm'>
                                            Send and receive messages instantly with live typing indicators and read receipts.
                                        </div>
                                    </div>

                                </div>
                            )
                        }

                    </div>


                </div>



                <div className=' h-[50vh]'></div>

            </div>

        </div>
    )
}

export default HomePage
