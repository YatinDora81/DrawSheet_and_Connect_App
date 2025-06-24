"use client";

import { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";


function ModalContainer({ showModal, setShowModal, children }: {
    showModal: number;
    setShowModal: React.Dispatch<React.SetStateAction<number>>;
    children ?: ReactNode | null;
}) {

    useEffect(() => {
        if (showModal !== -1) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [showModal]);

    if (showModal === -1) return null;

    const modalRoot = document.getElementById("modal-root");
    if (!modalRoot) return null;

    return ReactDOM.createPortal(
        <div
            onClick={() => setShowModal(-1)}
            className="fixed top-0 left-0 bg-black/30 transition-all duration-200 backdrop-blur-[3px] w-full z-[1111] flex items-center justify-center min-h-[100vh] h-full"
        >
            {children}
        </div>,
        modalRoot
    );
}

export default ModalContainer;
