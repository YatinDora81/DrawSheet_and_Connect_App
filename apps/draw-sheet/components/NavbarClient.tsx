"use client"
import { PiPencilSimpleLineLight, PiPlus, PiSignOutLight } from "react-icons/pi";
import ModalContainer from "./Modals/ModalContainer";
import { useModal } from "../hooks/useModal";
import NavbarImage from "./NavbarImage";
import { MdOutlineDeleteOutline, MdOutlineFileDownload, MdOutlineFileUpload } from "react-icons/md";
import { IoShareOutline } from "react-icons/io5";
import { svg_string } from "../utils/mockdata";
import { CiCamera } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
import { GoSignOut } from "react-icons/go";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { toast_darktheme } from "../utils/toast-darktheme";
import { SignOut_User_URL } from "@repo/config/URL";

function NavbarClient() {

    const { showModal, setShowModal, Modals } = useModal()
    const [openMenuItems, setOpenMenuItems] = useState(false)
    const menuItemRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (menuItemRef && !menuItemRef.current?.contains(e.target as Node) && showModal === -1) setOpenMenuItems(false)
        }
        document.addEventListener("mousedown", handleClick)
        return () => {
            document.removeEventListener("mousedown", handleClick)
        }
    }, [showModal])

    const signoutHandler = async () => {

        try {

            const logoutPromise = fetch(SignOut_User_URL, {
                method: "GET",
                credentials: "include",
            }).then(async (res) => {
                const d = await res.json();
                if (!d.success) throw new Error(d.message || "Logout failed");
                return d;
            });

            const d = await toast.promise(
                logoutPromise,
                {
                    loading: "Logging out...",
                    success: (d: any) => d.message || "User logged out successfully!",
                    error: (err: any) => err.message || "Something went wrong!",
                },
                toast_darktheme
            );

            router.push("/");
        } catch (error) {
            console.error("Error", error);
            toast.error("Something Went Wrong!!!", toast_darktheme)
        }
    }

    return (
        <div className=" w-full border-b h-[4.5rem] top-0 sticky backdrop-blur-lg bg-zinc-950 z-[100] border-b-zinc-800">
            <ModalContainer setShowModal={setShowModal} showModal={showModal}>{Modals[showModal]?.component}</ModalContainer>
            <div className=" h-full    text-white font-sans flex w-[89%]   " style={{ marginInline: "auto" }}>

                <div className=" flex justify-between w-full items-center">
                    <div className=" flex text-2xl gap-2 justify-start items-center">
                        <PiPencilSimpleLineLight className=" text-blue-500" />
                        <div className=" font-semibold ">Drawsheet</div>
                    </div>
                    <div className=" h-full flex gap-3 justify-center items-center">
                        <button onClick={() => setShowModal(0)} className=" border flex justify-center items-center h-[50%] w-[9rem] border-zinc-800 rounded-lg cursor-pointer hover:bg-blue-500 gap-2 transition-colors duration-200 text-sm" style={{ paddingInline: "" }}> <PiPlus></PiPlus> New Drawing</button>
                        <div className=" text-white relative" onClick={() => { setOpenMenuItems((prev) => !prev) }}>


                            {/* Menu Items */}
                            {openMenuItems && <div ref={menuItemRef} onClick={(e) => { e.stopPropagation() }} className=' absolute bg-zinc-950 backdrop-blur-2xl flex flex-col gap-1 border border-zinc-800 rounded-lg z-[90] min-h-[10rem] w-[18rem] h-fit top-[110%] -right-[150%]  ' style={{ paddingBlock: "0.5rem", paddingInline: "0.8rem" }}>
                                <div className=' flex flex-col justify-center gap-1 items-center h-[5.8rem]' style={{ paddingInline: "0.7rem", paddingBlock: "0.4rem" }}>

                                    <div
                                        dangerouslySetInnerHTML={{ __html: svg_string }}
                                        className='h-full border border-zinc-800 rounded-full aspect-square'
                                    />
                                    <div className=" font-semibold">Welcome back!</div>

                                </div>

                                <div className=" w-full flex-col justify-center items-center gap-2 flex">
                                    <button onClick={() => setShowModal(2)} className=" border flex justify-center items-center h-[50%] w-full  font-semibold border-zinc-800 rounded-lg cursor-pointer hover:bg-blue-500 gap-2 transition-colors duration-200 text-sm" style={{ paddingBlock: "0.5rem" }}> <CiCamera className=" text-xl"></CiCamera> Choose Avatar</button>
                                    <button onClick={() => { }} className=" border flex justify-center items-center h-[50%] w-full  font-semibold border-zinc-800 rounded-lg cursor-pointer hover:bg-blue-500 gap-2 transition-colors duration-200 text-sm" style={{ paddingBlock: "0.5rem" }}> <MdOutlineFileUpload className=" text-xl"></MdOutlineFileUpload > Upload Photo</button>
                                    <button onClick={signoutHandler} className=" border text-red-500 flex justify-center items-center h-[50%] w-full  font-semibold border-zinc-800 rounded-lg cursor-pointer hover:bg-blue-500 gap-2 transition-colors duration-200 text-sm" style={{ paddingBlock: "0.5rem" }}> <PiSignOutLight className=" text-xl" />Sign Out</button>
                                </div>


                            </div>}



                            <NavbarImage name="YD" svg="c" />



                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default NavbarClient