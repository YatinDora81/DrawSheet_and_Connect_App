import Link from "next/link";
import LandingPage_Drawing from "../components/LandingPage_Drawing";
import SelectNavbar from "../components/SelectNavbar";
import { FaArrowRight, FaLinkedinIn } from "react-icons/fa";
import { PiPencilSimpleLineLight } from "react-icons/pi";
import { CiMail } from "react-icons/ci";
import { FiGithub } from "react-icons/fi";
import { featureCards } from "../utils/Homepage_Cards";

function LandingPage() {



    return (
        <div className=" w-full bg-zinc-950 min-h-[100vh] text-white scroll-smooth">

            <SelectNavbar />

            <div className="flex w-[85rem] flex-col" style={{ marginInline: "auto" }}>

                {/* Hero Section */}
                <div className=" h-[32rem] w-full flex justify-between items-center">

                    <div className=" w-[48%] gap-4 h-full flex flex-col  justify-start items-start" style={{ marginTop: "8rem" }}>

                        <div className="h-[50%] flex flex-col items-start justify-center text-[4rem] leading-none font-bold font-sans ">
                            <div>The simplest way to create</div>
                            <div className=" text-blue-500 text-[3.6rem]">diagrams and sketches</div>
                        </div>

                        <div style={{ marginTop: "-2rem" }} className=" text-lg text-zinc-400">
                            Drawsheet is a virtual whiteboard for sketching hand-drawn like diagrams. Collaborative, secure, and works on any device.
                        </div>

                        <div className="  w-full flex gap-3 justify-start items-start">
                            <Link href={"/signin"} className="   border flex justify-center items-center  w-[30%] text-sm font-semibold border-zinc-800 rounded-lg cursor-pointer bg-blue-500 gap-1 hover:opacity-80 flex justify-between items-center gap-2 transition-all duration-100 h-[3rem]" style={{ paddingInline: "" }}><div>Start drawing now</div> <FaArrowRight /> </Link>
                            <Link href={"/signup"} className="border flex justify-center items-center text-sm w-[30%] border-zinc-800 rounded-lg cursor-pointer font-semibold hover:bg-blue-500 gap-2 transition-colors duration-200 h-[3rem]" style={{ paddingInline: "" }}>Sign up - It's free</Link>

                        </div>

                    </div>

                    <LandingPage_Drawing />

                </div>


                {/* Sub Hero Section */}
                <div className=' flex flex-col justify-center items-center w-full gap-[13vh] '>

                    <div className=' flex flex-col justify-center items-center gap-5'>
                        <div className=' text-4xl font-bold' style={{ marginTop: "3.3rem" }}>Why Drawsheet?</div>
                    </div>

                    {/* Feature Cards */}
                    <div className=' w-[90%] flex flex-wrap justify-start items-center gap-5  relative' style={{ marginInline: "auto", marginTop: "-2rem" }}>

                        <div className=' bg-blue-500 blur-[290px] h-[10vh] z-[1] w-[30vw]  top-[40%] right-[30%] absolute'></div>

                        {
                            featureCards.map((c, i) =>
                                <div key={i} className=' z-[11] text-white bg-zinc-900/70 transition-all duration-200 w-[32%] max-w-[32%] py-6 pb-8 rounded-xl  flex flex-col min-h-[10rem] justify-start gap-3 items-start' style={{ paddingInline: "1rem", paddingBlock: "1rem" }}>

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
                <div className="bg-[linear-gradient(to_right,#0D1421,#09090b)] w-full h-[17rem] rounded-2xl flex flex-col items-center justify-center gap-5 " style={{ marginBlock: "7rem" }}>
                    <div className=" text-4xl font-semibold">Ready to start drawing?</div>
                    <div className=" text-xl text-zinc-400">No registration required to start. Just click the button and begin creating.</div>
                    <Link href={"/signin"} className="   border flex justify-center items-center  w-[13%] text-sm font-semibold border-zinc-800 rounded-lg cursor-pointer bg-blue-500 gap-1 hover:opacity-80  transition-all duration-100 h-[3rem]" style={{ paddingInline: "" }}><div>Start drawing now</div></Link>
                </div>

            </div>

            {/* Footer */}
            <div className=" h-[6rem]  border-t-[1px] border-t-zinc-900" >
                <div className=" w-[85rem] flex justify-between items-center  h-full" style={{ marginInline: "auto" }}>
                    <div className=" flex text-lg font-semibold gap-2 justify-start items-center">
                        <PiPencilSimpleLineLight className=" text-blue-500" />
                        <div className="  ">Drawsheet</div>
                    </div>

                    <div className=" flex justify-center items-center gap-[1.7rem]">
                        <Link href="https://github.com/yatindora81" target="_blank" className=" transition-colors duration-200 rounded-lg hover:bg-blue-500 h-[2rem] text-lg text-zinc-300 flex justify-center items-center aspect-square"><FiGithub /></Link>
                        <Link href="https://www.linkedin.com/in/yatin-dora/" target="_blank" className=" transition-colors duration-200 rounded-lg hover:bg-blue-500 h-[2rem] text-lg text-zinc-300 flex justify-center items-center aspect-square"><FaLinkedinIn /></Link>
                        <a href="mailto:yatin.dora81@gmail.com" className="transition-colors duration-200 rounded-lg hover:bg-blue-500 h-[2rem] text-lg text-zinc-300 flex justify-center items-center aspect-square"> <CiMail /> </a>

                    </div>

                    <div className=" text-sm  text-zinc-400 font-mono ">Crafted with ❤️ by Yatin...</div>

                </div>
            </div>

        </div>
    )
}

export default LandingPage