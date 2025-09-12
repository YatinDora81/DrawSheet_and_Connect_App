"use client"
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import NavbarClient from './NavbarClient'
import { AuthProvider } from '../hooks/useAuth'
import { AvatarProvider } from '../hooks/useAvatars'
import { ModalContextProvider } from '../hooks/useModal'
import { getAuthToken } from '@repo/ui/tokenManager'

function SelectNavbar() {
  const [isToken, setIsToken] = useState(false)
  
  useEffect(() => {
    const token = getAuthToken()
    if (token && typeof token === "string" && token !== "") setIsToken(true)
    else setIsToken(false);
  }, [])

  return (

    isToken ?
      <AuthProvider>
        <ModalContextProvider>
          < AvatarProvider >
            <NavbarClient />
          </ AvatarProvider>
        </ModalContextProvider>
      </AuthProvider >
      :
      <Navbar />

  )
}

export default SelectNavbar