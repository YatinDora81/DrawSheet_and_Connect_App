"use client"
import { PiPencilSimpleLineLight, PiPlus } from "react-icons/pi";
import ModalContainer from "./Modals/ModalContainer";
import { useModal } from "../hooks/useModal";

function NavbarClient() {

    const {showModal,setShowModal,Modals} = useModal()

    return (
        <div className=" w-full border-b h-[4.5rem] top-0 sticky backdrop-blur-lg bg-zinc-950 z-[100] border-b-zinc-800">
            <ModalContainer setShowModal={setShowModal} showModal={showModal}>{Modals[showModal]?.component}</ModalContainer>
            <div className=" h-full    text-white font-sans flex w-[89%]   "  style={{ marginInline: "auto" }}>

                <div className=" flex justify-between w-full items-center">
                    <div className=" flex text-2xl gap-2 justify-start items-center">
                        <PiPencilSimpleLineLight className=" text-blue-500" />
                        <div className="  ">Drawsheet</div>
                    </div>
                    <div className=" h-full flex justify-center items-center">
                        <button onClick={()=>setShowModal(0)} className=" border flex justify-center items-center h-[50%] w-[9rem] border-zinc-800 rounded-lg cursor-pointer hover:bg-blue-500 gap-2 transition-colors duration-200 text-sm" style={{paddingInline : ""}}> <PiPlus></PiPlus> New Drawing</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default NavbarClient