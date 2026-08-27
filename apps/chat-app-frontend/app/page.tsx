import { Metadata } from "next";
import HomePage from "../components/HomePage";
import HealthCheck from "../components/HealthCheck";
import { BASE_HTTP_URL, BASE_WS_HTTP_URL } from "@repo/config/URL";

export const metadata : Metadata = {
  title : "Connect - Home",
  description : "Welcome to Connect - A modern real-time chat application. Join conversations, create rooms, and stay connected with friends and colleagues."
}

export default function Home() {
  fetch(BASE_HTTP_URL!)
  fetch(BASE_WS_HTTP_URL!)

  console.log(BASE_HTTP_URL, BASE_WS_HTTP_URL)
  return (
    <div className=" w-full h-fit overflow-x-hidden" style={{overflowX : "hidden"}}><HealthCheck /><HomePage /></div>
  );
}
