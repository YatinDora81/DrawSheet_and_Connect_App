"use server"
import nodemailer from 'nodemailer';

class EmailService {
    private transporter: nodemailer.Transporter | null = null

    constructor() {
        (async () => { this.transporter = await this.getTransporter(); })()
    }

    async getTransporter() {
        return nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
    }

    async sendEmail(from : string, to: string, subject: string, html: string) {
        if (!this.transporter) {
            this.transporter = await this.getTransporter()
        }

            const email = await this.transporter.sendMail({
                from,
                to,
                subject,
                html,
            })

            return email;
    }
}

// export default new EmailService();

const emailService = new EmailService();

export async function sendEmail(from: string, to: string, subject: string, html: string) {
    return await emailService.sendEmail(from, to, subject, html);
}