"use client"
import {  useState } from "react"
import "../app/page.module.css"
import { BiPlus, BiSearch } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import {useRoom} from "../hooks/useRoom";
import CreateNewRoomModal from "./CreateNewRoomModal";
import Modal from "./Modal";
export function RoomSection() {

   
    const [searchText, setSearchText] = useState("")
    const {rooms , loadingRooms , setCurrRoom , currRoom} = useRoom()

    console.log("Room",  currRoom);
    
    
    return <div style={{ paddingInline: "15px", paddingBlock: "" }} className=" min-h-[90vh] max-h-[90vh]  w-[35%]  bg-zinc-800 flex flex-col items-start justify-start gap-4 overflow-y-auto custom-scrollbar relative">

        

        {
            rooms.length === 0 && <div className=" w-full ">
                <div className="flex flex-col items-center justify-center h-[87vh] text-center p-6 bg-zinc-900 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-gray-300">Oh no! You have no rooms 😢</h2>
                    <p className="text-gray-400 mt-2">Please create a new room to get started.</p>
                    <div className=" flex justify-center items-center gap-2">
                        <button className=" px-5 py-2 bg-green-600 text-black font-semibold rounded-lg hover:bg-green-700 cursor-pointer transition-all flex items-center justify-center">
                            <BiPlus className=" text-xl" />Create New Room
                        </button>
                        <button className="mt-4 px-5 py-2 cursor-pointer bg-zinc-100 text-black font-semibold rounded-lg hover:opacity-80 transition-all">
                            Join New Room
                        </button>
                    </div>
                </div>
            </div>

        }


        {rooms.length>0  && <div className=" w-full flex  flex-col gap-2 items-start sticky top-0 z-8 bg-zinc-800 pt-4 pb-1">
            <div className=" bg-zinc-900 w-full flex justify-start items-center gap-2  text-xl p-2 rounded-full px-4 ">
                <label htmlFor="sea" className=" text-xl cursor-pointer"><BiSearch></BiSearch></label>
                <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search" id="sea" className="p-1 w-full bg-lue-600 text-white outline-none text-lg"></input>
                {searchText.length > 0 && <IoClose onClick={() => setSearchText("")} className=" transition-all duration-100 hover:text-red-500 cursor-pointer border rounded-full p-[2px] text-2xl" />}
            </div>
            <div className=" flex justify-center items-center gap-2 my-1">
                <button className=" px-5 py-2 bg-green-600 text-black font-semibold rounded-lg hover:bg-green-700 cursor-pointer transition-all flex items-center justify-center">
                    <BiPlus className=" text-xl" />Create New Room
                </button>
                <button className="  px-5 py-2 cursor-pointer bg-zinc-100 text-black font-semibold rounded-lg hover:opacity-80 transition-all">
                    Join New Room
                </button>
            </div>
        </div>}

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
            rooms.length>0 && rooms.map((d: any, i) => <div onClick={()=>{
                if( !currRoom || d["room"].id!==currRoom.id) setCurrRoom(()=>d["room"])
            }} key={i} className={` cursor-pointer relative bg-zinc-900 flex  justify-between w-full items-center border min-h-16 rounded-xl ${currRoom===d["room"] ? ' border-green-500 ' : ''} `} style={{ paddingInline: "15px" }}>
                <div className=" text-2xl">{d["room"]?.roomName || ""}</div>
                <div className=" absolute bottom-1 right-3 text-zinc-300">
                    {new Date(d["room"].createdAt).getDate() + "-" +
                        (new Date(d["room"].createdAt).getMonth() + 1) + "-" +
                        new Date(d["room"].createdAt).getFullYear()}
                </div>
                <div className=" flex justify-center items-center gap-1 uppercase text-sm absolute top-2 right-3">
                    <div>new</div>
                    <div className=" border  h-5 flex justify-center items-center text-sm  bg-green-500 text-black w-5  rounded-full" style={{ padding: "2px" }}>1</div>
                </div>
            </div>)
        }








    </div>
}