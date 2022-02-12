import nodemailer from "nodemailer";
import { emailTemplates } from './emailTemplates';

export const sendInternalEmail = async (template = '', to = [], payload) => {

    const transporter = nodemailer.createTransport({
        host: process.env.NEXT_EMAIL_HOST,
        port: 25,
        secure: false,

    });

    const emailTemplate = emailTemplates(template, payload)

    await transporter.sendMail({
        from: '"JOM MAKAN" <admin@jom-makan.com>',
        to: to,
        subject: emailTemplate.subject,
        text: emailTemplate.body,
        html: emailTemplate.body
    });
}