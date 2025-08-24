import React from 'react'
import { PiPencilSimpleLineLight } from "react-icons/pi";
import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { CiMail } from "react-icons/ci";

function Footer() {
  return (
    <div className=" h-[6rem] bg-zinc-950 text-white  border-t-[1px] border-t-zinc-900" >
          <div className=" w-[85rem] flex justify-between items-center  h-full" style={{ marginInline: "auto" }}>
            <Link href='/' className=" flex text-lg font-semibold gap-2 justify-start items-center">
              <PiPencilSimpleLineLight className=" text-blue-500" />
              <div className=" text-white  ">Drawsheet</div>
            </Link>

            <div className="  flex justify-center items-center gap-[1.7rem]">
              <Link href="https://github.com/yatindora81" target="_blank" className=" transition-colors duration-200 rounded-lg hover:bg-blue-500 h-[2rem] text-lg text-zinc-300 flex justify-center items-center aspect-square"><FiGithub /></Link>
              <Link href="https://www.linkedin.com/in/yatin-dora/" target="_blank" className=" transition-colors duration-200 rounded-lg hover:bg-blue-500 h-[2rem] text-lg text-zinc-300 flex justify-center items-center aspect-square"><FaLinkedinIn /></Link>
              <a href="mailto:yatin.dora81@gmail.com" className="transition-colors duration-200 rounded-lg hover:bg-blue-500 h-[2rem] text-lg text-zinc-300 flex justify-center items-center aspect-square"> <CiMail /> </a>

            </div>

            <div className=" text-sm  text-zinc-400 font-mono ">Crafted with ❤️ by Yatin...</div>

          </div>
        </div>
  )
}

export default Footer