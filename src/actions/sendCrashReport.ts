"use server"

import { TypeAction } from "@/types/misc"
import sendEmail from "./sendEmail";
import { headers } from "next/headers";

type Args = {
  payload: {
    [key: string]: any
  }
};

const sendCrashReport = async (args: Args): Promise<TypeAction> => {
  try {

    // Payload
    const payload = {
      ...args.payload,
      userAgent: (await headers()).get("user-agent"),
    }

    // Send email
    const response = await sendEmail({
      message: crashReport(payload),
      subject: "Crash Report - AQI TV",
      to: ["sahilsworkmail@gmail.com"],
    });

    // if fails
    if (!response.status) {
      throw new Error(response.message);
    }

    // Return Action Response
    return {
      status: true,
      message: "Thank you for your feedback.",
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

export default sendCrashReport;

function crashReport(data: Record<string, any>): string {
  try {
    const tableStyle = `
          border-collapse: collapse;
          width: 100%;
          font-family: Arial, sans-serif;
        `;
    const thStyle = `
          border: 1px solid #ddd;
          padding: 8px;
          background-color: #f4f4f4;
          text-align: left;
          font-weight: bold;
        `;
    const tdStyle = `
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        `;

    const keys = Object.keys(data);
    const rows = keys.map(key => `
          <tr>
            <th style="${thStyle}">${key}</th>
            <td style="${tdStyle}">${data[key]}</td>
          </tr>
        `).join("");

    // Return template
    return `
          <!DOCTYPE html>
          <html>
            <head>
              <title>Email Notification</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f9f9f9;
                }
                .email-container {
                  max-width: 600px;
                  margin: 20px auto;
                  background-color: #ffffff;
                  border: 1px solid #ddd;
                  border-radius: 5px;
                  overflow: hidden;
                }
                .email-header {
                  background-color: #f96d6d;
                  color: white;
                  padding: 10px 20px;
                  text-align: center;
                  font-size: 20px;
                }
                .email-body {
                  padding: 20px;
                }
                .email-footer {
                  background-color: #f4f4f4;
                  text-align: center;
                  padding: 10px;
                  font-size: 12px;
                  color: #777;
                }
              </style>
            </head>
            <body>
              <div class="email-container">
                <div class="email-header">
                  Report Data - AQI TV
                </div>
                <div class="email-body">
                  <table style="${tableStyle}">
                    <thead>
                      <tr>
                        <th style="${thStyle}">Key</th>
                        <th style="${thStyle}">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${rows}
                    </tbody>
                  </table>
                </div>
                <div class="email-footer">
                  This is an automated message. Please do not reply.
                </div>
              </div>
            </body>
          </html>
        `;
  } catch (error: any) {
    return "Error while generating template"
  }
}