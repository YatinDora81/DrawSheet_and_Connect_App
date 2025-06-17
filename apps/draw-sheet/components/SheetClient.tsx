"use client"

import BottomBar from "./BottomBar"
import SideBar from "./SideBar"

function SheetClient() {
  return (
    <div className=" h-full relative">
        <SideBar />
        <BottomBar />
        <canvas className=" h-full w-full "></canvas>
    </div>
  )
}

export default SheetClient