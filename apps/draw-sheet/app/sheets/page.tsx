import AllSheetsClient from "../../components/AllSheetsClient";
import ModalContainer from "../../components/Modals/ModalContainer";
import { ModalContextProvider } from "../../hooks/useModal";
import { RoomProvider } from "../../hooks/useRoom";
import { SocketProvider } from "../../hooks/useSocket";

export default function AllSheets() {

    return (
        <SocketProvider>
            <RoomProvider>
                <ModalContextProvider>
                    <AllSheetsClient />
                </ModalContextProvider>
            </RoomProvider>
        </SocketProvider>
    )
}