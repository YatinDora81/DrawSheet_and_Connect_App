"use client"

import { CREATE_NEW_ROOM_URL, GET_ALL_ROOMS_URL, JOIN_NEW_ROOM_URL } from "@repo/config/URL"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { toast_darktheme } from "../utils/toast-darktheme"

type RoomConextType = {
    room: any,
    setRoom: (value: any) => void,
    roomLoading: boolean,
    setRoomLoading: (val: boolean) => void,
    roomOperationLoading: boolean,
    setRoomOperationLoading: (val: boolean) => void,
    fetchRooms: () => void,
    roomOperation: (create : boolean , roomName: string) => Promise<boolean>
}

const RoomContext = createContext<RoomConextType | null>(null)

export const RoomProvider = ({ children }: { children: ReactNode }) => {

    const [room, setRoom] = useState<any>(null);
    const [roomLoading, setRoomLoading] = useState(false);
    const [roomOperationLoading , setRoomOperationLoading] = useState(false)

    const fetchRooms = async () => {
        try {
            setRoomLoading(true);
            const res = await fetch(GET_ALL_ROOMS_URL, { method: "GET", credentials: "include" })
            const d = await res.json();
            // console.log(d);
            if (d.success) {
                setRoom(d.data)
            }
            else {
                toast.error("Error at Fetching Rooms ")
                console.log(d);
            }
        } catch (error) {
            console.log("Error", error);
            toast.error("Something Went Wrong!!!")

        }
        finally {
            setRoomLoading(false)
        }
    }

    const roomOperation = async ( createRoom : boolean , roomName: string) : Promise<boolean> => {
        if (!roomName || roomName.trim() === '') {
            toast.error("Please Enter Room name!!!", toast_darktheme)
            return false
        }
        setRoomOperationLoading(true);
        const api = fetch(createRoom ?  CREATE_NEW_ROOM_URL : JOIN_NEW_ROOM_URL, { method : "POST" , headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify( createRoom ? { roomName } : {"roomJoinCode" : roomName} ) }).then(async (res) => {
            const data = await res.json();
            if(data?.success){
                setRoom((prev : any) => [{ "room": data?.data }, ...prev])
                return true
            }
            else{
                toast.error(data?.message || "Something went Wrong!!!" , toast_darktheme)
                return false
            }
        }).catch(()=>{return false}).finally(()=>{setRoomOperationLoading(false)})

        const res = await toast.promise(
            api,
            {
                loading: `${createRoom ? 'Creating' : 'Joining'} your room...`,
                success: `Room ${createRoom ? 'created' : 'joined'} successfully`,
                error: `Failed to ${createRoom ? 'create' : 'join'} room. Please try again!!!`,
            },
            toast_darktheme
        )
        return res
    }

    useEffect(() => {
        fetchRooms()
    }, [])



    return <RoomContext.Provider value={{ room, roomLoading, setRoom, setRoomLoading, fetchRooms, roomOperation  , roomOperationLoading , setRoomOperationLoading}}>{children}</RoomContext.Provider>
}


export const useRoom = () => {
    const roomContext = useContext(RoomContext);

    if (!roomContext) throw new Error("Please Wrap Component With AuthProvider");

    return roomContext
}


