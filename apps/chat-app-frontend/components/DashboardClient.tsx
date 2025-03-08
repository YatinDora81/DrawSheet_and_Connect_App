"use client"

import React, { ReactNode, useEffect, useState } from 'react'
import { RoomSection } from './RoomSection'
import ChatSection from './ChatSection'
import { SocketProvider, useSocket } from '../hooks/useSocket'
import { RoomProvider } from '../hooks/useRoom'
import CreateNewRoomModal from './CreateNewRoomModal'
import Modal from './Modal'
import JoinNewRoomModal from './JoinRoomModal'

type ModalMap = {
  name : string,
  component : any
}

const DashboardClient = () => {

  const [showModal  , setShowModal] = useState(-1)
  const modalMap : ModalMap[] = [ 
    {
      name : "Create Room",
      component : CreateNewRoomModal
    },
    {
      name : "Join Room",
      component : JoinNewRoomModal
    }
  ]

  return (
    <div className=" text-white">
      <SocketProvider>
        <RoomProvider>
          <div className=" flex w-full">
            {showModal!==-1 && showModal<modalMap.length && <Modal showModal={showModal} setShowModal={setShowModal} Component={modalMap[showModal]?.component} ></Modal>}
            <RoomSection setModal = {setShowModal} />
            <ChatSection setModal = {setShowModal} />
          </div>
        </RoomProvider>
      </SocketProvider>

    </div>
  )
}

export default DashboardClient
