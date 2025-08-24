"use client"

import { GET_AVATARS_URL, Get_User_Details_URL, SignOut_User_URL, UPDATE_AVATAR_URL } from "@repo/config/URL"
import { useRouter } from "next/navigation"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { toast_darktheme } from "../utils/toast-darktheme"
import { useAuth } from "./useAuth"
import { avatarFromApi } from "../utils/mockdata"

type AvatarConextType = {
    avatars: any,
    setAvatars: (value: any) => void,
    avatarLoading: boolean,
    setAvatarLoading: (val: boolean) => void,
    fetchAvatar: () => void,
    updateAvatar: (n: number) => void
}

const AvatarContext = createContext<AvatarConextType | null>(null)

export const AvatarProvider = ({ children }: { children: ReactNode }) => {

    const [avatars, setAvatars] = useState<any>(null);
    const [avatarLoading, setAvatarLoading] = useState(false);
    const router = useRouter()
    const { setUser } = useAuth()

    const fetchAvatar = async () => {
        try {
            setAvatarLoading(true)
            // const res = await fetch(GET_AVATARS_URL, { method: "GET", credentials: "include" })
            // const d = await res.json()
            // if (d.success && Array.isArray(d.data.avatar)) {
            //     setAvatars(d.data.avatar); // `avatar` is string[]
            // }
            // else {
            //     toast.error(d.message, toast_darktheme);
            // }
            setAvatars(avatarFromApi)
        } catch (error) {
            console.log("Error", error);
            toast.error("Something Went Wrong!!!", toast_darktheme)
        }
        finally {
            setAvatarLoading(false)
        }
    }

    const updateAvatar = async (n: number) => {
        try {
            const res = fetch(UPDATE_AVATAR_URL, {
                method: "POST", headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ avatarNumber: (n + '') })
            }).then(async (res) => {
                const d = await res.json()
                if (d.success) {
                    setUser((prev: any) => { return { ...prev, profilePic: n + '' } })
                }
                else {
                    throw new Error(d.message || "Something Went Wrong!!!")
                }
                return d
            })
            const d = await toast.promise(
                res,
                {
                    loading: "Updating Avatar!!!",
                    success: (d: any) => d.message || "User logged out successfully!",
                    error: (err: any) => err.message || "Something went wrong!",
                },
                toast_darktheme
            )

        } catch (error) {
            console.log("Error", error);
            toast.error("Something Went Wrong!!!", toast_darktheme)
        }
    }

    useEffect(() => {
        fetchAvatar()
    }, [])



    return <AvatarContext.Provider value={{ avatars, setAvatars, avatarLoading, setAvatarLoading, fetchAvatar, updateAvatar }}>{children}</AvatarContext.Provider>
}


export const useAvatar = () => {
    const avatarContext = useContext(AvatarContext);

    if (!avatarContext) throw new Error("Please Wrap Component With AvatarProvider");

    return avatarContext
}


