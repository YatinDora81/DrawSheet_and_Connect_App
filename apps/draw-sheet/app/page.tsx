import { Metadata } from "next";
import LandingPage from "../components/LandingPage";
import { BASE_HTTP_URL, BASE_WS_HTTP_URL } from "@repo/config/URL";

export const metadata: Metadata = {
  title: "Drawsheet - The Simplest Way to Create Diagrams and Sketches",
  description: "Start drawing now with Drawsheet's virtual whiteboard. Collaborative, secure, and works on any device. No registration required to begin creating.",
  keywords: ["online drawing", "whiteboard", "collaborative drawing", "free drawing tool", "diagrams", "sketches"],
  openGraph: {
    title: "Drawsheet - Virtual Whiteboard for Everyone",
    description: "The simplest way to create diagrams and sketches online"
  }
};

export default function Home() {
  fetch(BASE_HTTP_URL!)
  fetch(BASE_WS_HTTP_URL!)

  console.log(BASE_HTTP_URL, BASE_WS_HTTP_URL)

  return (
    <LandingPage />
  );
}

export const dynamic = 'force-dynamic'