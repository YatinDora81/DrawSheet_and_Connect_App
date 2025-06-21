"use client"
import { createContext, ReactNode, useContext, useState } from "react";

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
    const Modals: ModalType[] = []

    console.log(showModal);
    

    return <ModalContext.Provider value={{ showModal, setShowModal, Modals }}>
        {children}
    </ModalContext.Provider>
}

export const useModal = () => {
    const modalContext = useContext(ModalContext)
    if (!modalContext) throw new Error("Please Wrap the Component with ModalContextProvider")
    return modalContext
}