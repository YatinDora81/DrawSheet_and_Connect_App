"use client"
import React, { ElementType, ReactNode, useState } from 'react'

const Modal = ({Component ,showModal , setShowModal } : {Component : ElementType , showModal : boolean ,setShowModal : (value : boolean)=> void}) => {


  return (
    <div onClick={(e)=>{
        setShowModal(false)
        console.log("parent");
        
        e.stopPropagation()
    }} className=' w-screen h-screen absolute top-0 left-0 z-[100]   backdrop-blur-[3px]  flex justify-center items-center'>
      <Component showModal={showModal} setShowModal={setShowModal} />
    </div>
  )
}

export default Modal
