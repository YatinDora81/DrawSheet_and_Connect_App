"use client"
import { createContext, JSX, ReactNode, useContext, useState } from "react";
import CreateModal from "../components/Modals/CreateModal";
import JoinModal from "../components/Modals/JoinModal";
import ChooseAvatar from "../components/Modals/ChooseAvatar";

type ModalType = {
    name: string,
    component: ReactNode,
    data?: JSON
}

type ModalConextType = {
    showModal: number,
    setShowModal: React.Dispatch<React.SetStateAction<number>>,
    Modals: ModalType[]
}

const ModalContext = createContext<ModalConextType | null>(null)

export const ModalContextProvider = ({ children }: { children: ReactNode }) => {

    const [showModal, setShowModal] = useState<number>(-1);
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
        }
    ]
    

    return <ModalContext.Provider value={{ showModal, setShowModal, Modals }}>
        {children}
    </ModalContext.Provider>
}

export const useModal = () => {
    const modalContext = useContext(ModalContext)
    if (!modalContext) throw new Error("Please Wrap the Component with ModalContextProvider")
    return modalContext
}