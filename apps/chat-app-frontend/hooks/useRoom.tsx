"use client"

import { GET_ALL_ROOMS_URL } from '@repo/config/URL';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useSocket } from './useSocket';
import { authenticatedFetch } from '@repo/ui/tokenManager';

export interface RoomContextType {
    rooms: any[],
    setRooms: React.Dispatch<React.SetStateAction<any[]>>,
    currRoom: null | any
    setCurrRoom: React.Dispatch<React.SetStateAction<null | string>>,
    loadingRooms: boolean,
    setLoadingRooms: React.Dispatch<React.SetStateAction<boolean>>,
    fetchRooms: () => void,
    newMessagesMap: Map<string, number>,
    setNewMessagesMap: (val: Map<string, number>) => void,
    onlineUsers: Map<String, { count: number, members: Set<string> }>,
    setOnlineUsers: (val: Map<String, { count: number, members: Set<string> }>) => void
}

const RoomContext = createContext<RoomContextType | null>(null)

export const RoomProvider = ({ children }: { children: ReactNode }) => {

    const [rooms, setRooms] = useState<any[]>([]);
    const [currRoom, setCurrRoom] = useState<any | null>(null)
    const [loadingRooms, setLoadingRooms] = useState(false)
    const [newMessagesMap, setNewMessagesMap] = useState<Map<string, number>>(new Map<string, number>());
    const [onlineUsers, setOnlineUsers] = useState<Map<String, { count: number, members: Set<string> }>>(new Map<String, { count: number, members: Set<string> }>())
    const { socket } = useSocket()

    const fetchRooms = async () => {
        try {
            setLoadingRooms(true);
            const res = await authenticatedFetch(GET_ALL_ROOMS_URL, { method: "GET", credentials: "include" })
            const d = await res.json();
            // console.log(d);
            if (d.success) {
                setRooms(d.data)
            }
            else {
                toast.error("Error at Fetching Rooms ")
                console.log(d);
            }

        } catch (error) {
            console.log("error", error);
        }
        finally {
            setLoadingRooms(false);
        }
    }

    useEffect(() => {
        fetchRooms()
        setNewMessagesMap(new Map<string, number>())
    }, [])



    useEffect(() => {
        if (socket?.OPEN === 1 && rooms?.length > 0) {
            rooms.forEach((room: any) => {

                setNewMessagesMap((prev) => {
                    const map = new Map<string, number>(prev);
                    if (!map.has(room.room.id)) map.set(room.room.id, 0);
                    return map
                })
                socket.send(JSON.stringify({
                    type: "join",
                    payload: {
                        roomId: room.room.id
                    }
                }))
            });

            socket.send(JSON.stringify({
                type: "get-online-users"
            }))
        }
    }, [rooms, socket])

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

                setRooms((prev) => {
                    const newArr = prev.map((p) => {
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

        
                if (currRoom && currRoom.id === obj.data.roomId) {
                    console.log("naya toh hai");
                    
                    const newObj: any = rooms.filter((p) => {
                        if (p.room.id === obj.data.roomId) {
                            return p;
                        }
                    })

                    const newMem = {
                        user: {
                            id: obj.data.id,
                            name: obj.data.name,
                            email: obj.data.email,
                            profilePic: obj.data.profilePic,
                        }
                    }

                    const updatedObj = {
                        ...newObj,
                        members: [...newObj.members, newMem]
                    }
                    setCurrRoom(()=>{
                        return updatedObj
                    })

                }
            }
        }

            if (socket && socket.OPEN === 1) {
                socket.addEventListener("message", localSocket)
            }

            return () => {
                if (socket) socket.removeEventListener("message", localSocket)
            }

        }, [socket])


    useEffect(() => {
        // if(currRoom===null || currRoom.id===null) return;
        // @ts-ignore
        if (currRoom && newMessagesMap.get(currRoom.id) > 0) {

            setNewMessagesMap((prev) => {
                const map = new Map<string, number>(prev);
                map.set(currRoom.id, 0);
                return map
            });
        }
    }, [currRoom])
    


    return <RoomContext.Provider value={{ rooms, setRooms, currRoom, setCurrRoom, loadingRooms, setLoadingRooms, fetchRooms, setNewMessagesMap, newMessagesMap, onlineUsers, setOnlineUsers }}>{children}</RoomContext.Provider>
}


export const useRoom = () => {
    const context = useContext(RoomContext)
    if (!context) {
        console.log("Room Context must be used with provider");
        throw new Error("useRoom must be used within a RoomProvider");
    }
    return context
}