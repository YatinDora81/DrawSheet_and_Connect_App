"use client"

import { useEffect } from "react"
import { useModal } from "../../hooks/useModal"

function ModalContainer() {

    const { showModal, setShowModal } = useModal()

     useEffect(() => {
        if (showModal !== -1) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }

        return () => {
            document.body.style.overflow = ""
        }
    }, [showModal])

    return (
        showModal !== -1 && <div onClick={(e)=>{
            e.stopPropagation()
            setShowModal(-1)
        }} className=" fixed top-0 left-0 bg-black/70 transition-all duration-200  b ackdrop-blur-[3px] w-full z-[1111] flex items-center justify-center min-h-[100vh] h-full">

        </div>
    )
}

export default ModalContainer