"use client"

import { Get_User_Details_URL, SignOut_User_URL } from "@repo/config/URL"
import { useRouter } from "next/navigation"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"

type AuthConextType = {
    user : any,
    setUser : (value : any)=> void,
    userLoading : boolean,
    setUserLoading : (val:boolean)=> void,
    fetchUser : ()=>void,
    
}

const AuthContext = createContext<AuthConextType | null>(null)

export const AuthProvider = ({children} : {children : ReactNode})=>{

    const [user ,setUser  ] = useState<any>(null);
    const [userLoading , setUserLoading] = useState(false);
    const router = useRouter()

    const fetchUser = async ()=>{
        try {
            setUserLoading(true)
            const res = await fetch(Get_User_Details_URL , { method: "GET", credentials: "include" })
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

    useEffect(()=>{
        fetchUser()
    } , [])

    

    return <AuthContext.Provider value={{user,setUser,userLoading,setUserLoading,fetchUser}}>{children}</AuthContext.Provider>
}


export const useAuth = ()=>{
    const authContext = useContext(AuthContext);

    if(!authContext) throw new Error("Please Wrap Component With AuthProvider");

    return authContext
}


