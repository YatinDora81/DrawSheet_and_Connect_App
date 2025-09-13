import { Metadata } from "next"
import ForgotPassword from "../../../components/ForgotPassword"

export const metadata: Metadata = {
    title: "Reset Password - Connect",
    description: "Reset your Connect account password. Enter your email to receive a secure password reset link and regain access to your account."
}

export default function forgotPassword() {
    return <ForgotPassword />
}
