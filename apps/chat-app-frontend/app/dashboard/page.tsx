import { Metadata } from "next";
import DashboardClient from "../../components/DashboardClient";

export const metadata : Metadata = {
    title :  "Connect - Dashboard",
    description : "Your chat dashboard - manage rooms, send messages, and connect with others in real-time. Create new rooms or join existing conversations."
}

export default async function DashboardServer() {

    return <DashboardClient></DashboardClient>
}

export const dynamic = 'force-dynamic'