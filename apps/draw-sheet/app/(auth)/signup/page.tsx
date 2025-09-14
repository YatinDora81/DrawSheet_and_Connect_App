import { Metadata } from "next";
import AuthPage from "../../../components/AuthPage";

export const metadata: Metadata = {
    title: "Create Account - Drawsheet",
    description: "Create a free Drawsheet account to save your drawings, collaborate with others, and access advanced features.",
    keywords: ["sign up", "register", "create account", "free account", "drawsheet"],
    robots: "noindex"
  };

export default function SignInPage(){
    return <AuthPage isSignIn={false} />
}