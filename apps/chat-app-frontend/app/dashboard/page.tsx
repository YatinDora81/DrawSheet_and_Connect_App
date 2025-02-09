import ChatSection from "../../components/ChatSection";
import { RoomSection } from "../../components/RoomSection";

export default function Dashboard(){
    return <div className=" text-white">
        
        <div className=" flex w-full">
        <RoomSection />
        <ChatSection />
        </div>

    </div>
}