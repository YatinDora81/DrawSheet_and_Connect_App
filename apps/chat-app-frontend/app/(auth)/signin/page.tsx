import { Metadata } from "next"
import AuthPage from "../../../components/AuthPage"

export const metadata: Metadata = {
    title: "Sign In - Connect",
    description: "Sign in to your Connect account to access your chat rooms and continue conversations with your contacts."
}

export default function Signin(){
    return <AuthPage isSignup={false}></AuthPage>
}