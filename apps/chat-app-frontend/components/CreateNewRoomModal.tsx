"use client"
import React from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io";

const CreateNewRoomModal = ({ showModal, setShowModal }: { showModal: boolean, setShowModal: (value: boolean) => void }) => {
    // console.log(showModal); 

    return (
        <div onClick={(e)=>{e.stopPropagation()}} className=' relative text-white w-[45%] min-h-[35%] border border-zinc-700 bg-zinc-900 rounded-2xl py-4 px-6 flex flex-col items-start justify-evenly'>
            <IoIosCloseCircleOutline className=' text-red-600 text-3xl absolute right-2 top-2 cursor-pointer' onClick={()=>setShowModal(false)} />
            <h1 className=' text-3xl w-full text-center'> Create New Room</h1>
            <div className=' w-full flex flex-col gap-2'>
                <input type='text' placeholder='Enter Room Name' className=' bg-zinc-800 w-full py-2 text-lg px-2 rounded-xl'></input>
                <div className=' text-red-500 text-sm -my-1 px-1'>*Room Is invalid</div>
                <button className=' w-full bg-blue-600 rounded-sm  transition-all duration-200 hover:bg-blue-700 cursor-pointer h-10 text-xl'>Create Room</button>
            </div>
        </div>
    )
}

export default CreateNewRoomModal
