import { Metadata } from "next";
import LandingPage from "../components/LandingPage";

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

  return (
    <LandingPage />
  );
}

export const dynamic = 'force-dynamic'