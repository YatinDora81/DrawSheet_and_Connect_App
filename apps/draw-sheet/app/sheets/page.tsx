import { Metadata } from "next";
import AllSheetsClient from "../../components/AllSheetsClient";

export const metadata: Metadata = {
    title: "My Drawings - Drawsheet Dashboard",
    description: "View and manage all your drawings and collaborative sheets. Create new drawings, join existing rooms, and access your drawing history.",
    keywords: ["dashboard", "my drawings", "drawing management", "collaborative sheets"],
    robots: "noindex" // Private user content
  };
export default function AllSheets() {

    return (
        <AllSheetsClient />
    )
}
export const dynamic = 'force-dynamic'