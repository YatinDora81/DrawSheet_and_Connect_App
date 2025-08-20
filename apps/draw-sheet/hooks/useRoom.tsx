"use client"

import { CREATE_NEW_ROOM_URL, GET_ALL_ROOMS_URL, JOIN_NEW_ROOM_URL, UPDATE_ROOM_DETAILS } from "@repo/config/URL"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { toast_darktheme } from "../utils/toast-darktheme"
import { error } from "console"

type RoomConextType = {
    room: any,
    setRoom: (value: any) => void,
    roomLoading: boolean,
    setRoomLoading: (val: boolean) => void,
    originalRooms: any,
    setOriginalRooms: (val: any) => void,
    searchedRoomText: string,
    setSearchedRoomText: (val: string) => void,
    roomOperationLoading: boolean,
    setRoomOperationLoading: (val: boolean) => void,
    fetchRooms: () => void,
    roomOperation: (create: boolean, roomName: string) => Promise<boolean>,
    DrawingTabs: { name: string }[],
    selectedTab: tabs
    setSetlectedTab: (val: tabs) => void,
    updateRoomDetails: (roomId: string, data: { [key: string]: any }) => Promise<void>,
    setUpdateRoomDetailsLoading: (val: boolean) => void,
    updateRoomDetailsLoading: boolean
}

export type tabs = 'All' | 'Favorites' | 'Recent'

const RoomContext = createContext<RoomConextType | null>(null)

export const RoomProvider = ({ children }: { children: ReactNode }) => {

    const [room, setRoom] = useState<any>(null);
    const [originalRooms, setOriginalRooms] = useState<any>(null)
    const [roomLoading, setRoomLoading] = useState(false);
    const [roomOperationLoading, setRoomOperationLoading] = useState(false)
    const [searchedRoomText, setSearchedRoomText] = useState("");
    const DrawingTabs: { name: string }[] = [{ name: "All" }, { name: "Favorites" }, { name: "Recent" }]
    const [selectedTab, setSetlectedTab] = useState<tabs>("All")
    const [updateRoomDetailsLoading, setUpdateRoomDetailsLoading] = useState(false);


    useEffect(() => {
        setRoom(originalRooms)
    }, [originalRooms])

    useEffect(() => {
        setRoom(() => {
            return originalRooms?.filter((r: any) => r?.room?.roomName?.includes(searchedRoomText))
        })
    }, [searchedRoomText])

    useEffect(() => {
        if (selectedTab === 'All') {
            setRoom(originalRooms)
        }
        else if (selectedTab === 'Favorites') {
            setRoom(() => {
                return originalRooms?.filter((r: any) => r?.room?.isFavourite === true)
            })
        }
        else if (selectedTab === 'Recent') {
            setRoom(() => {
                return [...originalRooms].sort((a: any, b: any) => new Date(b?.room?.updatedAt)?.getTime() - new Date(a?.room?.updatedAt)?.getTime());
            })
        }
    }, [selectedTab])

    const fetchRooms = async () => {
        try {
            setRoomLoading(true);
            const res = await fetch(GET_ALL_ROOMS_URL, { method: "GET", credentials: "include" })
            const d = await res.json();
            // console.log(d);
            if (d.success) {
                setOriginalRooms(d.data)
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

    const roomOperation = async (createRoom: boolean, roomName: string): Promise<boolean> => {
        if (!roomName || roomName.trim() === '') {
            toast.error("Please Enter Room name!!!", toast_darktheme)
            return false
        }
        setRoomOperationLoading(true);
        const api = fetch(createRoom ? CREATE_NEW_ROOM_URL : JOIN_NEW_ROOM_URL, { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify(createRoom ? { roomName } : { "roomJoinCode": roomName }) }).then(async (res) => {
            const data = await res.json();
            if (data?.success) {
                setOriginalRooms((prev: any) => [{ "room": data?.data }, ...prev])
                return true
            }
            else {
                toast.error(data?.message || "Something went Wrong!!!", toast_darktheme)
                return false
            }
        }).catch(() => { return false }).finally(() => { setRoomOperationLoading(false) })

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

    const updateRoomDetails = async (roomId: string, data: { [key: string]: any }) => {
        setUpdateRoomDetailsLoading(true);
        const api = fetch(UPDATE_ROOM_DETAILS, { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, roomId }) }).then(async (res) => {
            const data = await res.json();
            if (data?.success) {
                setOriginalRooms((prev: any) => {
                    const newRoomData = prev.map((ele: any) => {
                        if (ele.room.id === roomId) {
                            const e = ele.room
                            return { room: { ...e, isFavourite: e.isFavourite ? false : true } }
                        }
                        else return ele
                    })
                    return newRoomData
                })
            }
            else {
                // toast.error(data?.message || "Something went Wrong!!!", toast_darktheme)
                throw new Error(data?.message || "Something went Wrong!!!")
            }
        }).catch((error) => { toast.error(error?.message || "Something went Wrong!!!", toast_darktheme) }).finally(()=>{
            setUpdateRoomDetailsLoading(false)
        })

        const res = await toast.promise(
            api,
            {
                loading: "Updating your room details...",
                success: "Room details updated successfully",
                error: "Failed to update room details. Please try again!!!",
            },
            toast_darktheme
        )
        return res
    }

    useEffect(() => {
        fetchRooms()
    }, [])



    return <RoomContext.Provider value={{ room, roomLoading, setRoom, setRoomLoading, fetchRooms, roomOperation, roomOperationLoading, setRoomOperationLoading, originalRooms, setOriginalRooms, searchedRoomText, setSearchedRoomText, DrawingTabs, selectedTab, setSetlectedTab, updateRoomDetails , updateRoomDetailsLoading ,setUpdateRoomDetailsLoading }}>{children}</RoomContext.Provider>
}


export const useRoom = () => {
    const roomContext = useContext(RoomContext);

    if (!roomContext) throw new Error("Please Wrap Component With AuthProvider");

    return roomContext
}


