"use client"
import React, { FormEvent, useEffect, useState } from 'react'
import { FaFacebook, FaGoogle, FaLongArrowAltRight } from "react-icons/fa";
import { LiaGripLinesVerticalSolid } from "react-icons/lia";
import { SignIn_User_URL, SignUp_User_URL } from "@repo/config/URL"
import toast from "react-hot-toast"
import {BeatLoader} from "react-spinners"
import { useRouter } from 'next/navigation';

const AuthPage = ({ isSignup }: { isSignup: boolean }) => {

    const router = useRouter()

    const [formData, setFormData] = useState<{
        name?: string,
        email: string,
        password: string,
        confirmPassword?: string
    }>({ name: "", email: "", password: "", confirmPassword: "" })

    const [error, setError] = useState("");
    const [loading , setLoading] = useState(false);

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault()
        setError("");
        if (formData.email === "" || formData.password === "" || (isSignup && formData.name === "") || (isSignup && formData.confirmPassword === "")) {
            setError("Please Fill All The Details")
            toast.error("Please Fill All The Details")
            return
        }
        if( isSignup && formData.password!==formData.confirmPassword ){
            setError("Password Not Matching!!!")
            toast.error("Password Not Matching!!!")
            return
        }
        setError("");
        try {
            setLoading(true)
            const signupData = { name : formData.name , email : formData.email , password : formData.password };
            const signinData = { email : formData.email , password : formData.password }
            const res = await fetch( isSignup ? SignUp_User_URL : SignIn_User_URL , { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify(isSignup ? signupData : signinData) })
            const data = await res.json();
            if (data.success) {
                console.log(data);
                toast.success(data.message)
                setFormData({ name: "", email: "", password: "", confirmPassword: "" })
                setError("");
                router.push("/dashboard")
            }
            else {
                setError( typeof data.data === "string" ? data.data : ( data.message || "SomeThing Went Wrong" ) );
                toast.error(typeof data.data === "string" ? data.data : ( data.message || "SomeThing Went Wrong" ))
            }
        } catch (error: any) {
            setError(error.message || "Something Went Wrong")
            toast.error(error.message || "SomeThing Went Wrong")
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isSignup) {
            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            })
        } else {
            setFormData({
                email: "",
                password: "",
            })
        }
    }, [])


    return (
        <div className=' w-full min-h-[90vh] bg-zinc-900 text-white flex justify-center items-center'>
            
            <div className=' w-[80%] flex flex-col justify-center  gap-10'>

                <div className='upperheader text-4xl w-full '>
                    <div className=' w-full text-center'>{isSignup ? "Signup" : "Signin"} to Your Account</div>
                </div>

                <div className=' flex  justify-evenly items-center bg-blue-60'>

                    <form onSubmit={submitHandler} className='leftsideinpbox w-[40%] flex flex-col gap-1'>
                        {isSignup && <input value={formData?.name}
                            onChange={(e) => {
                                setFormData((prev) => {
                                    return { ...prev, name: e.target.value }
                                })
                            }}
                            style={{ paddingBlock: "22px", paddingInline: "15px" }} className=' w-full bg-zinc-800 h-10 px-16 py-2 rounded-lg' type='name' placeholder='Username'></input>}
                        <input value={formData.email} onChange={(e) => setFormData((prev) => { return { ...prev, email: e.target.value } })} style={{ paddingBlock: "22px", paddingInline: "15px" }} className='rounded-lg w-full bg-zinc-800 h-10 px-10' type='email' placeholder='Email'></input>
                        <input value={formData.password} onChange={(e) => setFormData((prev) => { return { ...prev, password: e.target.value } })} style={{ paddingBlock: "22px", paddingInline: "15px" }} className='rounded-lg w-full bg-zinc-800 h-10 px-10' type='password' placeholder='Password'></input>
                        {isSignup && <input value={formData.confirmPassword} onChange={(e) => setFormData((prev) => { return { ...prev, confirmPassword: e.target.value } })} style={{ paddingBlock: "22px", paddingInline: "15px" }} className='rounded-lg w-full bg-zinc-800 h-10 px-10' type='password' placeholder='Confirm Password'></input>}

                        {error && error !== "" && <div className=' text-sm  text-red-500 ' style={{ paddingLeft: "5px" }}> * {error}</div>}

                        <button disabled={loading} style={{ paddingInline: "20px", paddingBlock: "10px", marginTop: "2px" }} className=' flex justify-between items-center text-xl  w-full bg-green-400 rounded-sm  cursor-pointer  bg-gradient-to-r from-purple-500 to-blue-500 text-white transition-all duration-200 hover:opacity-90'>
                            {loading ? <BeatLoader className=' mx-auto ' /> :  <><div>{isSignup ? "Signup" : "Signin"} to Your Account</div>
                            <FaLongArrowAltRight /></>}
                        </button>


                    </form>

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
                            className="flex gap-3 items-center transition-all duration-200 hover:opacity-80 text-xl w-full text-zinc-100 cursor-pointer"
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
                            className="flex gap-3  transition-all duration-200 hover:opacity-80 items-center text-xl w-full text-zinc-100 cursor-pointer"
                        >
                            <FaFacebook /> {isSignup ? "Signup" : "Signin"} with Facebook
                        </button>


                    </div>


                </div>

                <div className=' w-full text-center underline transition-all duration-200 italic text-lg cursor-pointer hover:text-zinc-300'>
                    Forgot Password?
                </div>

            </div>
        </div >
    )
}

export default AuthPage
