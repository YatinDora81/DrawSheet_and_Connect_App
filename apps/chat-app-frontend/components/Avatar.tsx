"use client"
import React, { useEffect, useRef, useState } from 'react'
import { IoLogOut } from 'react-icons/io5';
import { MdDashboard, MdGroup } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { useAuth } from '../hooks/useAuth';
import { usePathname, useRouter } from 'next/navigation';

const Avatar = ({ img, username, height, width }: { img: string | null, username: string, height?: string, width?: string }) => {

    const [subMenu, setSubMenu] = useState(false)
    const ref = useRef<HTMLDivElement>(null);
    const { user, setUser, userLoading, logoutUser } = useAuth()
    const pathName = usePathname()
    const router = useRouter()

    if (!user) return

    const menuItems = [
        // {
        //     icon: <MdGroup />,
        //     itemName: "Create New Room"
        // },
        {
            icon: <CiSettings />,
            itemName: "Account Settings",
            clickHandler: () => {
                console.log("Clickked!!!");
            }
        },
        {
            icon: <IoLogOut />,
            itemName: "Logout",
            clickHandler: logoutUser
        }
    ]

    useEffect(() => {

        function handleEvent(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) setSubMenu(false)
        }

        document.addEventListener("mousedown", handleEvent);

        return () => {
            document.removeEventListener("mousedown", handleEvent)
        }

    }, [])

    return (
        <div ref={ref} onClick={() => setSubMenu((prev) => !prev)} className={` relative bg-zinc-700 ${subMenu && 'border'}  ${height && width ? height + "  " + width : "h-11 w-11"}    rounded-full `}>
            {
                img ? <div className=' w-full h-full  rounded-full'>
                    <img src={img} className=' rounded-full'></img>
                </div> : <div className=' w-[100%] h-full flex justify-center items-center text-xl rounded-full'>
                    {username && username.split(" ").slice(0, 2).map(word => word.charAt(0)).join("").toUpperCase()}
                </div>
            }


            {/* submenu */}
            {subMenu && <div className=' absolute left-[-6rem] top-14 z-10 overflow-x-auto min-w-[15vw] bg-zinc-800 rounded-2xl flex justify-center items-center flex-col p-1 border border-zinc-700'>
                {
                    pathName !== '/dashboard' && <div onClick={()=>router.push("/dashboard")} className={` border-b w-full flex items-center justify-start p-3 gap-2 cursor-pointer hover:opacity-60`}>
                        <div><MdDashboard /></div>
                        <div>Dashboard</div>
                    </div>
                }
                {menuItems.map((item, i) => <div key={i} onClick={item.clickHandler} className={` ${menuItems?.length - 1 !== i && ' border-b'} w-full flex items-center justify-start p-3 gap-2 cursor-pointer hover:opacity-60`}>
                    <div>{item.icon}</div>
                    <div>{item.itemName}</div>
                </div>
                )}


            </div>
            }

        </div>
    )
}

export default Avatar