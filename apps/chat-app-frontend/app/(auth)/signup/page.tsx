import { Metadata } from "next";
import AuthPage from "../../../components/AuthPage";

export const metadata: Metadata = {
    title: "Sign Up - Connect",
    description: "Create your Connect account to start chatting. Join the community and connect with friends through real-time messaging."
}


export default function Signup(){
    return <AuthPage isSignup={true} />
}