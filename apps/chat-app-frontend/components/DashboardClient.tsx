"use client"

import React, { useEffect, useState } from 'react'
import { RoomSection } from './RoomSection'
import ChatSection from './ChatSection'
import { SocketProvider, useSocket } from '../hooks/useSocket'
import { RoomProvider } from '../hooks/useRoom'
import CreateNewRoomModal from './CreateNewRoomModal'
import Modal from './Modal'

const DashboardClient = () => {

  const [showModal  , setShowModal] = useState(true)

  return (
    <div className=" text-white">
      <SocketProvider>
        <RoomProvider>
          <div className=" flex w-full">
            {showModal && <Modal showModal={showModal} setShowModal={setShowModal} Component={CreateNewRoomModal} ></Modal>}
            <RoomSection />
            <ChatSection />
          </div>
        </RoomProvider>
      </SocketProvider>

    </div>
  )
}

export default DashboardClient
