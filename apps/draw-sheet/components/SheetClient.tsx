"use client"

import BottomBar from "./BottomBar"
import RightBar from "./RightBar"
import SideBar from "./SideBar"

function SheetClient() {
  return (
    <div className=" h-full relative">
        <SideBar />
        <BottomBar />
        <RightBar />      
        <canvas className=" h-full w-full "></canvas>
    </div>
  )
}

export default SheetClient