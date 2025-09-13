"use client"

import React, { useEffect, useRef, useState } from 'react'
import { useRoom } from '../hooks/useRoom'
import { MdClose } from 'react-icons/md'
import { IoIosCamera, IoIosSearch, IoMdCheckmark, IoMdClose } from 'react-icons/io'
import { BiCopy, BiPencil } from 'react-icons/bi'
import Avatar from './Avatar'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'
import { BeatLoader, ClipLoader } from 'react-spinners'
import { CLOUD_NAME, UPLOAD_PRESET } from '../utils/cloudinary'
import { UPDATE_ROOM_DETAILS } from '@repo/config/URL'
import { authenticatedFetch } from '@repo/ui/tokenManager'

const RoomInfo = ({ updatedRoomDetails, setUpdatedRoomDetails, setShowRoomInfoPage, setResponsivePage, responsivePage }: { setShowRoomInfoPage: any, updatedRoomDetails: { roomPic: null | string, roomName: null | string, join_code: null | string }, setUpdatedRoomDetails: any, setResponsivePage: (val: number) => void, responsivePage: number }) => {

    const { currRoom, setCurrRoom, setRooms } = useRoom()
    const { user, userLoading } = useAuth()
    const [showEditPhoto, setShowEditPhoto] = useState(false);
    const [showRoomNameInput, setShowRoomNameInput] = useState<boolean>(false);
    const [roomNameInpValue, setRoomNameInpValue] = useState<string>(updatedRoomDetails.roomName ? updatedRoomDetails.roomName : (currRoom ? currRoom.roomName : ""));
    const [nameInpLoading, setNameInpLoading] = useState(false)
    const roomNameInputRef = useRef<HTMLInputElement | null>(null)
    const [file, setFile] = useState<File | null>();
    const [fileLoading, setFileLoading] = useState(false)
    const [searchMembers, setSearchMembers] = useState<any[]>([])
    const [uniqueMembers, setUniqueMembers] = useState<any[]>([]);
    const [searchMemberText, setSearchMemberText] = useState("")
    const [showSearchMemberInput, setShowSearchMemberInput] = useState(false)
    const memberInputRef = useRef<HTMLInputElement | null>(null)
    useEffect(() => {
        if (showSearchMemberInput && memberInputRef.current) memberInputRef.current.focus()
    }, [showSearchMemberInput])

    const copyRoomIdHandler = () => {
        if (!currRoom.join_code) {
            toast.error("No Room Code!!!")
            return
        }
        navigator.clipboard.writeText(currRoom.join_code);
        toast.success("Room Code Copied Successfully")
    }

    useEffect(() => {
        if (currRoom) {
            setRoomNameInpValue(currRoom.roomName)
            setSearchMembers(currRoom.members)
            const set = new Set<string>();
            currRoom.members?.map((m: any) => set.add(JSON.stringify(m)))
            setUniqueMembers(() => {
                const arr: any[] = [];
                set.forEach((s: string) => arr.push(JSON.parse(s)))
                return arr
            })

        }
        setShowRoomNameInput(false)

    }, [currRoom, currRoom.members, currRoom.members.length])

    useEffect(() => {
        const set = new Set<string>();
        searchMembers.map((m: any) => set.add(JSON.stringify(m)))
        setUniqueMembers(() => {
            const arr: any[] = [];
            set.forEach((s: string) => arr.push(JSON.parse(s)))
            return arr
        })
    }, [searchMembers])

    useEffect(() => {
        if (showRoomNameInput === true) if (roomNameInputRef.current) { roomNameInputRef.current.focus() }
    }, [showRoomNameInput])

    const uploadImage = async () => {
        if (!file) {
            toast.error("Please select File!!!")
            return
        }

        setFileLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);


        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                toast.error("Upload Failed!!!")
                return
            }

            const data = await response.json();

            const obj = { "roomName": "", "join_code": false, "roomId": currRoom.id, "roomPic": data.secure_url };

            const res = await authenticatedFetch(UPDATE_ROOM_DETAILS, { method: "POST", credentials: "include", body: JSON.stringify({ ...obj }) })

            const d = await res.json();

            if (d.success) {
                setRooms((prev: any) => {
                    const newRoomData = prev.map((ele: any) => {
                        if (ele.room.id === currRoom.id) {
                            const e = ele.room
                            return { room: { ...e, roomPic: data.secure_url } }
                        }
                        else return ele
                    })
                    return newRoomData
                })
                // setCurrRoom((prev : any)=>{return { ...prev , "roomPic" : data.secure_url}})
                setUpdatedRoomDetails((prev: any) => { return { ...prev, roomPic: data.secure_url } })
            }
            else {
                toast.error(d.message || "Something Went Wrong!!!");
            }



        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Upload Failed!!!");
        } finally {
            setFileLoading(false)
        }
    };

    const changeRoomNameHandler = async () => {
        setNameInpLoading(true)
        try {
            if ((updatedRoomDetails.roomName && updatedRoomDetails.roomName === roomNameInpValue) || (!updatedRoomDetails.roomName && currRoom.roomName === roomNameInpValue)) {
                setShowRoomNameInput(false)
                return
            }
            const obj = {
                "roomName": roomNameInpValue,
                "join_code": false,
                "roomId": currRoom.id,
                "roomPic": ""
            }
            const res = await authenticatedFetch(UPDATE_ROOM_DETAILS, { method: "POST", credentials: "include", body: JSON.stringify(obj) })
            const data = await res.json()
            if (data.success) {
                // update all 3 place
                setRooms((prev: any) => {
                    const newRoomData = prev.map((ele: any) => {
                        if (ele.room.id === currRoom.id) {
                            const e = ele.room
                            return { room: { ...e, roomName: roomNameInpValue } }
                        }
                        else return ele
                    })
                    return newRoomData
                })
                // setCurrRoom((prev : any)=>{return { ...prev , "roomPic" : data.secure_url}})
                setUpdatedRoomDetails((prev: any) => { return { ...prev, roomName: roomNameInpValue } })
                setShowRoomNameInput(false);
            }
            else {
                toast.error(data.message || "Something Went Wrong!!!")
                roomNameInputRef.current?.focus()
            }
        } catch (error: any) {
            console.log("Error", error);
            toast.error(error.message || "Something Went Wrong!!!")
        }
        finally {
            setNameInpLoading(false)
        }
        setTimeout(() => {
            setNameInpLoading(false);
        }, 1000)
    }

    const getUniqueMembersCount = () => {
        const set = new Set<string>();
        currRoom?.members.map((m: any) => set.add(JSON.stringify(m)))
        return set.size
    }

    useEffect(() => {
        if (file) {
            uploadImage()
        }
    }, [file])

    if (!currRoom) return <></>

    return (
        <div className={`${responsivePage !== 1 && 'hidden' }  absolute top-0 left-0 sm:block  w-full sm:w-[55%] h-full bg-zinc-900 rounded-xl`}>

            <div className=' flex items-center justify-start py-3 text-2xl gap-3 px-4 h-20 border-b border-b-gray-700'>
                <MdClose onClick={() => setShowRoomInfoPage(false)} className=' cursor-pointer text-red-400 text-2xl hover:text-red-300 transition-all duration-100' />
                <div className=''>Room Info</div>
            </div>

            <div className=' flex flex-col items-center py-2 pt-4 gap-2 custom-scrollbar scroll-smooth overflow-y-auto max-h-[85%] '>

                {/* Group Photo */}
                <div className=' bg- red-500 mb-2  relative'>
                    {fileLoading && <div className='absolute h-full w-full  rounded-full bg-black/30 backdrop-blur-[1px] backdrop-brightness-75 flex flex-col justify-center items-center z-10 '> <ClipLoader color='white' /> </div>}
                    <div onMouseEnter={() => { setShowEditPhoto(true) }}
                        onMouseLeave={() => { setShowEditPhoto(false) }}
                        className={` ${showEditPhoto && " cursor-pointer"} h-[150px] w-[150px] rounded-full bg-gray-400 relative`}>
                        {showEditPhoto && <label htmlFor='groupphotoid' className={` ${currRoom.roomPic ? " text-white" : "text-white"} absolute h-full w-full  rounded-full cursor-pointer bg-black/30 backdrop-blur-[1px] backdrop-brightness-75 flex flex-col justify-center items-center`}>
                            <input id='groupphotoid' accept="image/*" className=' hidden' type="file" onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) setFile(f);
                            }}></input>
                            <div className=' text-3xl'><IoIosCamera /></div>
                            <div className=' text-sm'>{currRoom.roomPic ? "Change" : "+ Add"} Room Pic</div>
                        </label>}
                        {!currRoom.roomPic && !updatedRoomDetails.roomPic ? <svg
                            viewBox="0 0 212 212"
                            height="150"
                            width="150"
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
                        </svg> :
                            <img
                                className=' w-full h-full rounded-full  object-cover object-center' src={updatedRoomDetails.roomPic && updatedRoomDetails.roomPic.trim() !== "" ? updatedRoomDetails.roomPic : currRoom.roomPic} alt='Room Pic' loading='lazy' />}
                    </div>
                </div>

                <div className=' flex  items-center text-2xl justify-center gap-4 w-full' >
                    {!showRoomNameInput ? <>
                        <div className=' text-3xl'>{updatedRoomDetails.roomName ? updatedRoomDetails.roomName : currRoom.roomName}</div>
                        <BiPencil onClick={() => { setShowRoomNameInput(true); }} className=' hover:cursor-pointer' /></>
                        :
                        <div className={` relative w-full flex justify-center items-center`}>
                            <input
                                onKeyDown={(e) => { if (e.key === "Enter") changeRoomNameHandler() }}
                                ref={roomNameInputRef}
                                value={roomNameInpValue}
                                onChange={(e) => setRoomNameInpValue(e.target.value)}
                                type='text'
                                placeholder='Room Name'
                                disabled={nameInpLoading}
                                className={`border-b focus:border-b-green-500  w-[90%]  bg-inherit text-white outline-none p-2 pr-[50px]`} >
                            </input>
                            <div className=' absolute flex justify-center items-center right-5'>
                                {nameInpLoading ? <BeatLoader color='green' size={11} /> : <>
                                    <IoMdClose onClick={() => {
                                        setShowRoomNameInput(false)
                                        setRoomNameInpValue(updatedRoomDetails.roomName ? updatedRoomDetails.roomName : currRoom.roomName)
                                    }} className=' text-2xl text-red-500 cursor-pointer hover:text-red-300 transition-all duration-100' />
                                    <IoMdCheckmark onClick={changeRoomNameHandler} className=' text-2xl text-green-500 cursor-pointer hover:text-green-300 transition-all duration-100' />
                                </>}
                            </div>
                        </div>}
                </div>

                <div className=' text-gray-200'>Room Member - {currRoom.members?.length && getUniqueMembersCount()}</div>

                <div className=' bg-zinc-950 h-1 my-2 w-full'></div>

                <div className=' flex flex-co gap-3 items-center justify-between w-[90%] mx-auto'>
                    <div className=' text-xl'>Room Code</div>
                    <div className=' flex justify-center items-center gap-2 text-sm italic'>
                        <div onClick={copyRoomIdHandler} className=' cursor-pointer hover:underline hover:text-zinc-200' >{currRoom.join_code}</div>
                        <div onClick={copyRoomIdHandler} className=' text-lg'><BiCopy className=' hover:text-zinc-400 transition-all duration-200 cursor-pointer' /></div>
                    </div>
                </div>

                <div className=' bg-zinc-950 h-1 my-2 w-full'></div>

                {/* Serach Member */}
                <div className=' w-[90%] my-1'>
                    {!showSearchMemberInput ? <div className=' w-full flex justify-between items-center '>
                        <div onClick={() => { setShowSearchMemberInput(true); }} className=' text-zinc-300 cursor-pointer hover:text-zinc-400 transition-all duration-200'>
                            {currRoom.members?.length && getUniqueMembersCount()} Members
                        </div>
                        <div onClick={() => { setShowSearchMemberInput(true); }} className=' text-lg cursor-pointer hover:text-zinc-400 transition-all duration-200'>
                            <IoIosSearch />
                        </div>
                    </div> :
                        <div className=' border-b border-b-green-300 w-full flex justify-center items-center'>
                            <input ref={memberInputRef} type='text' value={searchMemberText} onChange={(e) => {
                                setSearchMemberText(e.target.value)
                                setSearchMembers(() => {
                                    const mem = currRoom.members.filter((m: any) => m.user.name?.includes(e.target.value) || m.user?.email.includes(e.target.value))
                                    return mem
                                })
                            }} placeholder='Search Members' className=' bg-inherit w-[90%] text-white outline-none'></input>
                            <IoMdClose onClick={() => { setSearchMemberText(""); setSearchMembers(currRoom.members); setShowSearchMemberInput(false) }} className=' text-2xl cursor-pointer hover:text-zinc-300 transition-all duration-100' />
                        </div>}
                </div>
                <div className=' w-[90%] flex flex-col justify-start items-center gap-3  min-h-[10vh]  pr-3'>
                    {/* <div className=' w-[100%] flex items-center justify-start gap-2 '>
                        <Avatar height='h-11' width='w-11'  img={null} username={"yatin dora"}></Avatar>
                        <div className=' flex flex-col'>
                            <div >Yatin Dora</div>
                            <div className=' text-sm'>yatin.dora81@gmail.com</div>
                        </div>
                    </div> */}




                    {
                        uniqueMembers.length > 0 ?
                            uniqueMembers.map((member: any, i: number) => <div key={member.user.id} className=' w-[100%] flex items-center justify-between  py-1 border-b border-b-zinc-700'>
                                <div className=' flex gap-2'>
                                    <Avatar height='h-11' width='w-11' img={member.user.profilePic} username={member.user.name}></Avatar>
                                    <div className=' flex flex-col'>
                                        <div >{member.user.name}</div>
                                        <div className=' text-sm'>{member.user.email}</div>
                                    </div>
                                </div>
                                <div className=' flex  justify-center items-center gap-2'>
                                    {user.user_id === member.user.id && <div className=' text-gray-200 px-2 border p-1 rounded-2xl lowercase'>you</div>}
                                    {currRoom.createdById === member.user.id && <div className=' text-green-500 border p-1 rounded-2xl capitalize'>Admin</div>}
                                </div>

                            </div>)

                            : <div className=' w-[100%] text-center flex items-center justify-center  py-1 border-b border-b-zinc-700'> No Member Found!!! </div>
                    }
                    

                </div>

            </div>

        </div>
    )
}

export default RoomInfo
