import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Drawsheet - Virtual Whiteboard for Creative Collaboration",
  description: "Drawsheet is a virtual whiteboard for sketching hand-drawn like diagrams. Collaborative, secure, and works on any device. Create, share and collaborate in real-time.",
  keywords: ["whiteboard", "drawing", "collaboration", "diagrams", "sketching", "online drawing", "virtual whiteboard"],
  authors: [{ name: "Yatin Dora", url: "https://github.com/YatinDora81" }],
  openGraph: {
    title: "Drawsheet - Virtual Whiteboard",
    description: "Create and collaborate on diagrams and sketches in real-time",
    type: "website",
    siteName: "Drawsheet"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Toaster
          position="bottom-right"
          reverseOrder={false}
        />
        {children}
        <div id="modal-root" />
      </body>
    </html>
  );
}
