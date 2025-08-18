"use client"

import { GET_ALL_ROOMS_URL } from "@repo/config/URL"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"

type RoomConextType = {
    room: any,
    setRoom: (value: any) => void,
    roomLoading: boolean,
    setRoomLoading: (val: boolean) => void,
    fetchRooms: () => void,

}

const RoomContext = createContext<RoomConextType | null>(null)

export const RoomProvider = ({ children }: { children: ReactNode }) => {

    const [room, setRoom] = useState<any>(null);
    const [roomLoading, setRoomLoading] = useState(false);

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

    useEffect(() => {
        fetchRooms()
    }, [])



    return <RoomContext.Provider value={{ room, roomLoading, setRoom, setRoomLoading, fetchRooms }}>{children}</RoomContext.Provider>
}


export const useRoom = () => {
    const roomContext = useContext(RoomContext);

    if (!roomContext) throw new Error("Please Wrap Component With AuthProvider");

    return roomContext
}


