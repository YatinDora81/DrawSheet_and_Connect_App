import { Metadata } from "next";
import HomePage from "../components/HomePage";

export const metadata : Metadata = {
  title : "Connect - Home",
  description : "Welcome to Connect - A modern real-time chat application. Join conversations, create rooms, and stay connected with friends and colleagues."
}

export default function Home() {
  return (
    <div className=" w-full h-fit overflow-x-hidden" style={{overflowX : "hidden"}}><HomePage /></div>
  );
}
