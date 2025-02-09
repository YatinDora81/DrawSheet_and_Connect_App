"use client"
import React from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io";

const YesNoModal = ({ showModal, setShowModal, heading = "Are You Sure???", subheading, setValue }: { showModal: boolean, setShowModal: (value: boolean) => void, heading: string, setValue: (value: number) => void , subheading : string | null }) => {
    console.log(showModal);

    return (
        <div onClick={(e) => { e.stopPropagation() }} className=' relative text-white w-[45%] min-h-[35%] border border-zinc-700 bg-zinc-900 rounded-2xl py-4 px-6 flex flex-col items-start justify-center gap-7'>
            <IoIosCloseCircleOutline className=' text-red-600 text-3xl absolute right-2 top-2 cursor-pointer' onClick={() => setShowModal(false)} />
            <div className=' w-full flex flex-col justify-center items-center gap-1'>
                <h1 className=' text-3xl w-full text-center'> {heading}</h1>
                {subheading && <h3 className=' text-lg text-gray-300 w-full text-center'> {subheading}</h3>}
            </div>
            <div className=' w-full flex  gap-2'>
                <button className=' w-full bg-green-600 rounded-sm  transition-all duration-200 hover:bg-green-700 cursor-pointer h-10 text-xl'>Yes</button>
                <button className=' w-full bg-red-600 rounded-sm  transition-all duration-200 hover:bg-red-700 cursor-pointer h-10 text-xl'>No</button>
            </div>
        </div>
    )
}

export default YesNoModal
