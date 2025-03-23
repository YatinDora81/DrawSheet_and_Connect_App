"use client"
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { CiSettings } from 'react-icons/ci';
import { HiDotsVertical } from 'react-icons/hi';
import { IoIosExit } from 'react-icons/io';
import { IoLogOut } from 'react-icons/io5';
import { MdGroup } from 'react-icons/md';

const ChatMenuItem = ({setShowRoomInfoPage} : {setShowRoomInfoPage : (val : boolean)=>void}) => {

    const [subMenu, setSubMenu] = useState(false)
    const ref = useRef<HTMLDivElement>(null);

    const menuItems = [
        {
            icon: <CiSettings />,
            itemName: "Room Settings",
            clickHandler : ()=>setShowRoomInfoPage(true)
        },
        {
            icon: <IoIosExit className=' text-red-500' />,
            itemName: "Leave Room",
            clickHandler : ()=> toast.success("Functionality Comming Soon..." , {
                icon: '😊',
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              })
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
        <div ref={ref} onClick={() => setSubMenu((prev) => !prev)} className={` cursor-pointer relative  flex justify-center items-center  h-11 w-11 rounded-full`}>
            <HiDotsVertical className=' text-3xl transition-all duration-200 hover:opacity-80' />


            {/* submenu */}
            { subMenu &&  <div className=' absolute left-[-8rem] top-14 z-10 overflow-x-auto min-w-[12vw] bg-zinc-800 rounded-2xl flex justify-center items-center flex-col p-1 border border-zinc-700'>
                {menuItems.map((item, i) => <div key={i} onClick={item.clickHandler} className={` ${menuItems.length-1!==i &&' border-b'} w-full flex items-center justify-start p-3 gap-2 cursor-pointer hover:opacity-60`}>
                    <div>{item.icon}</div>
                    <div>{item.itemName}</div>
                </div>
                )}


            </div>
}

        </div>
    )
}

export default ChatMenuItem
