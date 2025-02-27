"use client"

import React, { useEffect, useState } from 'react'
import { GoDotFill } from 'react-icons/go'
import { HiDotsVertical } from 'react-icons/hi'
import { IoCloseCircleOutline, IoSend } from 'react-icons/io5'
import SingleChat from "./SingleChat"
import ChatMenuItem from './ChatMenuItem'
import { useSocket } from '../hooks/useSocket'
import { useRoom } from '../hooks/useRoom'
import toast from 'react-hot-toast'

const ChatSection = () => {

    const { currRoom, setCurrRoom } = useRoom()
    const { socket } = useSocket()
    const [chats, setChats] = useState([])
    const [message , setMessage] = useState("")


    const subscribeToRoom = () => {
        if (socket?.OPEN) {
            socket.send(JSON.stringify({
                type: "subscribe",
                payload: {
                    roomId: currRoom
                }
            }))
        }
    }

    const unSubscribeToRoom = () => {
        if (socket?.OPEN) {
            socket.send(JSON.stringify({
                type: "unsubscribe",
                payload: {
                    roomId: currRoom
                }
            }))
        }
    }

    const addChat = () => {
        if (!socket || socket.OPEN!==1) { toast.error("Socket is Not Connected!!! Please Try Again Later"); return }
        if (!currRoom) { toast.error("Please Select Any Room To Send Chat"); return }
        if (message.trim().length === 0) { toast.error("Please Enter Any Message!!!"); return }
        socket.send(JSON.stringify({
                type :  "chat",
                payload : {
                    roomId : currRoom,
                    message : message
                }
        }))
        

        }

    

        useEffect(() => {

            if (socket && currRoom) subscribeToRoom()

            return () => {
                if (socket && currRoom) unSubscribeToRoom()
            }

        }, [currRoom, socket])

        return (
            <div style={{ paddingInline: "15px", paddingBlock: "10px" }} className=" min-h-[90vh] max-h-[90vh]  w-[65%]  bg-zinc-800 flex flex-col items-start justify-start gap-4 overflow-y-auto custom-scrollbar">

                <div className=' w-full h-full bg-zinc-900 rounded-xl'>

                    {/** When No Chat Selected */}
                    {currRoom === null && <div
                        style={{
                            // background: "linear-gradient(135deg, rgba(24,24,27,0.8), rgba(39,39,42,0.9))",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",

                        }}
                        className="flex flex-col items-center justify-center h-full text-center bg-zinc-900 text-gray-300 rounded-lg shadow-lg p-8 relative overflow-hidden"
                    >

                        <div className="text-6xl mb-4 animate-fadeIn">💬</div>

                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                            No Room Selected
                        </h2>
                        <p className="text-gray-400 mt-2">
                            Start a conversation by selecting a room or creating a new one.
                        </p>

                    </div>}


                    {/* Chat Section NavBar */}
                    {currRoom !== null && <div className='  border-b-2 border-zinc-600 flex items-center justify-between h-20 w-full ' style={{ paddingInline: "18px" }}>

                        <div className=' flex items-center h-full gap-1'>
                            {/* Group Icon */}
                            <div className=' h-[40px] w-[40px] rounded-full bg-red-800'>
                                <svg
                                    viewBox="0 0 212 212"
                                    height="40"
                                    width="40"
                                    preserveAspectRatio="xMidYMid meet"
                                    className="xh8yej3 x5yr21d"
                                    fill="none"
                                >
                                    <title>default-group</title>
                                    <path
                                        d="M105.946 0.25C164.318 0.25 211.64 47.596 211.64 106C211.64 164.404 164.318 211.75 105.945 211.75C47.571 211.75 0.25 164.404 0.25 106C0.25 47.596 47.571 0.25 105.946 0.25Z"
                                        fill="#DFE5E7"
                                        className="xl21vc0"
                                    />
                                    <path
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M102.282 77.2856C102.282 87.957 93.8569 96.5713 83.3419 96.5713C72.827 96.5713 64.339 87.957 64.339 77.2856C64.339 66.6143 72.827 58 83.3419 58C93.8569 58 102.282 66.6143 102.282 77.2856ZM150.35 80.1427C150.35 89.9446 142.612 97.857 132.954 97.857C123.296 97.857 115.5 89.9446 115.5 80.1427C115.5 70.3409 123.296 62.4285 132.954 62.4285C142.612 62.4285 150.35 70.3409 150.35 80.1427ZM83.3402 109.428C68.5812 109.428 39 116.95 39 131.928V143.714C39 147.25 41.8504 148 45.3343 148H121.346C124.83 148 127.68 147.25 127.68 143.714V131.928C127.68 116.95 98.0991 109.428 83.3402 109.428ZM126.804 110.853C127.707 110.871 128.485 110.886 129 110.886C143.759 110.886 174 116.95 174 131.929V141.571C174 145.107 171.15 148 167.666 148H134.854C135.551 146.007 135.995 143.821 135.995 141.571L135.75 131.071C135.75 121.51 130.136 117.858 124.162 113.971C122.772 113.067 121.363 112.15 120 111.143C119.981 111.123 119.962 111.098 119.941 111.07C119.893 111.007 119.835 110.931 119.747 110.886C121.343 110.747 124.485 110.808 126.804 110.853Z"
                                        className="x1d6ck0k"
                                    />
                                </svg>
                            </div>

                            <div className=' text-xl font-semibold'>Room Name</div>

                        </div>


                        <div className=' h-full flex items-center justify-center gap-2'>
                            <div className=' flex justify-center items-center'><GoDotFill className=' text-green-500' />9 Online</div>
                            <ChatMenuItem />

                            {/* <IoCloseCircleOutline className=' text-4xl text-red-500 transition-all duration-200 hover:text-red-700' /> */}
                        </div>

                    </div>}

                    {/* Chat Section */}
                    {currRoom && <div className=' max-h-[67vh] custom-scrollbar scroll-smooth overflow-y-auto min-h-[67vh] w-full bg-ink-600 px-4 py-4 flex flex-col '>

                        <SingleChat left={false} sender='yatin dora' message='vrefhbkj ferhvik'></SingleChat>

                        <SingleChat left={true} sender='yatin dora' message='vrefhbkj ferhvik'></SingleChat>

                        <SingleChat left={false} sender='yatin dora' message='vrefhbkj ferhvik'></SingleChat>
                        <SingleChat left={false} sender='yatin dora' message='vrefhbkj ferhvik'></SingleChat>

                        <SingleChat left={true} sender='yatin dora' message='vrefhbkj ferhvik'></SingleChat>
                        <SingleChat left={false} sender='yatin dora' message='vrefhbkj ferhvik'></SingleChat>

                        <SingleChat left={true} sender='yatin dora' message='vrefhbkj ferhvik'></SingleChat>
                        <SingleChat left={false} sender='yatin dora' message='vrefhbkj ferhvik'></SingleChat>

                        <SingleChat left={true} sender='yatin dora' message='vrefhbkj ferhvik'></SingleChat>

                        <SingleChat left={false} sender='yatin dora' message='vrefhbkj ferhvik'></SingleChat>
                        <SingleChat left={false} sender='yatin dora' message='vrefhbkj ferhvik'></SingleChat>
                        <SingleChat left={false} sender='yatin dora' message='vrefhbkj ferhvik'></SingleChat>

                    </div>}


                    {/* Input Section */}
                    {currRoom && <div className=' h-16 bg-blue 700 w-full flex justify-evenly items-center'>
                        <input value={message} onChange={(e)=> setMessage(e.target.value)} onKeyDown={(e)=>{if(e.key==="Enter"){addChat()}}} type='text' className=' bg-zinc-800 w-[90%] p-3 rounded-2xl' placeholder='Enter Message Here!!!!'></input>
                        <button onClick={addChat} className=' text-2xl border-green-800 rounded-xl bg-green-700  p-[11px]'><IoSend className=' text-white' /></button>
                    </div>}


                </div>

            </div>
        )
    }

    export default ChatSection
