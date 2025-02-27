import { GET_ROOM_ID_URL } from "@repo/config/URL";
import ChatSection from "../../components/ChatSection";
import DashboardClient from "../../components/DashboardClient";
import { RoomSection } from "../../components/RoomSection";
import toast from "react-hot-toast";
import { cookies } from "next/headers";


export default async function DashboardServer() {

    return <DashboardClient></DashboardClient>
}