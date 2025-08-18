import AllSheetsClient from "../../components/AllSheetsClient";
import ModalContainer from "../../components/Modals/ModalContainer";
import { ModalContextProvider } from "../../hooks/useModal";
import { RoomProvider } from "../../hooks/useRoom";

export default function AllSheets() {

    return (
        <RoomProvider>
            <ModalContextProvider>
                <AllSheetsClient />
            </ModalContextProvider>
        </RoomProvider>
    )
}