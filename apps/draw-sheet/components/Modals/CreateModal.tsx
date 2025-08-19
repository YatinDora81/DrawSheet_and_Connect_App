"use client"
import React, { useEffect, useRef, useState } from 'react'
import { FiUsers } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'
import { useModal } from '../../hooks/useModal'
import { useRoom } from '../../hooks/useRoom'

function CreateModal() {
    const { setShowModal } = useModal()
    const { roomOperation, roomOperationLoading } = useRoom()
    const [roomName, setRoomName] = useState("")
    const inputRef = useRef<HTMLInputElement | null>(null)

    const createRoomHandler = async () => {
        if (!roomOperationLoading) {
            const res = await roomOperation(true, roomName)
            if (res) setShowModal(-1)
        }
    }

    useEffect(() => {
        if (inputRef && inputRef.current) inputRef.current.focus()
        return () => {
            setRoomName("")
        }
    }, [])


    return (
        <div onClick={(e) => e.stopPropagation()} className=' relative flex flex-col justify-between items-start bg-zinc-950 border border-zinc-700 rounded-xl text-white h-[14rem] w-[90%] sm:w-[70%] md:w-[32%]' style={{ paddingInline: "1.3rem", paddingBlock: "1.5rem" }}>
            <div onClick={() => setShowModal(-1)} className=' cursor-pointer absolute top-[6%] text-gray-400 hover:text-white transition-colors duration-100 right-[3%]'><IoClose /></div>
            <div className=' flex  flex-col items-start justify-start'>
                <div className=' text-lg font-semibold'>
                    Create Collaboration Room
                </div>
                <div className=' text-sm text-gray-400'>
                    Enter a name for your room. A unique room code will be generated that you can share with others.
                </div>
            </div>

            <div className=' w-full flex flex-col justify-start gap-3 items-start'>
                <input
                    ref={inputRef}
                    onKeyDown={
                        (e) => {
                            if (e.key === "Enter") createRoomHandler()
                        }
                    }
                    value={roomName} onChange={(e) => setRoomName(e.target.value)} type='text' className=' font-mono w-full border focus:border-white border-zinc-700 rounded-xl text-sm ' placeholder='Enter room name (e.g., Design Team Meeting)' style={{ padding: "0.5rem" }}></input>
                <div className=' w-full flex justify-end items-center gap-1 font-mono'>
                    <button onClick={() => setShowModal(-1)} className=' cursor-pointer border border-zinc-800 rounded-xl hover:bg-blue-500 transition-colors duration-100' style={{ paddingInline: "0.8rem", paddingBlock: "0.4rem" }}>Cancel</button>
                    <button onClick={() => createRoomHandler()} style={{ paddingInline: "0.8rem", paddingBlock: "0.4rem" }} className=' flex justify-center cursor-pointer items-center border border-zinc-800 rounded-xl gap-2 hover:bg-blue-500/90 bg-blue-500 transition-colors duration-100'><FiUsers />Create Room</button>
                </div>
            </div>

        </div>
    )
}

export default CreateModal