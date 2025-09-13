"use client"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"
import { GoArrowLeft, GoArrowRight } from "react-icons/go"
import { MdDone } from "react-icons/md"
import { IoChatbubbleOutline } from "react-icons/io5"
import { BarLoader } from "react-spinners"
import VerifyOtp from "./VerifyOtp"
import ResetPassword from "./ResetPassword"
import toast from "react-hot-toast"
import { toast_darktheme } from "../utils/toast-darktheme"
import { FORGOT_PASS_URL, VERIFY_OTP_URL } from "@repo/config/URL"

const ForgotPassword = ()=>{
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [verifyOtpLoading, setVerifyOtpLoading] = useState(false)
    const [otpId, setOtpId] = useState<string | null>(null)

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault()
        setError('')
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Invalid Email!!!')
            toast.error('Invalid Email!!!', toast_darktheme)
            return
        }
        await sendOtp()
    }

    const sendOtp = async (page?: number) => {
        setLoading(true);
        const body = {
            email,
            isDraw: false
        }
        try {
            const res = await fetch(FORGOT_PASS_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(body)
            })
            const d = await res.json()
            if (d?.success) {
                toast.success(d?.message, toast_darktheme)
                if (!page) setPage(1)
            } else {
                setError(d?.message || 'Something Went Wrong!!!')
                toast.error(d?.message || 'Something Went Wrong!!!', toast_darktheme)
            }
        } catch (error: any) {
            setError(error?.message || 'Something Went Wrong!!!')
            toast.error(error?.message || 'Something Went Wrong!!!', toast_darktheme)
        } finally {
            setLoading(false)
        }
    }

    const verifyOtp = async (otp: string) => {
        setError('')
        setVerifyOtpLoading(true)
        try {
            const body = {
                otp,
                email,
                isDraw: false
            }
            const res = await fetch(VERIFY_OTP_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(body)
            })
            const d = await res.json()
            if (d?.success) {
                setOtpId(d?.data?.otp_id)
                setPage(3)
                toast.success(d?.message, toast_darktheme)
            } else {
                setError(d?.message || 'Something Went Wrong!!!')
                toast.error(d?.message || 'Something Went Wrong!!!', toast_darktheme)
            }
        } catch (error: any) {
            setError(error?.message || 'Something Went Wrong!!!')
            toast.error(error?.message || 'Something Went Wrong!!!', toast_darktheme)
        } finally {
            setVerifyOtpLoading(false)
        }
    }

    useEffect(() => {
        setError('')
    }, [page])

    return (
        <div className='min-h-[90vh] overflow-hidden sm:w-full text-white bg-zinc-950 flex justify-center items-center'>
            <div className='min-h-[20rem]  min-w-[30rem] w-[30rem] flex flex-col'>
                <div className="h-[4rem] flex text-2xl font-semibold gap-2 justify-center items-center">
                    <IoChatbubbleOutline
                        onClick={() => { router.push("/") }}
                        className="cursor-pointer text-green-500 text-3xl"
                    />
                    <div
                        className='cursor-pointer'
                        onClick={() => { router.push("/") }}
                    >
                        Connect
                    </div>
                </div>

                <div className=' w-[85%] mx-auto sm:w-full flex  justify-center items-center'>
                    <div
                        className='min-h-[16rem] bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 shadow-xl rounded-xl  w-[95%]  text-white flex flex-col gap-5 items-start'
                        style={{ paddingBlock: "1.1rem", paddingInline: "1.4rem" }}
                    >
                        <div className='w-full flex flex-col justify-center gap-1'>
                            <div
                                className={`text-xl font-semibold ${page === 2 && 'text-center w-full flex justify-center items-center'} `}
                                style={{ paddingBottom: page === 2 ? '0.3rem' : '0' }}
                            >
                                Reset password
                            </div>
                            <div className={`text-sm text-zinc-500 ${page === 2 && 'text-center w-full flex justify-center items-center '}`}>
                                {page === 0 && `Enter your email and we'll send you a reset link`}
                                {page === 1 && `Check your email for the password reset link`}
                                {page === 2 && (
                                    <div className={`w-[60%] text-center`}>
                                        We've sent a verification code to <span className="text-zinc-200 font-bold">{email}</span>
                                    </div>
                                )}
                                {page === 3 && 'Set your new password'}
                            </div>
                        </div>

                        {page === 0 && (
                            <form onSubmit={submitHandler} className='w-full flex flex-col gap-5'>
                                <div className='flex flex-col justify-center items-start gap-2'>
                                    <label htmlFor='draw-email' className='text-[0.95rem] font-semibold'>Email</label>
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        id='draw-email'
                                        type='email'
                                        className='border border-zinc-800/70 w-full text-[0.91rem] font-normal rounded-lg inpbg'
                                        style={{ paddingInline: "0.9rem", paddingBlock: "0.5rem" }}
                                        placeholder='name@example.com'
                                    />
                                </div>

                                {error && error.trim().length !== 0 && (
                                    <div className='text-[0.75rem] text-red-500' style={{ marginBlock: "-0.9rem" }}>
                                        * {error}
                                    </div>
                                )}

                                <div className="flex flex-col w-full gap-4">
                                    <button
                                        disabled={loading}
                                        onClick={submitHandler}
                                        className='h-[2.45rem] cursor-pointer border border-zinc-800/70 flex justify-center items-center w-full text-[0.91rem] rounded-lg bg-green-500 font-bold'
                                        style={{ paddingInline: "0.9rem", paddingBlock: "0.5rem" }}
                                    >
                                        {loading ? <BarLoader color='white' /> : 'Send reset link'}
                                    </button>

                                    <div
                                        onClick={() => {
                                            router.push('/signin')
                                        }}
                                        className='cursor-pointer gap-1 flex justify-center items-center w-full text-[0.91rem] font-semibol d text-zinc-500 hover:text-zinc-400 transition-all duration-150'
                                    >
                                        <GoArrowLeft /> Back to login
                                    </div>
                                </div>
                            </form>
                        )}

                        {page === 1 && (
                            <div className='w-full flex flex-col justify-center items-center gap-5' style={{ paddingTop: "1.5rem" }}>
                                <div className="bg-green-600/10 rounded-full" style={{ padding: "0.5rem", backgroundColor: 'oklch(62.7% 0.194 149.214)' }}>
                                    <MdDone className="text-green-00 text-3xl" />
                                </div>

                                <div className="w-[60%] text-center">
                                    We've sent a verification code to <span className="font-bold">{email}</span>
                                </div>
                                <div
                                    onClick={() => setPage(2)}
                                    className="flex justify-center items-center gap-1 text-green-500 font-semibold hover:underline cursor-pointer"
                                >
                                    Enter verification code <GoArrowRight />
                                </div>

                                <div
                                    onClick={() => {
                                        router.push('/signin')
                                    }}
                                    style={{ paddingTop: "1.3rem", paddingBottom: "0.5rem" }}
                                    className='cursor-pointer gap-1 flex justify-center items-center w-full text-[0.91rem] font-semibol d text-zinc-500 hover:text-zinc-400 transition-all duration-150'
                                >
                                    <GoArrowLeft /> Back to login
                                </div>
                            </div>
                        )}

                        {page === 2 && (
                            <VerifyOtp
                                setError={setError}
                                email={email}
                                setPage={setPage}
                                error={error}
                                loading={loading}
                                resendOtp={sendOtp}
                                verifyOtp={verifyOtp}
                                verifyOtpLoading={verifyOtpLoading}
                                setVerifyOtpLoading={setVerifyOtpLoading}
                            />
                        )}

                        {page === 3 && <ResetPassword otpId={otpId} email={email} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword