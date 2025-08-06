"use client"
import { CREATE_NEW_ROOM_URL } from '@repo/config/URL';
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { PulseLoader } from 'react-spinners';
import { useRoom } from '../hooks/useRoom';
import { useSocket } from '../hooks/useSocket';

const CreateNewRoomModal = ({ showModal, setShowModal }: { showModal: number, setShowModal: (value: number) => void }) => {
    // console.log(showModal); 

    const inputRef = useRef<HTMLInputElement | null>(null)
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    const { setRooms, newMessagesMap, setNewMessagesMap } = useRoom()
    const { socket } = useSocket()

    const handleSubmit = async () => {


        try {

            if (!inputRef || !inputRef.current || inputRef.current.value.trim() === "") {
                toast.error("Enter Room Name!!!")
                setError("Enter Room Name!!!")
                return;
            }
            setError("");
            setLoading(true);

            const res = await fetch(CREATE_NEW_ROOM_URL, { method: "POST", body: JSON.stringify({ "roomName": inputRef.current.value }), credentials: "include", headers: { "Content-Type": "application/json" } });
            const d = await res.json();

            // console.log(d);
            if (d.success) {
                inputRef.current.value = ""
                setError("");
                toast.success(d.message)
                // console.log("new room " , d.data);

                setShowModal(-1)
                setRooms((prev) => [{ "room": d.data }, ...prev])
                // @ts-ignore
                setNewMessagesMap((prev) => {
                    const map = new Map<string, number>(prev)
                    map.set(d.data.id, 0);
                    return map
                })

                if (socket && socket.OPEN) {
                    socket.send(JSON.stringify({
                        type: "join",
                        payload: {
                            roomId: d.data.id
                        }
                    }))
                }


                // fetchRooms()
            }
            else {
                console.log(d);
                toast.error(d.message || "Something Went Wrong!!!")
            }



        } catch (error) {
            console.log("Error", error);
            toast.error("Something Went Wrong!!!")
            toast.error("Please Try Again Later!!!")

        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div onClick={(e) => { e.stopPropagation() }} className=' relative text-white w-[45%] min-h-[35%] border border-zinc-500 bg-zinc-900 rounded-2xl py-4 px-6 flex flex-col items-start justify-evenly'>
            <IoIosCloseCircleOutline className=' text-red-600 text-3xl absolute right-2 top-2 cursor-pointer' onClick={() => setShowModal(-1)} />
            <h1 className=' text-3xl w-full text-center'> Create New Room</h1>
            <div className=' w-full flex flex-col gap-2'>
                <input ref={inputRef} onKeyDown={(e) => {
                    if (e.key === "Enter") { handleSubmit() } else {
                        if (error.length > 0) setError("")
                    }
                }} type='text' placeholder='Enter Room Name' className=' bg-zinc-800 w-full py-2 text-lg px-2 rounded-xl'></input>
                {error.trim().length !== 0 && <div className=' text-red-500 text-sm -my-1 px-1'>*{error}</div>}
                <button disabled={loading} onClick={handleSubmit} className=' w-full bg-blue-600 rounded-sm  transition-all duration-200 hover:bg-blue-700 cursor-pointer h-10 text-xl'>{loading ? <PulseLoader color='white' size={9} /> : "Create Room"}</button>
            </div>
        </div>
    )
}

export default CreateNewRoomModal
