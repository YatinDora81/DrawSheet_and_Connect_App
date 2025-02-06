"use client"
import React from 'react'
import { FaFacebook, FaGoogle, FaLongArrowAltRight } from "react-icons/fa";
import { LiaGripLinesVerticalSolid } from "react-icons/lia";

const AuthPage = ({ isSignup }: { isSignup: boolean }) => {
    return (
        <div className=' min-w-screen min-h-screen bg-zinc-900 text-white flex justify-center items-center'>
            <div className=' w-[80%] flex flex-col justify-center  gap-10'>

                <div className='upperheader text-4xl w-full '>
                    <div className=' w-full text-center'>{isSignup ? "Signup" : "Signin"} to Your Account</div>
                </div>

                <div className=' flex  justify-evenly items-center bg-blue-60'>

                    <div className='leftsideinpbox w-[40%] flex flex-col gap-1'>
                        {isSignup && <input style={{ paddingBlock: "22px", paddingInline: "15px" }} className=' w-full bg-zinc-800 h-10 px-16 py-2 rounded-lg' type='name' placeholder='Username'></input>}
                        <input style={{ paddingBlock: "22px", paddingInline: "15px" }} className=' w-full bg-zinc-800 h-10 px-10' type='email' placeholder='Email'></input>
                        <input style={{ paddingBlock: "22px", paddingInline: "15px" }} className=' w-full bg-zinc-800 h-10 px-10' type='password' placeholder='Password'></input>
                        {isSignup && <input style={{ paddingBlock: "22px", paddingInline: "15px" }} className=' w-full bg-zinc-800 h-10 px-10' type='password' placeholder='Confirm Password'></input>}

                        <button style={{ paddingInline: "20px", paddingBlock: "10px", marginTop: "2px" }} className=' flex justify-between items-center text-xl  w-full bg-green-400 rounded-sm text-zinc-800 cursor-pointer bg-gradient-to-r from-[#A9A5FD] to-[#EBD75D] '>
                            <div>{isSignup ? "Signup" : "Signin"} to Your Account</div>
                            <FaLongArrowAltRight />
                        </button>


                    </div>

                    <div>
                    <LiaGripLinesVerticalSolid />
                        <LiaGripLinesVerticalSolid />
                        <LiaGripLinesVerticalSolid /><LiaGripLinesVerticalSolid />
                        <LiaGripLinesVerticalSolid />
                        <LiaGripLinesVerticalSolid />
                        {isSignup && <LiaGripLinesVerticalSolid />}
                        {isSignup && <LiaGripLinesVerticalSolid />}
                        {isSignup && <LiaGripLinesVerticalSolid />}
                    </div>

                    <div className='w-[40%] flex flex-col gap-2'>

                        <button
                            style={{
                                paddingInline: "20px",
                                paddingBlock: "10px",
                                marginTop: "2px",
                                position: "relative",
                                background: "white",
                                border: "2px solid transparent",
                                borderRadius: "4px",
                                backgroundImage: "linear-gradient(rgb(24 24 27), rgb(24 24 27)), linear-gradient(to right, #A9A5FD, #EBD75D)",
                                backgroundOrigin: "border-box",
                                backgroundClip: "padding-box, border-box"
                            }}
                            className="flex gap-3 items-center text-xl w-full text-zinc-100 cursor-pointer"
                        >
                            <FaGoogle /> {isSignup ? "Signup" : "Signin"} with Google
                        </button>

                        <button
                            style={{
                                paddingInline: "20px",
                                paddingBlock: "10px",
                                marginTop: "2px",
                                position: "relative",
                                background: "white",
                                border: "2px solid transparent",
                                borderRadius: "4px",
                                backgroundImage: "linear-gradient(rgb(24 24 27), rgb(24 24 27)), linear-gradient(to right, #A9A5FD, #EBD75D)",
                                backgroundOrigin: "border-box",
                                backgroundClip: "padding-box, border-box"
                            }}
                            className="flex gap-3 items-center text-xl w-full text-zinc-100 cursor-pointer"
                        >
                            <FaFacebook /> {isSignup ? "Signup" : "Signin"} with Facebook
                        </button>


                    </div>


                </div>

                <div className=' w-full text-center underline transition-all duration-200 italic text-lg cursor-pointer hover:text-zinc-300'>
                    Forgot Password?
                </div>

            </div>
        </div>
    )
}

export default AuthPage
