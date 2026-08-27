import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/NavbarGuest";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Connect - Real-time Chat Application",
  description: "Connect with friends and colleagues through real-time messaging. Create rooms, join conversations, and stay connected anywhere, anytime."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className={`${geistSans.variable} ${geistMono.variable} min-w-screen min-h-screen bg-zinc-900`}>
        {/* <Navbar /> */}
        {children}
      </body>
    </html>
  );
}
