"use client"
import { PiPencilSimpleLineLight, PiPlus, PiSignOutLight } from "react-icons/pi";
import ModalContainer from "./Modals/ModalContainer";
import { useModal } from "../hooks/useModal";
import NavbarImage from "./NavbarImage";
import { MdOutlineFileUpload } from "react-icons/md";
import { hashCode, svg_string, svgArray } from "../utils/mockdata";
import { CiCamera } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { toast_darktheme } from "../utils/toast-darktheme";
import { SignOut_User_URL } from "@repo/config/URL";
import { useAuth } from "../hooks/useAuth";
import { LuLayoutDashboard } from "react-icons/lu";
import { useAvatar } from "../hooks/useAvatars";
import Link from "next/link";

function NavbarClient() {

    const { showModal, setShowModal, Modals } = useModal()
    const [openMenuItems, setOpenMenuItems] = useState(false)
    const menuItemRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const { user } = useAuth()
    const { avatars } = useAvatar()
    const pathName = usePathname()

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

            const logoutPromise = fetch('/api/signout', {
                method: "GET",
                credentials: "include",
            }).then(async (res) => {
                const d = await res.json();
                // if (!d.success) throw new Error("Logout failed");
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

            if (pathName === '/') {
                window.location.reload()
            }
            else router.push("/");
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
                    <Link href={'/'} className=" flex text-2xl gap-2 justify-start items-center">
                        <PiPencilSimpleLineLight className=" text-blue-500" />
                        <div className=" font-semibold ">Drawsheet</div>
                    </Link>
                    <div className=" h-full flex gap-3 justify-center items-center">
                        {pathName!=='/' && <button onClick={() => setShowModal(0)} className=" border flex justify-center items-center h-[50%] w-[9rem] border-zinc-800 rounded-lg cursor-pointer hover:bg-blue-500 gap-2 transition-colors duration-200 text-sm" style={{ paddingInline: "" }}> <PiPlus></PiPlus> New Drawing</button>}
                        <div className=" text-white relative" onClick={() => { setOpenMenuItems((prev) => !prev) }}>


                            {/* Menu Items */}
                            {openMenuItems && <div ref={menuItemRef} onClick={(e) => { e.stopPropagation() }} className=' absolute bg-zinc-950 backdrop-blur-2xl flex flex-col gap-1 border border-zinc-800 rounded-lg z-[90] min-h-[10rem] w-[18rem] h-fit top-[110%] -right-[150%]  ' style={{ paddingBlock: "0.5rem", paddingInline: "0.8rem" }}>
                                <div className=' flex flex-col justify-center gap-1 items-center h-[5.8rem]' style={{ paddingInline: "0.7rem", paddingBlock: "0.4rem" }}>

                                    {user && <div
                                        dangerouslySetInnerHTML={{
                                            __html: user?.profilePic
                                                ?
                                                avatars[parseInt(user?.profilePic)]
                                                :
                                                svgArray[hashCode(user?.user_id) % (svgArray.length || 2)]
                                        }}
                                        className='h-full border border-zinc-800 rounded-full aspect-square'
                                    />}

                                    <div className=" font-semibold">Welcome back {user && user.name}!</div>

                                </div>

                                <div className=" w-full flex-col justify-center items-center gap-2 flex">
                                    <button onClick={() => setShowModal(2)} className=" border flex justify-center items-center h-[50%] w-full  font-semibold border-zinc-800 rounded-lg cursor-pointer hover:bg-blue-500 gap-2 transition-colors duration-200 text-sm" style={{ paddingBlock: "0.5rem" }}> <CiCamera className=" text-xl"></CiCamera> Choose Avatar</button>
                                    {/* <button onClick={() => { }} className=" border flex justify-center items-center h-[50%] w-full  font-semibold border-zinc-800 rounded-lg cursor-pointer hover:bg-blue-500 gap-2 transition-colors duration-200 text-sm" style={{ paddingBlock: "0.5rem" }}> <MdOutlineFileUpload className=" text-xl"></MdOutlineFileUpload > Upload Photo</button> */}
                                    {pathName !== '/sheets' && <button onClick={() => {router.push('/sheets')}} className=" border flex justify-center items-center h-[50%] w-full  font-semibold border-zinc-800 rounded-lg cursor-pointer hover:bg-blue-500 gap-2 transition-colors duration-200 text-sm" style={{ paddingBlock: "0.5rem" }}> <LuLayoutDashboard className=" text-xl"></LuLayoutDashboard > Dashborad</button>}
                                    <button onClick={signoutHandler} className=" border text-red-500 flex justify-center items-center h-[50%] w-full  font-semibold border-zinc-800 rounded-lg cursor-pointer hover:opacity-70 gap-2 transition-colors duration-200 text-sm" style={{ paddingBlock: "0.5rem" }}> <PiSignOutLight className=" text-xl" />Sign Out</button>
                                </div>


                            </div>}



                            <NavbarImage name={user?.name || 'Yat'} svg={user?.profilePic} id={user?.user_id || "okay"} />



                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default NavbarClient