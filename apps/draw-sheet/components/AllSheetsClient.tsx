"use client"
import { PiPlus } from "react-icons/pi";
import NavbarClient from "../components/NavbarClient";
import { IoEnterOutline, IoListSharp } from "react-icons/io5";
import { HiOutlineHashtag } from "react-icons/hi";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { MdGridOn } from "react-icons/md";
import { useEffect, useState } from "react";
import SingleCard from "./SingleCard";
import SingleCardHorizontal from "./SingleCardHorizontal";
import { useModal } from "../hooks/useModal";
import ModalContainer from "./Modals/ModalContainer";
import { AuthProvider } from "../hooks/useAuth";
import { AvatarProvider } from "../hooks/useAvatars";
import { tabs, useRoom } from "../hooks/useRoom";
import { BarLoader } from "react-spinners";
import { FiUsers } from "react-icons/fi";
import NoRooms from "./NoRooms";
import NoSearchedRoom from "./NoSearchedRoom";
import RoomDetails from "./Modals/RoomDetails";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";
import Footer from "./Footer";


function AllSheetsClient() {

    const [showSubMenu, setShowSubMenu] = useState(-1)
    // const isGri = getLocalStorage('ui-grid')
    const [isGridUi, setIsGridUi] = useState('true')

    const { showModal, setShowModal, Modals } = useModal()
    const { room, roomLoading, setSearchedRoomText, searchedRoomText, originalRooms, DrawingTabs, selectedTab, setSetlectedTab } = useRoom()
    const [showRoomModal, setShowRoomModal] = useState()

    useEffect(() => {
        if (showRoomModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [showRoomModal]);

    useEffect(() => {
        setIsGridUi(getLocalStorage('ui-grid') || 'true')
    }, [])

    useEffect(() => {
       setLocalStorage('ui-grid', isGridUi)
    }, [isGridUi])

    return (
        <div onClick={(e) => { e.stopPropagation(); setShowSubMenu(-1) }} className=" bg-zinc-950 min-h-[100vh] text-white ">

            <ModalContainer setShowModal={setShowModal} showModal={showModal}>{Modals[showModal]?.component}</ModalContainer>
            <div className=" relative h-full flex min-h-[100vh] flex-col justify-start  items-center " style={{ marginInline: "auto" }}>
                <AuthProvider>
                    <AvatarProvider>
                        <NavbarClient />
                    </AvatarProvider>
                </AuthProvider>

                {/* Collabration Rooms Section */}
                <div className="h-full border-b border-b-zinc-800   text-white gap-5 font-sans flex w-[89%]  flex-col  items-start justify-center " style={{ marginInline: "auto", paddingBlock: "2rem" }}>

                    <div className=" w-full flex flex-col items-start justify-center gap-2">
                        <div className=" text-2xl font-[500]">Collaboration Rooms</div>
                        <div className=" text-zinc-400 ">Create or join drawing rooms to collaborate with others in real-time.</div>
                    </div>

                    <div className=" w-full flex flex-col md:flex-row justify-between items-center">

                        <div className=" w-full md:w-[49.5%] border border-zinc-800 gap-6 rounded-xl flex flex-col items-start justify-center" style={{ paddingInline: "1.7rem", paddingBlock: "1.6rem" }}>
                            <div className=" flex flex-col items-start justify-center">
                                <div className=" flex justify-center font-semibold items-center gap-2 text-2xl"><PiPlus className=" text-xl font-bold" /> Create Room</div>
                                <div className=" text-zinc-400 text-sm ">Start a new collaboration room and invite others to join</div>
                            </div>
                            <button onClick={() => setShowModal(0)} className=" flex cursor-pointer gap-2 h-[2.5rem] font-semibold font-sans rounded-xl items-center justify-center w-full bg-blue-500 hover:bg-blue-500/80 transition-colors duration-200"><PiPlus />Create New Room</button>
                        </div>

                        <div className=" w-full md:w-[49.5%] border border-zinc-800 gap-6 rounded-xl flex flex-col items-start justify-center" style={{ paddingInline: "1.7rem", paddingBlock: "1.6rem" }}>
                            <div className=" flex flex-col items-start justify-center">
                                <div className=" flex justify-center font-semibold items-center gap-2 text-2xl">
                                    <IoEnterOutline /> Join Room
                                </div>
                                <div className=" text-zinc-400 text-sm">
                                    Enter a room code to join an existing collaboration session
                                </div>
                            </div>
                            <button onClick={() => setShowModal(1)} className=" flex cursor-pointer gap-2 h-[2.5rem] font-semibold font-sans rounded-xl items-center justify-center w-full hover:bg-blue-500 border border-zinc-800 transition-colors duration-200">
                                <HiOutlineHashtag />Join Existing Room
                            </button>
                        </div>

                    </div>

                </div>


                {/* Your Drawings Section */}
                <div className="h-full  flex flex-col md:flex-row  items-center justify-between w-[70%] md:w-[89%] gap-6 md:gap-0" style={{ marginInline: "auto", paddingBlock: "2rem" }}>
                    <div className=" font-bold text-3xl font-sans">Your  Drawings</div>
                    <div className=" flex items-center justify-center gap-3">
                        <div className=" flex gap-2 justify-center focus-within:outline-1 transition-all duration-200 items-center rounded-lg  w-[15rem] md:w-[18rem] border border-zinc-800 bg-zinc-950" style={{ padding: "0.5rem" }}>
                            <label htmlFor="search"><HiOutlineMagnifyingGlass /></label>
                            <input value={searchedRoomText} onChange={(e) => setSearchedRoomText(e.target.value)} type="text" id="search" className=" w-[90%] font-mono outline-none" placeholder="Search Drawings..."></input>
                        </div>

                        <input name="cards-ui" id="card" type="radio" value="card" className=" hidden" defaultChecked />
                        <input name="cards-ui" id="line" type="radio" value="line" className=" hidden" />
                        <div className=" flex justify-center items-center">
                            <label htmlFor="card" onClick={() => { setIsGridUi('true') }} className={` border-[2px] border-zinc-800 rounded-l-xl h-10  aspect-square flex justify-center items-center text-lg cursor-pointer ${isGridUi && 'bg-zinc-800'} ${!isGridUi && 'hover:bg-blue-500'} transition-colors duration-200`}><MdGridOn /></label>
                            <label htmlFor="line" onClick={() => { setIsGridUi('false') }} className={`h-10 rounded-r-xl border border-zinc-800  aspect-square flex justify-center items-center text-lg cursor-pointer ${!isGridUi && 'bg-zinc-800'} ${isGridUi && 'hover:bg-blue-500'} transition-colors duration-200`}><IoListSharp /></label>
                        </div>

                    </div>
                </div>


                {/* Drawing Tabs Section */}

                <div className=" flex justify-start  gap-6 flex-col w-[89%] items-start   " style={{ marginInline: "auto", paddingBottom: "2.3rem" }}>
                    {originalRooms && originalRooms.length !== 0 && <div className=" bg-zinc-800  rounded-lg flex justify-start items-center text-[0.97rem] font-sans gap-2 " style={{ padding: "0.2rem" }}>
                        {
                            DrawingTabs.map((d, i) => <div key={i} className={` cursor-pointer  font-semibold rounded-[0.30rem] ${selectedTab === d.name ? 'bg-zinc-950 text-white' : 'text-white/70'}  `} onClick={() => setSetlectedTab(d.name as tabs)} style={{ padding: "0.5rem", paddingInline: "0.8rem" }}>{d.name}</div>)
                        }
                    </div>}

                    {!roomLoading && originalRooms && originalRooms.length === 0 && <NoRooms />}
                    {!roomLoading && originalRooms && originalRooms.length !== 0 && (!room || room.length === 0) &&
                        <NoSearchedRoom
                            type={searchedRoomText.length > 0 ? "search" : selectedTab.toLowerCase() as any}
                        />
                    }


                    {
                        roomLoading ? <>
                            <BarLoader color="oklch(0.932 0.032 255.585)" width={"100%"} />
                            <div className=" text-2xl font-mono">Loading....</div>
                        </>
                            :
                            isGridUi.toLocaleLowerCase() === 'true' ?
                                <div className=" w-full flex justify-start items-start gap-5 flex-wrap gap-y-7">

                                    {/* Single Card Grid */}
                                    {room?.map((r: any, i: number) => <SingleCard key={i} showSubMenu={showSubMenu} setShowSubMenu={setShowSubMenu} index={i} data={r} />
                                    )}

                                </div>

                                :
                                <div className=" w-full flex flex-col justify-start items-start flex-wrap gap-y-[14px]">

                                    {/* Single Card Horizontal */}
                                    {room?.map((r: any, i: number) => <SingleCardHorizontal key={i} showSubMenu={showSubMenu} setShowSubMenu={setShowSubMenu} index={i} data={r} />
                                    )}

                                </div>

                    }

                </div>


            </div>



            <div className=" min-h-[10vh]"></div>
            <Footer />

        </div>
    )
}

export default AllSheetsClient