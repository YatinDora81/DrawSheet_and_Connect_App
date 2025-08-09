"use client"
import { useEffect, useState } from "react"
import "../app/page.module.css"
import { BiPlus, BiSearch } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { useRoom } from "../hooks/useRoom";
import { ClipLoader } from "react-spinners";
import { useSocket } from "../hooks/useSocket";
export function RoomSection({ setModal }: { setModal: (val: number) => void }) {


    const [searchText, setSearchText] = useState("")
    const { rooms, loadingRooms, setCurrRoom, currRoom, newMessagesMap, setNewMessagesMap, setRooms } = useRoom()
    const { socket } = useSocket()

    const [searchRooms, setSearchRooms] = useState(rooms || [])

    useEffect(() => {
        if (rooms) setSearchRooms(rooms);
    }, [rooms])

    function localSocket(ev: any) {
        const obj = JSON.parse(ev.data);

        if (obj.type === "notification" && obj.notificationType && obj.notificationType === "chat") {
            // @ts-ignore
            setNewMessagesMap((prevMap) => {
                const newMap = new Map(prevMap); // Clone the previous state
                // @ts-ignore
                newMap.set(obj.data.roomId, (newMap.get(obj.data.roomId) || 0) + 1);
                return newMap;
            });

        }

    }

    useEffect(() => {
        if (socket) socket.addEventListener("message", localSocket);
        return ()=>{
            if(socket) socket.removeEventListener("message" , localSocket)
        }
    }, [socket, socket?.OPEN])

    return <div style={{ paddingInline: "15px", paddingBlock: "" }} className=" min-h-[90vh] max-h-[90vh] min-w-[28%]  max-w-[35%]  bg-[#09090B] flex flex-col items-start justify-start gap-4 overflow-y-auto custom-scrollbar relative">



        {
            rooms.length === 0 && !loadingRooms && <div className=" w-full flex justify-center items-center h-full">
                <div className="flex flex-col items-center justify-center h-[87vh] text-center p-6 bg-zinc-900 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-gray-300">Oh no! You have no rooms 😢</h2>
                    <p className="text-gray-400 mt-2">Please create a new room to get started.</p>
                    <div className=" flex justify-center items-center gap-2 mt-3">
                        <button onClick={() => setModal(0)} className=" px-5 py-2 bg-green-600 text-black font-semibold rounded-lg hover:bg-green-700 cursor-pointer transition-all flex items-center justify-center">
                            <BiPlus className=" text-xl" />Create New Room
                        </button>
                        <button onClick={() => setModal(1)} className="px-5 py-2 cursor-pointer bg-zinc-100 text-black font-semibold rounded-lg hover:opacity-80 transition-all">
                            Join New Room
                        </button>
                    </div>
                </div>
            </div>

        }


        {!loadingRooms && rooms.length > 0 && <div className=" w-full flex  flex-col gap-2 items-start sticky top-0 z-8 bg-[#09090B] pt-4 pb-1">
            <div className=" bg-zinc-900 w-full flex justify-start items-center gap-2  text-xl p-2 rounded-full px-4 ">
                <label htmlFor="sea" className=" text-xl cursor-pointer"><BiSearch></BiSearch></label>
                <input type="text" value={searchText} onChange={(e) => {
                    setSearchText(e.target.value); setSearchRooms(() => {
                        const r = rooms.filter((d) => d["room"]?.roomName?.toLowerCase().includes(e.target.value.toLowerCase()))
                        console.log("r", r);
                        return r
                    })
                }} placeholder="Search" id="sea" className="p-1 w-full bg-lue-600 text-white outline-none text-lg"></input>
                {searchText?.length > 0 && <IoClose onClick={() => { setSearchText(""); setSearchRooms(rooms) }} className=" transition-all duration-100 hover:text-red-500 cursor-pointer border rounded-full p-[2px] text-2xl" />}
            </div>
            <div className=" flex justify-center items-center gap-2 my-1">
                <button onClick={() => setModal(0)} className=" px-5 py-2 bg-green-600 text-black font-semibold rounded-lg hover:bg-green-700 cursor-pointer transition-all flex items-center justify-center">
                    <BiPlus className=" text-xl" />Create New Room
                </button>
                <button onClick={() => setModal(1)} className="  px-5 py-2 cursor-pointer bg-zinc-100 text-black font-semibold rounded-lg hover:opacity-80 transition-all">
                    Join New Room
                </button>
            </div>
        </div>}

        {loadingRooms && <div className=" w-full h-full flex justify-center items-center"><ClipLoader color="white" size={50} /></div>}



        {/* Hardcoded Data */}
        {/* <div className=" cursor-pointer relative bg-zinc-900 flex  justify-between w-full items-center border min-h-16 rounded-xl" style={{ paddingInline: "15px" }}>
            <div className=" text-2xl">Room !</div>
            <div className=" absolute bottom-1 right-3 text-zinc-300">{new Date().getTime()}</div>
            <div className=" flex justify-center items-center gap-1 uppercase text-sm absolute top-2 right-3">
                <div>new</div>
                <div className=" border  h-5 flex justify-center items-center text-sm  bg-green-500 text-black w-5  rounded-full" style={{ padding: "2px" }}>1</div>
            </div>
        </div> */}

        {
            // d.roomName.replace(" ","___")
            searchRooms?.length > 0 && searchRooms.map((d: any, i) => <div onClick={() => {
                if (!currRoom || d["room"].id !== currRoom.id) setCurrRoom(() => d["room"])
            }} key={i} className={` cursor-pointer relative bg-[#1a1a2199] flex  justify-between w-full items-center border min-h-16 rounded-xl ${currRoom === d["room"] ? ' border-green-500 ' : ''} `} style={{ paddingInline: "10px" }}>
                <div className=" flex justify-center items-center gap-2">
                    <div className=' h-[40px] w-[40px] rounded-full bg-gray-400'>
                        {!d["room"].roomPic ? <svg
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
                        </svg> :
                            <img className=' w-full h-full rounded-full object-cover object-center' src={d["room"].roomPic} alt='Room Pic' loading='lazy' />}
                    </div>
                    <div className=" text-2xl">{d["room"]?.roomName || ""}</div>
                </div>
                {/* <div className=" absolute bottom-1 right-3 text-zinc-300">
                    {new Date(d["room"].createdAt).getDate() + "-" +
                        (new Date(d["room"].createdAt).getMonth() + 1) + "-" +
                        new Date(d["room"].createdAt).getFullYear()}
                </div> */}

                {
                    // @ts-ignore
                    newMessagesMap && d["room"].id && newMessagesMap.has(d["room"].id) && newMessagesMap.get(d["room"].id) > 0 && <div className=" flex justify-center items-center gap-1 uppercase text-sm a3">
                        <div className=" italic text-green-500">new</div>
                        <div className=" border  h-5 flex justify-center items-center text-sm  bg-green-500 text-black w-5  rounded-full" style={{ padding: "2px" }}>{newMessagesMap.get(d["room"].id)}</div>
                    </div>}
            </div>)
        }

        {
            searchRooms.length === 0 && searchText.trim() !== "" && <div className="w-full flex flex-col justify-center items-center mt-4 text-center p-4 bg-zinc-900 text-gray-400 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">No Room Found</h2>
                <p className="text-sm mt-1">Try searching with a different name or create a new room.</p>
            </div>
        }








    </div>
}