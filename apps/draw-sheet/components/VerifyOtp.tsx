"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { GoArrowLeft } from 'react-icons/go';
import { HiOutlineRefresh } from 'react-icons/hi'
import { toast_darktheme } from '../utils/toast-darktheme';
import { BarLoader } from 'react-spinners';

function VerifyOtp({ email, setPage, error, resendOtp, verifyOtp, loading, setError, verifyOtpLoading, setVerifyOtpLoading }: { email: string, setPage: (n: number) => void, error: string, resendOtp: () => void, verifyOtp: (s: string) => void, loading: boolean, setError: (s: string) => void, verifyOtpLoading: boolean, setVerifyOtpLoading: (s: boolean) => void }) {
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(''))
    const otpRef = useRef<(HTMLInputElement | null)[]>([])
    const [otpIndex, setOptIndex] = useState(0);
    const router = useRouter()
    const [isAbleToSubmit, setIsAbleToSubmit] = useState(false)
    useEffect(() => {
        if (otpIndex < otp.length) otpRef.current[otpIndex]?.focus()
    }, [otpIndex])

    useEffect(() => {
        const s = otp?.map((o: string) => o.trim()).join('')
        if (s.length === otp.length) {
            setIsAbleToSubmit(true)
        }
        else setIsAbleToSubmit(false)
    }, [otp])

    return (
        <div className='  w-full flex flex-col justify-center items-center gap-5 ' style={{ paddingTop: "1rem" }}>

            <div>
                Enter verification code
            </div>


            <div className=' flex '>
                {
                    otp.map((_o: string, i: number) => {
                        return (
                            <div key={i}>
                                <input
                                    ref={(el) => { otpRef.current[i] = el }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Backspace') {
                                            if (e.key === 'Backspace') {
                                                if (!otp[i] && i > 0) {
                                                    setOptIndex(i - 1)
                                                } else {
                                                    setOtp((prev) => {
                                                        const newArr = [...prev]
                                                        newArr[i] = ''
                                                        return newArr
                                                    })
                                                }
                                            }
                                        }
                                        else if (e.key === 'Enter') {
                                            if (!verifyOtpLoading) {
                                                if (isAbleToSubmit) {
                                                    console.log("opt done")
                                                    const s = otp?.map((o: string) => o.trim()).join('')
                                                    verifyOtp(s)
                                                }
                                                else {
                                                    setError('Otp Should Be Atleast 6 Characters')
                                                    toast.error('Otp Should Be Atleast 6 Characters', toast_darktheme)
                                                }
                                            }

                                        }
                                    }}
                                    className={` text-center font-semibold border-t border-b ${i !== otp.length - 1 && 'border-l'} ${i !== 0 && 'border-r'} border-zinc-800/90 w-[2.5rem] aspect-square flex justify-center items-center ${i === 0 && ' rounded-l-xl'} ${i === otp.length - 1 && ' rounded-r-xl'} `} type='text'
                                    value={otp[i]}

                                    onChange={(e) => {
                                        setOtp((prev) => {
                                            const newArr = [...prev]
                                            const ch = e.target.value.charAt(e.target.value.length - 1)
                                            newArr[i] = ch
                                            if (ch && i < otp.length - 1) {
                                                setOptIndex(i + 1)
                                            }
                                            return newArr
                                        })
                                    }} />
                            </div>
                        )
                    })
                }
            </div>

            {error && error.trim().length !== 0 && <div className=' text-[0.75rem] text-red-500' style={{ marginBlock: "-0.9rem" }}>* {error}</div>}

            <div className=' w-[70%] text-center text-[0.8rem] text-zinc-500'>
                Enter the 6-digit verification code sent to <span className=''>{email}</span>
            </div>

            <div className=' w-full gap-3 text-center text-[0.8rem] text-zinc-500 flex flex-col justify-center items-center'>
                <div className=' text-center'>Didn't receive the code?</div>

                <button
                    disabled={loading}
                    onClick={resendOtp}
                    className=' h-[2.45rem] cursor-pointer border border-zinc-800/70 flex justify-center items-center w-full text-[0.91rem] rounded-lg text-zinc-200 gap-1 font-semibold' style={{ paddingInline: "0.9rem", paddingBlock: "0.5rem" }} > { loading ? <BarLoader color='white' /> : <div className=' flex justify-center items-center gap-1'><HiOutlineRefresh /> Resend code</div>} </button>

            </div>

            <button
                disabled={verifyOtpLoading}
                onClick={() => {
                    if (!verifyOtpLoading) {
                        if (isAbleToSubmit) {
                            console.log("opt done")
                            const s = otp?.map((o: string) => o.trim()).join('')
                            verifyOtp(s)
                        }
                        else {
                            setError('Otp Should Be Atleast 6 Characters')
                            toast.error('Otp Should Be Atleast 6 Characters', toast_darktheme)
                        }
                    }
                }
                }
                className=' h-[2.45rem] cursor-pointer border border-zinc-800/70 flex justify-center items-center w-full text-[0.91rem] rounded-lg bg-blue-500 font-semibold' style={{ paddingInline: "0.9rem", paddingBlock: "0.5rem" }}>{verifyOtpLoading ? <BarLoader color='white' /> : 'Verify code'}</button>



            <div
                onClick={() => {
                    setPage(0)
                }}
                className='  cursor-pointer gap-1 flex justify-center items-center w-full text-[0.8rem] font-semibol d text-zinc-500 hover:text-zinc-400 transition-all duration-150' style={{ paddingTop: "1rem" }}  > <GoArrowLeft /> Back to forgot password </div>


        </div>
    )
}

export default VerifyOtp