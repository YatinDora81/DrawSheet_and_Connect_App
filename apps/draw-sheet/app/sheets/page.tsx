import AllSheetsClient from "../../components/AllSheetsClient";
import ModalContainer from "../../components/Modals/ModalContainer";
import { ModalContextProvider } from "../../hooks/useModal";

export default function AllSheets() {

    return (
        <ModalContextProvider>  
            <AllSheetsClient />
        </ModalContextProvider>
    )
}