import { Metadata } from "next";
import SheetClient from "../../../components/SheetClient"


export const metadata: Metadata = {
    title: `Drawing - Drawsheet`,
    description: "Collaborative drawing session. Draw, edit, and collaborate in real-time with others.",
    keywords: ["collaborative drawing", "real-time editing", "whiteboard session"],
    robots: "noindex" // Private collaborative content
};

export default async function SingleSheet({ params }: { params: Promise<{ slug: string }> }) {

    const sheetId = (await params).slug

    return <div className=" bg-[#1A1A1F] h-[100vh] overflow-hidden text-white ">
        <SheetClient sheetId={sheetId} />
    </div>
}

export const dynamic = "force-dynamic";