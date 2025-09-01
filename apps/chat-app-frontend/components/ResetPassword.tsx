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
      setError("Password and Confirm Password should be at least 6 characters")
      toast.error("Password and Confirm Password should be at least 6 characters", toast_darktheme)
      return
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Password and Confirm Password do not match!")
      toast.error("Password and Confirm Password do not match!", toast_darktheme)
      return
    }

    setError('')
    setLoading(true);
    const body = {
      otp_id: otpId,
      password: formData.newPassword,
      email,
      isDraw: false
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
      } else {
        setError(d?.message || 'Something went wrong!')
        toast.error(d?.message || 'Something went wrong!', toast_darktheme)
      }
    } catch (error: any) {
      setError(error?.message || 'Something went wrong!')
      toast.error(error?.message || 'Something went wrong!', toast_darktheme)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full flex flex-col gap-6" style={{gap : "1.5rem"}}>

      {/* New Password */}
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="draw-new-pass" className="text-sm font-semibold text-zinc-200">
          New Password
        </label>
        <div className="relative w-full">
          <input
            id="draw-new-pass"
            type={showPassword ? "text" : "password"}
            value={formData.newPassword}
            onChange={(e) => setFormDate((prev) => ({ ...prev, newPassword: e.target.value }))}
            onKeyDown={(e) => { if (e.key === 'Enter') submitHandler() }}
            className="w-full rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-white px-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Enter new password"
          />
          {!showPassword ? (
            <FaEye
              className="absolute right-3 top-3 cursor-pointer text-zinc-400 hover:text-white"
              style={{right : '0.6rem' , top : "0.7rem"}}
              onClick={() => setShowPassword(true)}
            />
          ) : (
            <FaEyeSlash
              className="absolute right-3 top-3 cursor-pointer text-zinc-400 hover:text-white"
              onClick={() => setShowPassword(false)}
              style={{right : '0.6rem' , top : "0.7rem"}}
            />
          )}
        </div>
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="draw-conf-pass" className="text-sm font-semibold text-zinc-200">
          Confirm Password
        </label>
        <div className="relative w-full">
          <input
            id="draw-conf-pass"
            type={showPassword2 ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) => setFormDate((prev) => ({ ...prev, confirmPassword: e.target.value }))}
            onKeyDown={(e) => { if (e.key === 'Enter') submitHandler() }}
            className="w-full rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-white px-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Confirm new password"
          />
          {!showPassword2 ? (
            <FaEye
              className="absolute right-3 top-3 cursor-pointer text-zinc-400 hover:text-white"
              onClick={() => setShowPassword2(true)}
              style={{right : '0.6rem' , top : "0.7rem"}}
            />
          ) : (
            <FaEyeSlash
              className="absolute right-3 top-3 cursor-pointer text-zinc-400 hover:text-white"
              onClick={() => setShowPassword2(false)}
              style={{right : '0.6rem' , top : "0.7rem"}}
            />
          )}
        </div>
      </div>

      {/* Error */}
      {error && error.length !== 0 && (
        <div className="text-sm text-red-500">* {error}</div>
      )}

      {/* Actions */}
      <div className="flex flex-col w-full gap-4">
        <button
          disabled={loading}
          onClick={submitHandler}
          className="h-[2.6rem] rounded-lg bg-green-600 hover:opacity-90 transition-all flex justify-center items-center text-sm font-semibold text-white"
          style={{height : '2.6rem'}}
        >
          {loading ? <BarLoader color="white" /> : 'Reset Password'}
        </button>

        <div
          onClick={() => router.push('/signin')}
          className="cursor-pointer flex gap-1 justify-center items-center text-sm text-zinc-500 hover:text-zinc-400 transition-all"
        >
          <GoArrowLeft /> Back to login
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
