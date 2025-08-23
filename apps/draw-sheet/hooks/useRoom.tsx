"use client"

import { CREATE_NEW_ROOM_URL, GET_ALL_ROOMS_URL, JOIN_NEW_ROOM_URL, UPDATE_ROOM_DETAILS } from "@repo/config/URL"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { toast_darktheme } from "../utils/toast-darktheme"
import { error } from "console"
import { clearLocalStorage, getLocalStorage, setLocalStorage } from "../utils/localStorage"
import { useSocket } from "./useSocket"

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
    updateRoomDetails: (roomId: string, data: { [key: string]: any }) => Promise<any>,
    setUpdateRoomDetailsLoading: (val: boolean) => void,
    updateRoomDetailsLoading: boolean,
    onlineUsers: Map<String, { count: number, members: Set<string> }>,
    setOnlineUsers: (val: Map<String, { count: number, members: Set<string> }>) => void
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
    const [onlineUsers, setOnlineUsers] = useState<Map<String, { count: number, members: Set<string> }>>(new Map<String, { count: number, members: Set<string> }>())
    const { socket, socketLoading } = useSocket()

    useEffect(() => {
        if (originalRooms && !socketLoading && socket && socket.OPEN === 1) {
            originalRooms.map((r : any) => socket.send(JSON.stringify({
                type: "join",
                payload: {
                    roomId: r?.room?.id
                }
            })))
        }
    }, [originalRooms, socket, socketLoading])

    useEffect(() => {
        setRoom(originalRooms)
        if (originalRooms) {
            setLocalStorage("rooms-cache", JSON.stringify(originalRooms));
        }
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

    useEffect(() => {

        function localSocket(ev: any) {


            const obj = JSON.parse(ev.data);

            if (obj.type === "online-users") {

                setOnlineUsers((prev) => {
                    const newMap = new Map<String, { count: number, members: Set<string> }>(prev)
                    const roomId = obj.data.roomId
                    newMap.set(roomId, { count: obj.data.online_count, members: obj.data.users })
                    return newMap
                })

                // {
                //     type: "online-users",
                //     success: true,
                //     data: {
                //         online_count: uniqueUsers.size,
                //         users : uniqueUsers,
                //         roomId,
                //     },
                //     message: "user is online😊"
                // }
            }
            else if (obj.type === "newly-joined") {
    
                // const data = {
                //     id: user.user_id,
                //     name: user.name,
                //     email: user.email,
                //     profilePic: user.profilePic,
                //     roomId : obj.payload.roomId
                // }

                setOriginalRooms((prev : any) => {
                    const newArr = prev.map((p : any) => {
                        if (p.room.id === obj.data.roomId) {
                            const newMem = {
                                user: {
                                    id: obj.data.id,
                                    name: obj.data.name,
                                    email: obj.data.email,
                                    profilePic: obj.data.profilePic,
                                }
                            }
                            p.room.members.push(newMem);
                            return p;
                        }
                        else return p
                    })
                    return newArr
                })

            }
            
        }

            if (socket && socket.OPEN === 1) {
                socket.addEventListener("message", localSocket)
            }

            return () => {
                if (socket) socket.removeEventListener("message", localSocket)
            }

        }, [socket])

    const fetchRooms = async () => {
        try {
            setRoomLoading(true);
            const res = await fetch(GET_ALL_ROOMS_URL, { method: "GET", credentials: "include" })
            const d = await res.json();
            // console.log(d);
            if (d.success) {
                setOriginalRooms(d.data)
                // setLocalStorage("rooms-cache", JSON.stringify(d?.data));
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
            const dataa = await res.json();
            if (dataa?.success) {
                setOriginalRooms((prev: any) => {
                    const newRoomData = prev.map((ele: any) => {
                        if (ele.room.id === roomId) {
                            const e = ele.room
                            const key: string = Object?.keys(data)?.[0]!
                            return { room: { ...e, [key]: dataa?.data?.[key] } }
                        }
                        else return ele
                    })
                    return [...newRoomData]
                })
                return dataa
            }
            else {
                // toast.error(data?.message || "Something went Wrong!!!", toast_darktheme)
                throw new Error(dataa?.message || "Something went Wrong!!!")
            }
        }).catch((error) => { toast.error(error?.message || "Something went Wrong!!!", toast_darktheme) }).finally(() => {
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
        // const getCacheRooms = getLocalStorage("rooms-cache")
        // if (!getCacheRooms || getCacheRooms.trim().length === 0 || getCacheRooms === null || getCacheRooms === 'null') fetchRooms()
        // else setOriginalRooms(JSON.parse(getCacheRooms))

        // return ()=>{
        //     clearLocalStorage('rooms-cache')
        // }
        fetchRooms()
    }, [])



    return <RoomContext.Provider value={{ room, roomLoading, setRoom, setRoomLoading, fetchRooms, roomOperation, roomOperationLoading, setRoomOperationLoading, originalRooms, setOriginalRooms, searchedRoomText, setSearchedRoomText, DrawingTabs, selectedTab, setSetlectedTab, updateRoomDetails, updateRoomDetailsLoading, setUpdateRoomDetailsLoading , onlineUsers ,setOnlineUsers }}>{children}</RoomContext.Provider>
}


export const useRoom = () => {
    const roomContext = useContext(RoomContext);

    if (!roomContext) throw new Error("Please Wrap Component With AuthProvider");

    return roomContext
}


