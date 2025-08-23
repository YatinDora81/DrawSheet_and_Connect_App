import { ReactNode } from "react";
import { SocketProvider } from "../../hooks/useSocket";
import { RoomProvider } from "../../hooks/useRoom";
import { ModalContextProvider } from "../../hooks/useModal";

export default function RootLayout({children} : {children : ReactNode}){
    return (
        <SocketProvider>
            <RoomProvider>
                <ModalContextProvider>
                    {children}
                </ModalContextProvider>
            </RoomProvider>
        </SocketProvider>
    )
}