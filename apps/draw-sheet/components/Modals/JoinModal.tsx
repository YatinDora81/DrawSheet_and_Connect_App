"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useModal } from '../../hooks/useModal'
import { IoClose, IoEnterOutline } from 'react-icons/io5'
import { FiUsers } from 'react-icons/fi'
import { useRoom } from '../../hooks/useRoom'

function JoinModal() {
    const { setShowModal } = useModal()
    const { roomOperation, roomOperationLoading } = useRoom()
    const [roomName, setRoomName] = useState("")
    const inputRef = useRef<HTMLInputElement | null>(null)

    const joinRoomHandler = async () => {
            if (!roomOperationLoading) {
                const res = await roomOperation(false, roomName)
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
        <div onClick={(e) => e.stopPropagation()} className=' relative flex flex-col justify-between items-start bg-zinc-950 border border-zinc-700 rounded-xl text-white h-[14rem] w-[32%]' style={{ paddingInline: "1.3rem", paddingBlock: "1.5rem" }}>
            <div onClick={() => setShowModal(-1)} className=' cursor-pointer absolute top-[6%] text-gray-400 hover:text-white transition-colors duration-100 right-[3%]'><IoClose /></div>
            <div className=' flex  flex-col items-start justify-start'>
                <div className=' text-lg font-semibold'>
                    Join Collaboration Room
                </div>
                <div className=' text-sm text-gray-400'>
                    Enter the room code shared with you to join the collaboration session.
                </div>
            </div>

            <div className=' w-full flex flex-col justify-start gap-3 items-start'>
                <input
                ref={inputRef}
                    onKeyDown={
                        (e) => {
                            if (e.key === "Enter") joinRoomHandler()
                        }
                    }
                    value={roomName} onChange={(e) => setRoomName(e.target.value)}
                    type='text' className=' font-mono w-full border focus:border-white border-zinc-700 rounded-xl text-sm ' placeholder='Enter room code (e.g., ABC-123)' style={{ padding: "0.5rem" }}></input>
                <div className=' w-full flex justify-end items-center gap-1 font-mono'>
                    <button onClick={()=>setShowModal(-1)} className=' border border-zinc-800 rounded-xl hover:bg-blue-500 transition-colors duration-100' style={{ paddingInline: "0.8rem", paddingBlock: "0.4rem" }}>Cancel</button>
                    <button onClick={()=>joinRoomHandler()} style={{ paddingInline: "0.8rem", paddingBlock: "0.4rem" }} className=' flex justify-center items-center border border-zinc-800 rounded-xl gap-2 hover:bg-blue-500/90 bg-blue-500 transition-colors duration-100'><IoEnterOutline />Join Room</button>
                </div>
            </div>

        </div>
    )
}

export default JoinModal