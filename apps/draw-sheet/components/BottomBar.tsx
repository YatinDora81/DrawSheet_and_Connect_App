"use client"
import React, { SetStateAction } from 'react'
import { Colors } from '../utils/Types'

function BottomBar({ selectedColor = Colors[0]?.color_code, setSelectedColor, lineWidth, setLineWidth }: { selectedColor?: string, setSelectedColor: React.Dispatch<SetStateAction<string>>, lineWidth: number, setLineWidth: React.Dispatch<SetStateAction<number>> }) {
  return (
    <div className=' absolute bg-[#26262A]/70 left-[50%] bottom-[2vh] translate-x-[-50%] flex   justify-evenly items-center w-[38rem] h-[3rem] rounded-2xl gap-1 border border-gray-700'>

      <div className=' flex justify-center items-center h-full w-[55%] gap-2'>
        <div>Colors:</div>
        <div className=' flex justify-start items-center h-full gap-[5px]'>
          {
            Colors.map((c) => <div onClick={() => setSelectedColor(c.color_code)} key={c.color_name} className={` h-[1.6rem] hover:scale-[1.1] transition-all duration-300 ease-in-out rounded-full aspect-square ${selectedColor === c.color_code && 'border-3  border-zinc-500 scale-[1.1]'}`} style={{ backgroundColor: c.color_code }}></div>)
          }

          <div className='relative group w-[1.8rem] h-[1.6rem]'>
            <div className='w-full  h-full rounded-sm border-2 relative border-white/90  hover:scale-110 transition-all duration-300 ease-in-out'></div>
            <input
              type='color'
              value={selectedColor}
              onChange={(e) => { setSelectedColor(e.target.value) }}
              className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
            />
            <div className=' text-white text-sm font-normal invisible group-hover:visible transition-all duration-100 rounded-xl absolute -top-[2.3rem] -left-[55%] capitalize bg-white/10' style={{ paddingBlock: "0.35rem", paddingInline: "0.5rem" }}>Custom </div>
          </div>

        </div>
      </div>

      <div className=' h-[50%] w-[1px] bg-white/10'> </div>

      <div className=' w-[35%] h-full flex  items-center justify-evenly gap-3'>
        <div className=' text-gray-400'>Size:</div>
        <input type='range' className="w-48 h-[4px] appearance-none bg-white/10 rounded-lg outline-none cursor-pointer transition [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition [&::-webkit-slider-thumb]:duration-200 [&::-webkit-slider-thumb]:hover:bg-blue-600 [&::-webkit-slider-thumb]:focus:bg-blue-300 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:transition [&::-moz-range-thumb]:duration-200 [&::-moz-range-thumb]:hover:bg-blue-600 [&::-moz-range-thumb]:focus:bg-blue-300" min={1} value={lineWidth} onChange={(e) => { setLineWidth(parseInt(e.target.value)) }} max={20} />
        <div className=' text-gray-200'>{lineWidth}</div>

      </div>

    </div>
  )
}

export default BottomBar