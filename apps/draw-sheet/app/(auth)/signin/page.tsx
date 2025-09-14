import { Metadata } from "next";
import AuthPage from "../../../components/AuthPage";

export const metadata: Metadata = {
    title: "Sign In - Drawsheet",
    description: "Sign in to your Drawsheet account to access your drawings and collaborate with others.",
    keywords: ["sign in", "login", "authentication", "drawsheet account"],
    robots: "noindex"
  };

export default function SignInPage(){
    return <AuthPage isSignIn={true} />
}