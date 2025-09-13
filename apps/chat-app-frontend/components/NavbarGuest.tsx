import Link from 'next/link'
import { Toaster } from 'react-hot-toast'
import { IoChatbubbleOutline } from 'react-icons/io5'

const NavbarGuest = ({extenedClass = ""} : {extenedClass ?: string}) => {



    return (
        <div className={` text-white w-full border-b-[1px] border-b-zinc-800 bg-[#09090B] flex items-center justify-between h-[10vh] ${extenedClass} `}>
            <div><Toaster position="bottom-right"
                reverseOrder={false} /></div>
            <div className=' w-[90%]  flex justify-between items-center h-full sm:px-[1.5rem]' style={{ marginInline: "auto" }}>
                <div>
                    <Link href={"/"} className=' text-[25px] font-[700] leading-[28px] flex justify-center items-center gap-2 ff' ><span className=' text-green-600 text-3xl'><IoChatbubbleOutline /></span><span>connect</span></Link>
                </div>


                <div className=' flex justify-center items-center gap-2'>

                    <Link className='   text-lg bg-green-600 sm:bg-white ff font-medium text-white sm:text-zinc-700 px-4 py-[6px] hover:bg- zinc-900/50 transition-all duration-200 hover:text -gray-300 rounded-md  hover:opacity-80' 
                        href="/signin">Login</Link>
                    <Link className=' hidden sm:block  text-lg bg-green-600 ff font-medium text-white px-4 py-[6px]  hover:bg-green-700 transition-all duration-200 hover:text-gray-300 rounded-md' href="/signup">Get Started</Link>

                </div>



            </div>
        </div>

    )
}

export default NavbarGuest
