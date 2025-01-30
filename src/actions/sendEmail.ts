"use server"

import nodemailer, { Transporter } from "nodemailer";
import { TypeAction } from "@/types/misc"
import Mail from "nodemailer/lib/mailer";

type Attachment = {
    filename: string;
    content: Buffer | string;
    contentType: string;
};

type Args = {
    to: string[];
    bcc?: string[]
    replyTo?: string
    subject: string;
    message: string;
    attachments?: Attachment[];
};

const sendEmail = async (args: Args): Promise<TypeAction> => {
    try {
        // If no to provided
        if (!args.to) {
            throw new Error("Required 'to' should not be empty");
        }

        // If no subject provided
        if (!args.subject) {
            throw new Error("Required 'subject' not be empty");
        }

        // If no message provided
        if (!args.message) {
            throw new Error("Required 'message' not be empty");
        }

        // Create transporter
        const transporter: Transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
        } as nodemailer.TransportOptions);

        // Verify Transporter
        await transporter.verify();

        // Prepare message
        const from = `AQI ${process.env.MAIL_USER!}`;
        const to = args.to;
        const subject = args.subject;
        const message = args.message;
        const replyTo = args.replyTo ?? process.env.MAIL_USER!;

        // Message Payload
        const messagePayload: Mail.Options = {
            from,
            to,
            envelope: {
                from,
                to,
            },
            attachments: args.attachments,
            subject,
            text: message,
            html: message,
            replyTo,
        };

        // Send Email
        await transporter.sendMail(messagePayload);

        // Return Action Response
        return {
            status: true,
            message: "Email sent successfully",
        };

        //
    } catch (error: any) {
        // Return Action Response
        return {
            status: false,
            message: error.message,
        };
    }
};

export default sendEmail;