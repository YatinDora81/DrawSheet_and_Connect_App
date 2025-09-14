import React from 'react'
import { PiPencilSimpleLineLight } from "react-icons/pi";
import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { CiMail } from "react-icons/ci";

function Footer() {
  return (
    <div className=" footer-padding md:h-[6rem] border-t-[1px] border-t-zinc-900">
      <div
        className="w-full md:w-[85rem] flex flex-col md:flex-row justify-center md:justify-between items-center h-full gap-4 md:gap-0"
        style={{ marginInline: "auto" }}
      >
        {/* Left - Logo */}
        <div className="flex text-lg font-semibold gap-2 justify-center md:justify-start items-center">
          <PiPencilSimpleLineLight className="text-blue-500" />
          <div>Drawsheet</div>
        </div>

        {/* Center - Social Links */}
        <div className="flex justify-center items-center gap-[1.7rem]">
          <Link
            href="https://www.linkedin.com/in/yatin-dora/"
            target="_blank"
            className="transition-colors duration-200 rounded-lg hover:bg-blue-500 h-[2rem] text-lg text-white flex justify-center items-center aspect-square"
          >
            <FaLinkedinIn />
          </Link>

          <Link
            href="https://github.com/YatinDora81"
            target="_blank"
            className="transition-colors duration-200 rounded-lg hover:bg-blue-500 h-[2rem] text-lg text-white flex justify-center items-center aspect-square"
          >
            <FaGithub />
          </Link>

          <a
            href="mailto:yatin.dora81@gmail.com"
            className="transition-colors duration-200 rounded-lg hover:bg-blue-500 h-[2rem] text-lg text-white flex justify-center items-center aspect-square"
          >
            <CiMail />
          </a>
        </div>

        {/* Right - Footer Text */}
        <div className="text-sm text-zinc-400 font-mono text-center md:text-right">
          Crafted with ❤️ by Yatin...
        </div>
      </div>
    </div>
  )
}

export default Footer