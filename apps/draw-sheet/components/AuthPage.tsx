"use client"
import { SignIn_User_URL, SignUp_User_URL } from '@repo/config/URL';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { PiPencilSimpleLineLight } from 'react-icons/pi'
import { BarLoader } from 'react-spinners';
import { toast_darktheme } from '../utils/toast-darktheme';

function AuthPage({ isSignIn }: { isSignIn: boolean }) {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPassword2, setShowPassword2] = useState<boolean>(false);
    const [formData, setFormDate] = useState<{ username: string, email: string, password: string, confirmPassword: string }>({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter();

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault()
        setError("")
        if (formData.email.trim() === '' || formData.password === '' || (!isSignIn && formData.confirmPassword.trim() === '') || (!isSignIn && formData.username.trim() === '')) {
            setError("Please Fill All The Details")
            toast.error("Please Fill All The Details", toast_darktheme)
            return
        }
        if (!isSignIn && formData.password !== formData.confirmPassword) {
            setError("Password isn't matching!!!")
            toast.error("Password isn't matching!!!", toast_darktheme)
            return
        }

        try {
            setLoading(true)
            let data: any = {
                email: formData.email,
                password: formData.password,
                isDraw: true
            }
            if (!isSignIn) {
                data.name = formData.username
            }
            const res = await fetch(isSignIn ? SignIn_User_URL : SignUp_User_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(data)
            })
            const d = await res.json()
            console.log(d);
            if(d.success){
                toast.success(d.message,toast_darktheme)
                router.push('/sheets')
            }
            else{
                console.log(d);
                setError(d.message)
                toast.error(d.message , toast_darktheme)
            }
            
        } catch (error : any) {
            setError(error.message || "Something Went Wrong")
            toast.error(error.message || "SomeThing Went Wrong" , toast_darktheme)
        }
        finally {
            setLoading(false);
        }


    }

    return (
        <div className=' h-[100vh] text-white bg-zinc-950 flex justify-center items-center'>

            <div className='min-h-[32rem] w-[30rem] flex flex-col ' >

                <div className=" h-[4rem] flex text-2xl font-semibold  gap-2 justify-center items-center ">
                    <PiPencilSimpleLineLight onClick={() => { router.push("/") }} className=" cursor-pointer text-blue-500 text-3xl" />
                    <div className=' cursor-pointer' onClick={() => { router.push("/") }}>Drawsheet</div>
                </div>

                <div className=' min-h-[28rem] w-full flex justify-center items-center'>
                    <div className=' min-h-[24rem] w-[95%] border-[0.1px] rounded-lg border-zinc-800/70 text-white flex flex-col  gap-5 items-start' style={{ paddingBlock: "1.1rem", paddingInline: "1.4rem" }}>

                        <div className=' min-h-[2rem] w-full flex flex-col justify-center gap-1'>
                            <div className=' text-xl font-semibold'>{isSignIn ? "Log in to your account" : "Create an account"}</div>
                            <div className=' text-sm text-zinc-500'>{isSignIn ? "Enter your email below to log in to your account" : "Enter your information below to create your account"}</div>
                        </div>

                        <form onSubmit={submitHandler} className=' min-h-[19.5rem] w-full flex flex-col gap-5'>
                            {
                                !isSignIn && <div className=' flex flex-col justify-center items-start gap-2'>
                                    <label htmlFor='draw-name' className=' text-[0.95rem] font-semibold'>name</label>
                                    <input value={formData.username} onChange={(e) => setFormDate((prev) => { return { ...prev, username: e.target.value } })} id='draw-name' type='text' className=' border border-zinc-800/70 w-full text-[0.91rem] font-normal  rounded-lg inpbg' style={{ paddingInline: "0.9rem", paddingBlock: "0.5rem" }} placeholder='Jhon doe' />
                                </div>
                            }
                            <div className=' flex flex-col justify-center items-start gap-2'>
                                <label htmlFor='draw-email' className=' text-[0.95rem] font-semibold'>Email</label>
                                <input value={formData.email} onChange={(e) => setFormDate((prev) => { return { ...prev, email: e.target.value } })} id='draw-email' type='email' className=' border border-zinc-800/70 w-full text-[0.91rem] font-normal  rounded-lg inpbg' style={{ paddingInline: "0.9rem", paddingBlock: "0.5rem" }} placeholder='name@example.com' />
                            </div>
                            <div className=' flex flex-col justify-center items-start gap-2'>
                                <div className=' w-full flex justify-between items-center'>
                                    <label htmlFor='draw-pass' className=' text-[0.95rem] font-semibold'>Password</label>
                                    {isSignIn && <div onClick={()=>{router.push('/forgot-password')}} className=' text-[0.85rem]  text-blue-500 hover:underline transition-all duration-200 cursor-pointer'>Forgot password?</div>}
                                </div>
                                <div className=' w-full relative'>
                                    <input value={formData.password} onChange={(e) => setFormDate((prev) => { return { ...prev, password: e.target.value } })} id='draw-pass' type={showPassword ? "text" : "password"} className=' border border-zinc-800/70 w-full text-[0.91rem] font-normal  rounded-lg' style={{ paddingInline: "0.9rem", paddingRight: "2.2rem", paddingBlock: "0.5rem" }} placeholder="**************" />
                                    {!showPassword ? <FaEye className=' absolute right-[0.8rem] cursor-pointer top-[0.7rem]' onClick={() => setShowPassword(true)} /> : <FaEyeSlash className=' absolute right-[0.8rem] cursor-pointer top-[0.7rem]  inpbg' onClick={() => setShowPassword(false)} />}
                                </div>
                            </div>
                            {
                                !isSignIn && <div className=' flex flex-col justify-center items-start gap-2'>
                                    <div className=' w-full flex justify-between items-center'>
                                        <label htmlFor='draw-conf-pass' className=' text-[0.95rem] font-semibold'>Confirm Password</label>
                                    </div>
                                    <div className=' w-full relative'>
                                        <input value={formData.confirmPassword} onChange={(e) => setFormDate((prev) => { return { ...prev, confirmPassword: e.target.value } })} id='draw-conf-pass' type={showPassword2 ? "text" : "password"} className=' border border-zinc-800/70 w-full text-[0.91rem] font-normal  rounded-lg' style={{ paddingInline: "0.9rem", paddingRight: "2.2rem", paddingBlock: "0.5rem" }} placeholder="**************" />
                                        {!showPassword2 ? <FaEye className=' absolute right-[0.8rem] cursor-pointer top-[0.7rem]' onClick={() => setShowPassword2(true)} /> : <FaEyeSlash className=' absolute right-[0.8rem] cursor-pointer top-[0.7rem] inpbg' onClick={() => setShowPassword2(false)} />}
                                    </div>
                                </div>
                            }

                            {error && error.trim().length !== 0 && <div className=' text-[0.75rem] text-red-500' style={{ marginBlock: "-0.9rem" }}>* {error}</div>}
                            <button
                                disabled={loading}
                                onClick={submitHandler}
                                className=' h-[2.45rem] cursor-pointer border border-zinc-800/70 flex justify-center items-center w-full text-[0.91rem] rounded-lg bg-blue-500 font-bold' style={{ paddingInline: "0.9rem", paddingBlock: "0.5rem" }} >{loading ? <BarLoader color='white' /> : (isSignIn ? 'Log in' : 'Sign up')}</button>


                            <div className=' flex flex-col items-center justify-center gap-2' style={{ marginTop: "0.6rem" }}>
                                <div className=' text-[0.9rem] text-zinc-500'>{isSignIn ? "Don't have an account?" : "Already have an account?"} <span className=' text-blue-500 cursor-pointer' onClick={() => { router.push(isSignIn ? "/signup" : "/signin") }}>{isSignIn ? "Sign up" : "Log in"}</span></div>
                                <div className=' text-[0.75rem] text-zinc-500'>By continuing, you agree to our Terms of Service and Privacy Policy.</div>
                            </div>


                        </form>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default AuthPage