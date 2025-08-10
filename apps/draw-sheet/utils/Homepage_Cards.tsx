import { IoChatbubbleOutline } from "react-icons/io5";
import { FiDownloadCloud, FiPenTool, FiShare2, FiShield, FiTool } from "react-icons/fi";
import { ReactNode } from "react";

type featureCard = {
  icon: ReactNode,
  heading: string,
  subHeading: string
}

export const featureCards: featureCard[] = [
  {
    icon: <IoChatbubbleOutline />,
    heading: "Simple & Intuitive",
    subHeading: "Designed with simplicity in mind. No learning curve, start drawing right away."
  },
  {
    icon: <FiTool />,
    heading: "Versatile Tools",
    subHeading: "From basic shapes to complex diagrams, all the tools you need for your ideas."
  },
  {
    icon: <FiShare2 />,
    heading: "Easily Shareable",
    subHeading: "Share your creations with anyone, anywhere, with just a link."
  },
  {
    icon: <FiDownloadCloud />,
    heading: "Export Options",
    subHeading: "Save your work in multiple formats including PNG and SVG."
  },
  {
    icon: <FiPenTool />,
    heading: "Hand-drawn Feel",
    subHeading: "Enjoy the natural feel of hand-drawn diagrams with digital convenience."
  },
  {
    icon: <FiShield />,
    heading: "Private & Secure",
    subHeading: "Your diagrams are private by default. Share only when you want to."
  }
]