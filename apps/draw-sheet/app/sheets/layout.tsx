import { ReactNode } from "react";
import { SocketProvider } from "../../hooks/useSocket";
import { RoomProvider } from "../../hooks/useRoom";
import { ModalContextProvider } from "../../hooks/useModal";
import { DeviceProvider } from "../../hooks/useDevice";

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <SocketProvider>
            <RoomProvider>
                <ModalContextProvider>
                    <DeviceProvider>
                        {children}
                    </DeviceProvider>
                </ModalContextProvider>
            </RoomProvider>
        </SocketProvider>
    )
}