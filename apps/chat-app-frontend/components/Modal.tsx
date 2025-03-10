"use client"
import React, { ElementType, ReactNode, useState } from 'react'

const Modal = ({Component ,showModal , setShowModal } : {Component : ElementType , showModal : number ,setShowModal : (value : number)=> void}) => {


  return (
    <div onClick={(e)=>{
        setShowModal(-1)
        // console.log("parent");
        
        e.stopPropagation()
    }} className=' w-screen h-screen absolute top-0 left-0 z-[100]   backdrop-blur-[3px]  flex justify-center items-center'>
      <Component showModal={showModal} setShowModal={setShowModal} />
    </div>
  )
}

export default Modal
