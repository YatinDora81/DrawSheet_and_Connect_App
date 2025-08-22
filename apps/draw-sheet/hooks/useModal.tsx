"use client"
import { createContext, JSX, ReactNode, useContext, useState } from "react";
import CreateModal from "../components/Modals/CreateModal";
import JoinModal from "../components/Modals/JoinModal";
import ChooseAvatar from "../components/Modals/ChooseAvatar";
import RoomDetails from "../components/Modals/RoomDetails";

type ModalType = {
    name: string,
    component: ReactNode,
    data?: JSON
}

type ModalConextType = {
    showModal: number,
    setShowModal: React.Dispatch<React.SetStateAction<number>>,
    Modals: ModalType[],
    roomData: any, 
    setRoomData : (s : any)=>void
}

const ModalContext = createContext<ModalConextType | null>(null)

export const ModalContextProvider = ({ children }: { children: ReactNode }) => {

    const [showModal, setShowModal] = useState<number>(-1);
    const [roomData, setRoomData] = useState<any>(null)
    const Modals: ModalType[] = [
        {
            name : "create-modal",
            component : <CreateModal></CreateModal>
        },
        {
            name : "join-modal",
            component : <JoinModal></JoinModal>
        },
        {
            name : "choose-avatar",
            component : <ChooseAvatar></ChooseAvatar>
        },
        {
            name: "room-details",
            component : <RoomDetails></RoomDetails>
        }
    ]
    

    return <ModalContext.Provider value={{ showModal, setShowModal, Modals , roomData, setRoomData }}>
        {children}
    </ModalContext.Provider>
}

export const useModal = () => {
    const modalContext = useContext(ModalContext)
    if (!modalContext) throw new Error("Please Wrap the Component with ModalContextProvider")
    return modalContext
}