import { CHANGE_PASS_URL } from '@repo/config/URL'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { GoArrowLeft } from 'react-icons/go'
import { BarLoader } from 'react-spinners'
import { toast_darktheme } from '../utils/toast-darktheme'

function ResetPassword({ otpId, email }: { otpId: string | null, email: string }) {
    const [formData, setFormDate] = useState<{
        newPassword: string,
        confirmPassword: string
    }>({
        newPassword: '',
        confirmPassword: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const submitHandler = async () => {

        if (loading) return
        if (formData.newPassword.trim().length < 6 || formData.confirmPassword.trim().length < 6) {
            setError("Password and Confirm Password Should be atleast 6 characters")
            toast.error("Password and Confirm Password Should be atleast 6 characters", toast_darktheme)
            return
        }
        if (formData.newPassword !== formData.confirmPassword) {
            setError("Password And Confirm Password is not matching!!!")
            toast.error("Password And Confirm Password is not matching!!!", toast_darktheme)
            return
        }

        setError('')
        setLoading(true);
        const body = {
            otp_id: otpId,
            password: formData.newPassword,
            email,
            isDraw: true
        }
        try {
            const res = await fetch(CHANGE_PASS_URL, {
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
                router.push('/signin')
            }
            else {
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

    return (
        <div className=' w-full flex flex-col justify-center items-start gap-5 '>

            <div className=' flex flex-col justify-center items-start gap-2 w-full'>
                <div className=' w-full flex justify-between items-center'>
                    <label htmlFor='draw-new-pass' className=' text-[0.85rem] font-semibold'>New Password</label>
                </div>
                <div className=' w-full relative'>
                    <input
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') submitHandler()
                        }}
                        value={formData.newPassword}
                        onChange={(e) => setFormDate((prev) => { return { ...prev, newPassword: e.target.value } })} id='draw-new-pass' type={showPassword ? "text" : "password"} className=' border border-zinc-800/70 w-full text-[0.81rem] font-normal  rounded-lg' style={{ paddingInline: "0.9rem", paddingRight: "2.2rem", paddingBlock: "0.5rem" }} placeholder="Enter new password" />
                    {!showPassword ? <FaEye className=' absolute right-[0.8rem] cursor-pointer top-[0.7rem]' onClick={() => setShowPassword(true)} /> : <FaEyeSlash className=' absolute right-[0.8rem] cursor-pointer top-[0.7rem] inpbg' onClick={() => setShowPassword(false)} />}
                </div>
            </div>


            <div className=' flex flex-col justify-center items-start gap-2 w-full'>
                <div className=' w-full flex justify-between items-center'>
                    <label htmlFor='draw-conf-pass' className=' text-[0.85rem] font-semibold'>Confirm Password</label>
                </div>
                <div className=' w-full relative'>
                    <input
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') submitHandler()
                        }}
                        value={formData.confirmPassword}
                        onChange={(e) => setFormDate((prev) => { return { ...prev, confirmPassword: e.target.value } })}
                        id='draw-conf-pass' type={showPassword2 ? "text" : "password"} className=' border border-zinc-800/70 w-full text-[0.81rem] font-normal  rounded-lg' style={{ paddingInline: "0.9rem", paddingRight: "2.2rem", paddingBlock: "0.5rem" }} placeholder="Confirm new password" />
                    {!showPassword2 ? <FaEye className=' absolute right-[0.8rem] cursor-pointer top-[0.7rem]' onClick={() => setShowPassword2(true)} /> : <FaEyeSlash className=' absolute right-[0.8rem] cursor-pointer top-[0.7rem] inpbg' onClick={() => setShowPassword2(false)} />}
                </div>
            </div>

            {error && error.length !== 0 && <div className=' text-[0.8rem] text-red-500' style={{ marginBlock: '-0.7rem' }}>* {error}</div>}

            <div className=" flex flex-col w-full gap-4">
                <button
                    // disabled={loading}
                    onClick={() => { submitHandler() }}
                    className=' h-[2.45rem] cursor-pointer border border-zinc-800/70 flex justify-center items-center w-full text-[0.91rem] rounded-lg bg-blue-500 font-bold' style={{ paddingInline: "0.9rem", paddingBlock: "0.5rem" }} >{loading ? <BarLoader color='white' /> : 'Reset Password'}</button>

                <div
                    onClick={() => {
                        router.push('/signin')
                    }}
                    className='  cursor-pointer gap-1 flex justify-center items-center w-full text-[0.91rem] font-semibol d text-zinc-500 hover:text-zinc-400 transition-all duration-150'  > <GoArrowLeft /> Back to login </div>

            </div>

        </div>
    )
}

export default ResetPassword