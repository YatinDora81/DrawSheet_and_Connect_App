"use client"
import { LuLayoutDashboard, LuUsers } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { FaHashtag, FaRegCopy, FaRegUser } from 'react-icons/fa';
import { CiSettings } from 'react-icons/ci';
import { useRoom } from "../hooks/useRoom";
import toast from "react-hot-toast";
import { toast_darktheme } from "../utils/toast-darktheme";
import NavbarImage from "./NavbarImage";
import { useEffect, useState } from "react";
import { useAvatar } from "../hooks/useAvatars";
import { useAuth } from "../hooks/useAuth";
import { hashCode, svgArray } from "../utils/mockdata";
import { useRouter } from "next/navigation";
import { useModal } from "../hooks/useModal";
import ModalContainer from "./Modals/ModalContainer";

function RightBar({ isBarOpen, setIsBarOper, currOnlineUsers, sheetId }: { isBarOpen: boolean, setIsBarOper: (val: boolean) => void, currOnlineUsers: number, sheetId: string }) {

    const { originalRooms } = useRoom()
    const { user } = useAuth()
    const { avatars } = useAvatar()
    const [roomDetails, setRoomDetails] = useState<any>(null);
    const router = useRouter()
    const { showModal, setShowModal, Modals, setRoomData } = useModal()

    useEffect(() => {
        setRoomDetails(originalRooms?.find((r: any) => r?.room?.id === sheetId))
    }, [originalRooms])

    return (
        !isBarOpen ?
            <div className='z-[123] absolute top-[1.2rem] right-[1.2rem]' >

                <div className=' text-xl text-zinc-300 hover:text-white transition-colors duration-200 hover:bg-[#26262A]/80 rounded-xl cursor-pointer' style={{ padding: "1rem" }} onClick={() => { setIsBarOper(true) }}><LuUsers /></div>

            </div>

            :

            <div className='z-[123] absolute h-full w-[18rem] bg-zinc-950/70 right-0 top-0 flex-col items-' >
                <ModalContainer setShowModal={setShowModal} showModal={showModal}>{Modals[showModal]?.component}</ModalContainer>
                <div className=' w-full font-semibold text-[1.1rem] flex justify-between items-center border-b border-zinc-800/90 h-[9%]' style={{ paddingInline: "1rem", paddingBlock: "0.5rem" }}>
                    <div>Collaboration</div>
                    <div className=' cursor-pointer  hover:bg-blue-500/80 transition-all duration-200 rounded-sm text-gray-300 hover:text-white ' style={{ padding: "0.35rem" }} onClick={() => { setIsBarOper(false) }}><IoClose /></div>
                </div>


                <div className=' roomcode h-[17%] flex flex-col gap-2 justify-evenly ' style={{ paddingInline: "1rem", paddingBlock: "0.5rem" }}>
                    <div className=' text-[0.95rem]'>Room Code</div>
                    <div className=' flex justify-between gap-1 items-center bg-zinc-800/50 rounded-2xl' style={{ paddingBlock: "0.8rem", paddingInline: "0.9rem", paddingRight: "0.9rem" }}>
                        <div onClick={() => {
                            navigator.clipboard.writeText(roomDetails?.room?.join_code)
                            toast.success("Room Code Copied!!!", toast_darktheme)
                        }} className=' cursor-pointer text-[14px] font-semibold flex items-center justify-center gap-3 text-white'> <span className=' text-zinc-200 select-none cursor-pointer'>#</span> {roomDetails?.room?.join_code} </div>
                        <div onClick={() => {
                            navigator.clipboard.writeText(roomDetails?.room?.join_code)
                            toast.success("Room Code Copied!!!", toast_darktheme)
                        }} className=' cursor-pointer  hover:bg-blue-500/80 transition-all duration-200 rounded-lg text-gray-300 hover:text-white ' style={{ padding: "0.6rem" }}><FaRegCopy /></div>
                    </div>
                </div>


                <div className=' w-full h-full' style={{ paddingInline: "1rem", paddingBlock: "0.5rem", paddingRight: "1.4rem" }}>
                    <div className='flex justify-between items-center'>
                        <div className=' text-zinc-300 text-[0.95rem]'> Members ({roomDetails?.room?.members?.length || 1}) </div>
                        <div className='text-[0.8rem] text-green-500 bg-green-500/10 rounded-2xl' style={{ paddingBlock: "0.4rem", paddingInline: "0.6rem" }}>{currOnlineUsers} online</div>
                    </div>

                    <div className='flex flex-col justify-start items-start custom-scrollbar h-[60%] overflow-y-auto gap-[9px]' style={{ paddingBlock: "0.4rem", }}>

                        <div className=' w-full overflow-y-auto h-[85%] flex flex-col items-start justify-start gap-3'>
                            {
                                roomDetails?.room?.members?.map((m: any, i: number) => {
                                    return (
                                        <div key={i} className=" flex justify-start items-center w-full  gap-3">
                                            <div className=' relative'>

                                                <div className={` w-[2.3rem] flex justify-center items-center h-[2.3rem] rounded-full text-[1rem] bg-[#26262A]/80 text-white/70  cursor-pointer  transition-colors duration-300  relative `} >
                                                    <div
                                                        dangerouslySetInnerHTML={{ __html: m?.user?.profilePic && avatars?.length !== 0 ? avatars[parseInt(m?.user?.profilePic)] : svgArray[hashCode(m?.user?.id) % svgArray.length] }}
                                                        className='h-full border border-zinc-800 rounded-full aspect-square'
                                                    />

                                                    {/* <AuthProvider>
                                                    <AvatarProvider>
                                                        <NavbarImage name={m?.user?.name || 'Yat'} svg={m?.user?.profilePic} />
                                                    </AvatarProvider>
                                                    </AuthProvider> */}
                                                    {/* <div className='h-2 absolute right-0 bottom-[0.1rem] aspect-square bg-green-600 rounded-full'></div> */}
                                                </div>

                                            </div>

                                            <div className=' text-[0.9rem]'>{user?.user_id === m?.user?.id ? <span className=" text-green-500 rounded-lg bg-green-600/20" style={{ paddingInline: "0.3rem", paddingBlock: "0.2rem" }}>you</span> : m?.user?.name} </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className=' w-[18rem] font-semibold text-[0.87rem] flex fixed bottom-0 justify-between items-center border-t border-zinc-800/90 min-h-[12.5%] gap-2 flex-col' style={{ paddingInline: "1rem", paddingBlock: "0.5rem" }}>

                    <button
                        onClick={() => { router.push("/sheets") }}
                        className=' w-full cursor-pointer flex items-center justify-center gap-1 hover:bg-blue-500/80 transition-all duration-200 rounded-sm text-white border border-zinc-700 hover:text-white/90' style={{ padding: "0.35rem" }}> <LuLayoutDashboard /> Dashborad</button>
                    <button
                        onClick={() => {
                            if (roomDetails) {
                                setRoomData(roomDetails)
                                setShowModal(3)
                            }
                        }}
                        className=' w-full cursor-pointer flex items-center justify-center gap-1 hover:bg-blue-500/80 transition-all duration-200 rounded-sm text-white border border-zinc-700 hover:text-white/90' style={{ padding: "0.35rem" }}><CiSettings /> Room Settings</button>
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(roomDetails?.room?.join_code)
                            toast.success("Room Code Copied!!!", toast_darktheme)
                        }}
                        className=' w-full cursor-pointer flex items-center justify-center gap-1 bg-blue-500/80 transition-all duration-200 rounded-sm text-white hover:bg-blue-600 hover:text-white/90' style={{ padding: "0.35rem" }}><FaHashtag />Share Room Code</button>
                </div>

            </div>
    )
}

export default RightBar



// <div className=' w-full flex items-center justify-start gap-3'>

//     <div className=' relative'>
//         <div className={` w-[2.3rem] flex justify-center items-center h-[2.3rem] rounded-full text-[1rem] bg-[#26262A]/80 text-white/70  cursor-pointer  transition-colors duration-300  relative `} >
//             {/* default icon */}
//             {/* <FaRegUser /> */}
//             {/* img */}
//             <img src={'/avatar.png'} alt='avatar' className=' h-full w-full rounded-full object-cover object-center'></img>
//             <div className='h-2 absolute right-0 bottom-[0.1rem] aspect-square bg-green-600 rounded-full'></div>
//         </div>

//     </div>

//     <div className=' text-[0.9rem]'>Yatin</div>

// </div>