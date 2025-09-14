import Link from "next/link";
import LandingPage_Drawing from "../components/LandingPage_Drawing";
import SelectNavbar from "../components/SelectNavbar";
import { FaArrowRight, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { PiPencilSimpleLineLight } from "react-icons/pi";
import { CiMail } from "react-icons/ci";
import { FiGithub } from "react-icons/fi";
import { featureCards } from "../utils/Homepage_Cards";

function LandingPage() {


    return (
        <div className=" w-full bg-zinc-950 min-h-[100vh] text-white scroll-smooth ">

            <SelectNavbar />

            <div className="flex w-[100%] md:w-[85rem] flex-col globalPadding  " style={{ marginInline: "auto" }}>

                {/* Hero Section */}
                <div className=" md:h-[32rem] w-full flex flex-col md:flex-row justify-between md:items-center  gap-8  md:gap-0 ">

                    <div className=" w-full md:w-[48%] gap-4 h-full flex flex-col  justify-start items-start " style={{ marginTop: "8.2%" }} >

                        <div className="h-[50%] flex flex-col items-start justify-center text-[2rem] md:text-[4rem] leading-none font-bold font-sans ">
                            <div>The simplest way to create</div>
                            <div className=" text-blue-500 text-[1.8rem] md:text-[3.6rem]">diagrams and sketches</div>
                        </div>

                        <div className="herodesc text-sm md:text-lg text-zinc-400">
                            Drawsheet is a virtual whiteboard for sketching hand-drawn like diagrams. Collaborative, secure, and works on any device.
                        </div>

                        <div className="  w-full flex gap-3 justify-start items-start">
                            <Link href={"/signin"} className="   border flex justify-center items-center  w-[45%] md:w-[30%] text-sm font-semibold border-zinc-800 rounded-lg cursor-pointer bg-blue-500 gap-1 hover:opacity-80 flex justify-between items-center gap-2 transition-all duration-100 h-[3rem]" style={{ paddingInline: "" }}><div>Start drawing now</div> <FaArrowRight /> </Link>
                            <Link href={"/signup"} className="border flex justify-center items-center text-sm w-[45%] md:w-[30%] border-zinc-800 rounded-lg cursor-pointer font-semibold hover:bg-blue-500 gap-2 transition-colors duration-200 h-[3rem]" style={{ paddingInline: "" }}>Sign up - It's free</Link>

                        </div>

                    </div>

                    <LandingPage_Drawing />

                </div>


                {/* Sub Hero Section */}
                <div className=' flex flex-col justify-center items-center w-full gap-[6vh] md:gap-[13vh] '>

                    <div className=' flex flex-col justify-center items-center gap-1 md:gap-5'>
                        <div className=' text-2xl md:text-4xl font-bold' style={{ marginTop: "3.3rem" }}>Why Drawsheet?</div>
                    </div>

                    {/* Feature Cards */}
                    <div className=' w-[90%] flex flex-wrap flex-col sm:flex-row  justify-center sm:justify-start items-center gap-5  relative' style={{ marginInline: "auto", marginTop: "-2rem" }}>

                        <div className=' bg-blue-500 blur-[290px] h-[10vh] z-[1] w-[30vw]  top-[40%] right-[30%] absolute'></div>

                        {
                            featureCards.map((c, i) =>
                                <div key={i} className=' z-[11] text-white bg-zinc-900/70 transition-all duration-200 w-full sm:w-[32%] sm:max-w-[32%] py-6 pb-8 rounded-xl  flex flex-col min-h-[10rem] justify-start gap-3 items-start' style={{ paddingInline: "1rem", paddingBlock: "1rem" }}>

                                    <div className=' text-blue-500 text-2xl bg-blue-800/20 h-11 w-11  flex justify-center items-center p-2 rounded-full'>{c.icon}</div>
                                    <div className=' flex flex-col w-full justify-start items-start gap-1'>
                                        <div className=' text-xl font-semibold'>
                                            {c.heading}
                                        </div>
                                        <div className=' text-zinc-400 text-sm'>
                                            {c.subHeading}
                                        </div>
                                    </div>

                                </div>
                            )
                        }

                    </div>

                </div>

                {/* Bottom Section */}
                <div className="bg-[linear-gradient(to_right,#0D1421,#09090b)] w-full h-[12rem] md:h-[17rem] rounded-2xl flex flex-col items-center justify-center gap-2 md:gap-5 bottomsec ">
                    <div className=" text-2xl md:text-4xl font-semibold">Ready to start drawing?</div>
                    <div className=" text-sm text-center globalPadding md:text-xl text-zinc-400">No registration required to start. Just click the button and begin creating.</div>
                    <Link href={"/signin"} className="   border flex justify-center items-center  w-[70%] md:w-[13%] text-sm font-semibold border-zinc-800 rounded-lg cursor-pointer bg-blue-500 gap-1 hover:opacity-80  transition-all duration-100 h-[2.2rem] md:h-[3rem]" style={{ paddingInline: "" }}><div>Start drawing now</div></Link>
                </div>

            </div>

            {/* Footer */}
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

        </div>
    )
}

export default LandingPage