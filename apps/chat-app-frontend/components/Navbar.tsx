"use client"
import Link from 'next/link'
import Avatar from './Avatar'
import Modal from './Modal'
import CreateNewRoomModal from './CreateNewRoomModal'
import { useState } from 'react'
import JoinNewRoomModal from './JoinRoomModal'
import YesNoModal from './YesNoModal'
import { Toaster } from "react-hot-toast"

const Navbar = () => {

    // const [isUser , setIsUser] = useState(false);

    // useEffect(()=>{
    //     (async()=>{
    //         const res = await fetch(Get_User_Details_URL , {method : "GET" , credentials : "include"});
    //         const data = await res.json()
    //         if(data.success){
    //             setIsUser(true)
    //         }
    //         console.log(data);

    //     })()
    // })

    const [showModal, setShowModal] = useState<boolean>(true);



    const isUser = true

    return (
        <div className=' text-white w-full border-b border-b-zinc-600 flex items-center justify-between h-[10vh] '>
            <div><Toaster position="bottom-right"
                reverseOrder={false} /></div>
            <div className=' w-[90%]  flex justify-between items-center h-full' style={{ marginInline: "auto", paddingInline: "1.5rem" }}>
                <div>
                    <div className=' text-4xl poppins-bold-italic'>Chatify</div>
                </div>

                {/* {showModal && <Modal showModal={showModal} setShowModal={setShowModal} Component={YesNoModal}></Modal>} */}

                {!isUser && <div className=' flex justify-center items-center gap-2'>

                    <Link className='  border text-lg' style={{
                        paddingInline: "15px",
                        paddingBlock: "5px",
                        marginTop: "2px",
                        position: "relative",
                        background: "white",
                        border: "2px solid transparent",
                        borderRadius: "4px",
                        backgroundImage: "linear-gradient(rgb(24 24 27), rgb(24 24 27)), linear-gradient(to right, #A9A5FD, #EBD75D)",
                        backgroundOrigin: "border-box",
                        backgroundClip: "padding-box, border-box"
                    }}
                        href="/signin">Login</Link>
                    <Link style={{
                        paddingInline: "15px",
                        paddingBlock: "5px",
                        marginTop: "2px",
                        position: "relative",
                        border: "2px solid transparent",
                        borderRadius: "4px",
                        background: "linear-gradient(to right, #A9A5FD, #EBD75D)",
                        backgroundOrigin: "border-box",
                        backgroundClip: "padding-box, border-box"
                    }} className=' text-black  border text-lg' href="/signup">SignUp</Link>

                </div>}

                {isUser && <div className=' flex justify-center items-center gap-2'>

                    {/* <Link className='  border text-lg' style={{
                        paddingInline: "15px",
                        paddingBlock: "5px",
                        marginTop: "2px",
                        position: "relative",
                        background: "white",
                        border: "2px solid transparent",
                        borderRadius: "4px",
                        backgroundImage: "linear-gradient(rgb(24 24 27), rgb(24 24 27)), linear-gradient(to right, #A9A5FD, #EBD75D)",
                        backgroundOrigin: "border-box",
                        backgroundClip: "padding-box, border-box"
                    }}
                        href="/signin">LogOut</Link> */}

                    <Avatar img={null} username={"yatin dora"} ></Avatar>

                </div>}
            </div>

        </div>
    )
}

export default Navbar
