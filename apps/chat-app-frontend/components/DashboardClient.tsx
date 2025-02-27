"use client"

import React from 'react'
import { RoomSection } from './RoomSection'
import ChatSection from './ChatSection'
import { SocketProvider, useSocket } from '../hooks/useSocket'
import { RoomProvider } from '../hooks/useRoom'

const DashboardClient = () => {


  return (
    <div className=" text-white">
      <SocketProvider>
        <RoomProvider>
          <div className=" flex w-full">
            <RoomSection />
            <ChatSection />
          </div>
        </RoomProvider>
      </SocketProvider>

    </div>
  )
}

export default DashboardClient
