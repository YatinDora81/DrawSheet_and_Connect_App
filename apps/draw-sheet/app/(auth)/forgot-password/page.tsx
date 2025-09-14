import { Metadata } from "next";
import ForgotPassword from "../../../components/ForgotPassword";

export const metadata: Metadata = {
    title: "Reset Password - Drawsheet",
    description: "Reset your Drawsheet account password. Enter your email to receive password reset instructions.",
    keywords: ["password reset", "forgot password", "account recovery"],
    robots: "noindex"
  };

export default function forgotPassword() {
    return <ForgotPassword />
}