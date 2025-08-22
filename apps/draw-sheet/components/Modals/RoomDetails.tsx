import React, { useState } from 'react'
import { useModal } from '../../hooks/useModal'
import { IoClose, IoEnterOutline } from 'react-icons/io5'
import { CiSettings } from 'react-icons/ci'
import { LuCopy } from 'react-icons/lu'
import { FiRefreshCw } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { toast_darktheme } from '../../utils/toast-darktheme'
import { useRoom } from '../../hooks/useRoom'

function RoomDetails() {
    const { setShowModal, roomData } = useModal()
    const [roomVal, setRoomVal] = useState(roomData?.room?.roomName || '');
    const [roomCode, setRoomCode] = useState(roomData?.room?.join_code || '');
    const { updateRoomDetails , updateRoomDetailsLoading } = useRoom()

    const changeRoomNameHandler = async () => {
        if (!updateRoomDetailsLoading && roomVal.trim()!==roomData?.room?.roomName.trim()) {
            const newData = await updateRoomDetails(roomData?.room?.id, { roomName: roomVal });
            setRoomVal(newData?.data?.roomName)
            setShowModal(-1)
            
        }
        else if(roomVal.trim()===roomData?.room?.roomName.trim()){
            toast.error('Room Name is same!!!' , toast_darktheme)
        }
    }

    return (
        <div onClick={(e) => e.stopPropagation()} className=' relative flex flex-col justify-between items-start bg-zinc-950 border border-zinc-700 rounded-xl text-white min-h-[14rem] w-[90%] sm:w-[70%] md:w-[32%] gap-7' style={{ paddingInline: "1.3rem", paddingBlock: "1.5rem" }}>
            <div onClick={() => setShowModal(-1)} className=' cursor-pointer absolute top-[6%] text-gray-400 hover:text-white transition-colors duration-100 right-[3%] '><IoClose /></div>
            <div className=' flex  flex-col items-start justify-start'>
                <div className=' flex justify-center items-center text-lg font-semibold'>
                    <CiSettings /><div>Room Settings</div>
                </div>
                <div className=' text-sm text-gray-400'>
                    Update your room name and join code for collaboration.
                </div>
            </div>

            <div className=' w-full flex flex-col gap-6'>
                <div className=' flex flex-col w-full justify-center items-start gap-2'>
                    <label htmlFor='draw-name' className=' text-[0.85rem] font-semibold' style={{ paddingLeft: "0.5rem" }}>Room Name</label>
                    <input value={roomVal} onChange={(e) => setRoomVal(e.target.value)} onKeyDown={(e)=>{if(e.key==='Enter'){changeRoomNameHandler()}}} id='draw-name' type='text' className=' border border-zinc-800/70 w-full text-[0.91rem] font-mono  rounded-lg inpbg' style={{ paddingInline: "0.9rem", paddingBlock: "0.5rem" }} placeholder='My Drawing Room....' />
                </div>

                <div className=' flex flex-col w-full justify-center items-start gap-2'>
                    <label className=' text-[0.85rem] font-semibold' style={{ paddingLeft: "0.5rem" }}>Room Join Code</label>
                    <div className=' flex justify-start gap-[0.3rem] w-full items-center'>
                        <input type='text' value={roomCode} onChange={() => { }} className=' text-zinc-200 border font-mono border-zinc-800/70 w-full text-[0.91rem] font-normal  rounded-lg inpbg' style={{ paddingInline: "0.9rem", paddingBlock: "0.5rem" }} />
                        <div onClick={() => {
                            navigator.clipboard.writeText(roomData?.room?.join_code)
                            toast.success('Room Code Copied!!!', toast_darktheme)
                        }} className='  text-sm h-[2.2rem] aspect-square flex justify-center  items-center border border-zinc-800 rounded-sm hover:bg-blue-500 transition-colors duration-100' style={{ padding: "0.4rem" }}><LuCopy /></div>
                        <div
                            onClick={async () => {
                                if (!updateRoomDetailsLoading) {
                                    const newData = await updateRoomDetails(roomData?.room?.id, { join_code: true });
                                    setRoomCode(newData?.data?.join_code)
                                }
                            }}
                            className='  text-sm h-[2.2rem] aspect-square flex justify-center  items-center border border-zinc-800 rounded-sm hover:bg-blue-500 transition-colors duration-100' style={{ padding: "0.4rem" }}><FiRefreshCw /></div>
                    </div>
                    <div className=' text-sm text-gray-400'>Share this code with others to invite them to your room.</div>
                </div>
            </div>

            <div className=' w-full flex justify-end items-center gap-1 font-mono'>
                <button onClick={() => setShowModal(-1)} className=' border border-zinc-800 rounded-xl hover:bg-blue-500 transition-colors duration-100' style={{ paddingInline: "0.8rem", paddingBlock: "0.4rem" }}>Cancel</button>
                <button onClick={() => {changeRoomNameHandler()}} style={{ paddingInline: "0.8rem", paddingBlock: "0.4rem" }} className=' flex justify-center items-center border border-zinc-800 rounded-xl gap-2 hover:bg-blue-500/90 bg-blue-500 transition-colors duration-100'>Save Changes</button>
            </div>
        </div>
    )
}

export default RoomDetails