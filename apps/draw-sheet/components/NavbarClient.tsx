import { PiPencilSimpleLineLight, PiPlus } from "react-icons/pi";

function NavbarClient() {
    return (
        <div className=" w-full border-b h-[4.5rem] top-0 sticky backdrop-blur-lg border-b-zinc-800">
            <div className=" h-full    text-white font-sans flex w-[89%]   "  style={{ marginInline: "auto" }}>

                <div className=" flex justify-between w-full items-center">
                    <div className=" flex text-2xl gap-2 justify-start items-center">
                        <PiPencilSimpleLineLight className=" text-blue-500" />
                        <div className="  ">Drawsheet</div>
                    </div>
                    <div className=" h-full flex justify-center items-center">
                        <button className=" border flex justify-center items-center h-[50%] w-[9rem] border-zinc-800 rounded-lg cursor-pointer hover:bg-blue-500 gap-2 transition-colors duration-200 text-sm" style={{paddingInline : ""}}> <PiPlus></PiPlus> New Drawing</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default NavbarClient