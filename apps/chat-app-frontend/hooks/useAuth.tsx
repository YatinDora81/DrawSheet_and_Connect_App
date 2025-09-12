"use client"

import { Get_User_Details_URL, SignOut_User_URL } from "@repo/config/URL"
import { authenticatedFetch } from "@repo/ui/tokenManager"
import { useRouter } from "next/navigation"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"

type AuthConextType = {
    user: any,
    setUser: (value: any) => void,
    userLoading: boolean,
    setUserLoading: (val: boolean) => void,
    fetchUser: () => void,
    logoutUser: () => void,

}

const AuthContext = createContext<AuthConextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<any>(null);
    const [userLoading, setUserLoading] = useState(false);
    const router = useRouter()

    const fetchUser = async () => {
        try {
            setUserLoading(true)
            const res = await authenticatedFetch(Get_User_Details_URL, { method: "GET", credentials: "include" })
            const d = await res.json()
            if (d.success) {
                setUser(d.data);
            }
            else {
                toast.error(d.message);
            }
        } catch (error) {
            console.log("Error", error);
            toast.error("Something Went Wrong!!!")

        }
        finally {
            setUserLoading(false)
        }
    }

    const logoutUser = async () => {
        try {
            setUserLoading(true)
            const res = await fetch('/api/signout', { method: "GET", credentials: "include" })
            // const res = await authenticatedFetch(SignOut_User_URL , { method: "GET", credentials: "include" })

            const d = await res.json()
            setUser(d.data);
            toast.success("User LogOut Succeccfully")
            router.push("/signin")
            // if (d.success) {
            // }
            // else {
            //     toast.error(d.message);
            // }
        } catch (error) {
            console.log("Error", error);
            toast.error("Something Went Wrong!!!")

        }
        finally {
            setUserLoading(false)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])



    return <AuthContext.Provider value={{ user, setUser, userLoading, setUserLoading, fetchUser, logoutUser }}>{children}</AuthContext.Provider>
}


export const useAuth = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) throw new Error("Please Wrap Component With AuthProvider");

    return authContext
}


