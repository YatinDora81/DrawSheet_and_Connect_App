import React from 'react'
import { FiUsers } from 'react-icons/fi'

function NoRooms() {
    return (
        <div className=" w-full border border-zinc-800 gap-3 rounded-xl flex-col flex items-center justify-center" style={{ paddingInline: "1.7rem", paddingBlock: "2.5rem" }}>
            <div className=" bg-zinc-800 text-2xl rounded-full text-zinc-400" style={{ padding: "0.6rem" }}>
                <FiUsers />
            </div>
            <div className=" flex flex-col sm:w-[25%] gap-1 text-center items-center justify-center">
                <div className=" flex justify-center font-semibold items-center gap-2 text-xl">No Active Rooms</div>
                <div className=" text-zinc-400 text-sm ">You haven't created or joined any collaboration rooms yet. Use the options above to get started with real-time collaboration.</div>
            </div>
        </div>
    )
}

export default NoRooms