"use client"

import { GET_ALL_ROOMS_URL } from '@repo/config/URL';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useSocket } from './useSocket';

export interface RoomContextType {
    rooms: any[],
    setRooms: React.Dispatch<React.SetStateAction<any[]>>,
    currRoom: null | any
    setCurrRoom: React.Dispatch<React.SetStateAction<null | string>>,
    loadingRooms: boolean,
    setLoadingRooms: React.Dispatch<React.SetStateAction<boolean>>,
    fetchRooms: () => void,
    newMessagesMap: Map<string, number>,
    setNewMessagesMap: (val: Map<string, number>) => void
}

const RoomContext = createContext<RoomContextType | null>(null)

export const RoomProvider = ({ children }: { children: ReactNode }) => {

    const [rooms, setRooms] = useState<any[]>([]);
    const [currRoom, setCurrRoom] = useState<any | null>(null)
    const [loadingRooms, setLoadingRooms] = useState(false)
    const [newMessagesMap, setNewMessagesMap] = useState<Map<string, number>>(new Map<string, number>());
    const { socket } = useSocket()

    console.log("rooommsm", rooms);



    const fetchRooms = async () => {
        try {
            setLoadingRooms(true);
            const res = await fetch(GET_ALL_ROOMS_URL, { method: "GET", credentials: "include" })
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
                
                setNewMessagesMap((prev)=>{
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
        }
    }, [rooms])

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



    return <RoomContext.Provider value={{ rooms, setRooms, currRoom, setCurrRoom, loadingRooms, setLoadingRooms, fetchRooms, setNewMessagesMap, newMessagesMap }}>{children}</RoomContext.Provider>
}


export const useRoom = () => {
    const context = useContext(RoomContext)
    if (!context) {
        console.log("Room Context must be used with provider");
        throw new Error("useRoom must be used within a RoomProvider");
    }
    return context
}