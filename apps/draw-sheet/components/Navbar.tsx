import Link from 'next/link'
import React from 'react'
import { PiPencilSimpleLineLight, PiPlus } from 'react-icons/pi'

function Navbar() {
    return (
        <div className=" w-full border-b h-[4.5rem] top-0 sticky backdrop-blur-lg bg-zinc-950 z-[100] border-b-zinc-800">
            <div className=" h-full  text-white font-sans flex w-[85rem]   " style={{ marginInline: "auto" }}>

                <div className=" flex justify-between w-full items-center">
                    <div className=" flex text-2xl gap-2 justify-start items-center">
                        <PiPencilSimpleLineLight className=" text-blue-500" />
                        <div className=" font-semibold ">Drawsheet</div>
                    </div>
                    <div className=" h-full flex gap-3 justify-center items-center">
                        <Link href={"/signin"} className=" border flex justify-center items-center h-[50%] w-[5.5rem] border-zinc-800 rounded-lg cursor-pointer font-semibold hover:bg-blue-500 gap-2 transition-colors duration-200 text-sm" style={{ paddingInline: "" }}>Log in</Link>
                        <Link href={"/signup"} className=" border flex justify-center items-center h-[50%] w-[6.5rem] font-semibold border-zinc-800 rounded-lg cursor-pointer bg-blue-500 hover:opacity-80 gap-2 transition-all duration-100 text-sm" style={{ paddingInline: "" }}>Sign up</Link>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Navbar