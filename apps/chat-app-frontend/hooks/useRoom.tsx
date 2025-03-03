"use client"

import { GET_ALL_ROOMS_URL } from '@repo/config/URL';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useSocket } from './useSocket';

export interface RoomContextType  {
    rooms : any[],
    setRooms : React.Dispatch<React.SetStateAction<any[]>>,
    currRoom : null | any
    setCurrRoom : React.Dispatch<React.SetStateAction<null | string>>,
    loadingRooms : boolean,
    setLoadingRooms : React.Dispatch<React.SetStateAction<boolean>>,
    fetchRooms : ()=> void
}

const RoomContext = createContext<RoomContextType | null>(null)

export const RoomProvider = ({children} : {children : ReactNode})=>{

    const [rooms,setRooms] = useState<any[]>([]);
    const [currRoom, setCurrRoom]  = useState<any | null>(null)
    const [loadingRooms,setLoadingRooms] = useState(false)
    const {socket} = useSocket()

    // console.log(rooms);
    

    const fetchRooms = async ()=>{
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
        finally{
            setLoadingRooms(false);
        }
    }

    useEffect(()=>{
        fetchRooms()
    } , [])

    useEffect(()=>{
        if(socket?.OPEN===1 && rooms.length>0){
            rooms.forEach((room : any) => {
                socket.send(JSON.stringify({
                    type: "join",
                    payload: {
                        roomId: room.id
                    }
                }))
            });
        }
    } , [rooms])

    

    return <RoomContext.Provider value={{rooms , setRooms , currRoom,setCurrRoom , loadingRooms ,setLoadingRooms, fetchRooms}}>{children}</RoomContext.Provider>
}


export const useRoom = ()=>{
    const context = useContext(RoomContext)
    if(!context){
        console.log("Room Context must be used with provider");
        throw new Error("useRoom must be used within a RoomProvider");
    }
    return context
}