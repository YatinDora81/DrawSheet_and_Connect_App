"use client"
import React, { FormEvent, useEffect, useState } from 'react'
import { FaFacebook, FaGoogle, FaLongArrowAltRight } from "react-icons/fa";
import { LiaGripLinesVerticalSolid } from "react-icons/lia";
import { SignIn_User_URL, SignUp_User_URL } from "@repo/config/URL"
import toast from "react-hot-toast"
import { BeatLoader } from "react-spinners"
import { useRouter } from 'next/navigation';
import { MdEmail, MdOutlineEmail } from 'react-icons/md';
import { IoChatbubbleOutline, IoLockClosedOutline } from 'react-icons/io5';


const AuthPage = ({ isSignup }: { isSignup: boolean }) => {

    const router = useRouter()

    const [formData, setFormData] = useState<{
        name?: string,
        email: string,
        password: string,
        confirmPassword?: string
    }>({ name: "", email: "", password: "", confirmPassword: "" })

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault()
        setError("");
        if (formData.email === "" || formData.password === "" || (isSignup && formData.name === "") || (isSignup && formData.confirmPassword === "")) {
            setError("Please Fill All The Details")
            toast.error("Please Fill All The Details")
            return
        }
        if (isSignup && formData.password !== formData.confirmPassword) {
            setError("Password Not Matching!!!")
            toast.error("Password Not Matching!!!")
            return
        }
        setError("");
        try {
            setLoading(true)
            const signupData = { name: formData.name, email: formData.email, password: formData.password };
            const signinData = { email: formData.email, password: formData.password }
            const res = await fetch(isSignup ? SignUp_User_URL : SignIn_User_URL, { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify(isSignup ? signupData : signinData) })
            const data = await res.json();
            if (data.success) {
                // console.log(data);
                toast.success(data.message)
                setFormData({ name: "", email: "", password: "", confirmPassword: "" })
                setError("");

                router.push("/dashboard")

            }
            else {
                setError(typeof data.data === "string" ? data.data : (data.message || "SomeThing Went Wrong"));
                toast.error(typeof data.data === "string" ? data.data : (data.message || "SomeThing Went Wrong"))
            }
        } catch (error: any) {
            setError(error.message || "Something Went Wrong")
            toast.error(error.message || "SomeThing Went Wrong")
        } finally {
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
        <div className=' w-full min-h-[90vh] bg-zinc-950 text-white flex flex-col gap-7  justify-center items-center'>

            <div>
                <div className=' text-[25px] font-[700] leading-[28px] flex flex-col justify-center items-center  ff' ><span className=' text-green-600 text-4xl bg-zinc-900 p-2 rounded-full'><IoChatbubbleOutline /></span><span className=' text-3xl'>connect</span></div>
                <div className=' text-md text-zinc-300'>Sign in to your account to continue</div>
            </div>

            <div className=' w-[35%] flex flex-col justify-center bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 shadow-xl rounded-xl  gap-10 py-10'>

                {/* <div className='upperheader text-4xl w-full '>
                    <div className=' w-full text-center'>{isSignup ? "Signup" : "Signin"} to Your Account</div>
                </div> */}

                <div className=' flex  justify-evenly items-center '>


                    <form onSubmit={submitHandler} className='leftsideinpbox w-[85%]  flex flex-col gap-4'>
                        {isSignup && <input value={formData?.name}
                            onChange={(e) => {
                                setFormData((prev) => {
                                    return { ...prev, name: e.target.value }
                                })
                            }}
                            style={{ paddingBlock: "22px", paddingInline: "15px" }} className=' w-full bg-zinc-800 h-10 px-16 py-2 rounded-lg' type='name' placeholder='Username'></input>}
                        <div className=' w-full flex flex-col gap-1'>
                            <label htmlFor='emaill'>Email</label>
                            <div className=' flex justify-center items-center w-full border border-zinc-950 shadow-2xl'>
                                <MdOutlineEmail className=' text-gray-300 bg-zinc-800 rounded-l-lg h-11 w-[12%] px-3' />
                                <input id='emaill' value={formData.email} onChange={(e) => setFormData((prev) => { return { ...prev, email: e.target.value } })} style={{ paddingBlock: "22px", paddingInline: "1px" }} className='rounded-r-lg w-full outline-none bg-zinc-800 h-10 px-10' type='email' placeholder='your@email.com'></input>
                            </div>
                        </div>

                        <div className=' w-full flex flex-col gap-1'>
                            <label htmlFor='passs'>Password</label>
                            <div className=' flex justify-center items-center w-full border border-zinc-950 shadow-2xl'>
                                <IoLockClosedOutline className=' text-gray-300 bg-zinc-800 rounded-l-lg h-11 w-[12%] px-3 ' />
                                <input id='passs' value={formData.password} onChange={(e) => setFormData((prev) => { return { ...prev, password: e.target.value } })} style={{ paddingBlock: "22px", paddingInline: "1px" }} className='rounded-r-lg w-full bg-zinc-800 outline-none h-10 px-10' type='password' placeholder='********'></input>
                            </div>
                        </div>


                        {isSignup && <input value={formData.confirmPassword} onChange={(e) => setFormData((prev) => { return { ...prev, confirmPassword: e.target.value } })} style={{ paddingBlock: "22px", paddingInline: "15px" }} className='rounded-lg w-full bg-zinc-800 h-10 px-10' type='password' placeholder='Confirm Password'></input>}

                        {error && error !== "" && <div className=' text-sm  text-red-500 -my-2 w-[60%]' style={{ paddingLeft: "5px" }}> * {error}</div>}

                        <div className=' text-right -my-1 text-green-500 font-mono italic cursor-pointer hover:text-green-400 transition-all duration-200 hover:underline'>
                            Forgot Password?
                        </div>

                        <button disabled={loading} style={{ paddingInline: "20px", paddingBlock: "10px", marginTop: "2px" }} className=' flex justify-center items-center text-xl  w-full bg-green-600 rounded-sm  cursor-pointer   text-white transition-all duration-200 hover:opacity-90 text-center '>
                            {loading ? <BeatLoader className=' mx-auto ' /> : <><div>{isSignup ? "Sign up" : "Sign in"} </div>
                            </>}
                        </button>


                    </form>


                </div>



            </div>
        </div >
    )
}

export default AuthPage
