import nodemailer from 'nodemailer'
import { drawsheetTemplate } from '../email_templates/drawsheet.js';
import { connectTemplate } from '../email_templates/connect.js';
import { config } from 'dotenv';

let transporter: nodemailer.Transporter | null = null

const getTransporter = async () => {
    config()
    return nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });
}

export const sendEmail = async (name: string, reciverEmail: string, otp: string, isDraw: boolean) => {

    if (!transporter) {
        transporter = await getTransporter()
    }

    try {
        const email = await transporter.sendMail({
            from: `"${isDraw ? 'Drawsheet App' : 'Connect App'}" <yatin.dorapvt@gmail.com>`,
            to: reciverEmail,
            subject: `${isDraw ? 'Drawsheet' : 'Connect'} Security: Use This Code to Reset Password`,
            html: isDraw ? drawsheetTemplate(name, reciverEmail, otp) : connectTemplate(name, reciverEmail, otp), // HTML body
        });

        // console.log("Message sent:", email.messageId);
    } catch (error: any) {
        throw new Error(error.message || 'Error at send email, try again later!!!')
    }

}