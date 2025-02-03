import { conventions } from "@/config/misc";
import { TypeUserInfo } from "@/types/misc";
import { cookies } from "next/headers";
import { cache } from "react";

const getUserInfo = async (): Promise<TypeUserInfo | undefined> => {
    try {
        // Cookies
        const cookie = await cookies();
        const cookieValue = cookie.get(conventions.cookie.userInfo)?.value;

        // Check if the cookie exists and has a value
        if (!cookieValue) {
            throw new Error("User info cookie is missing.");
        }

        // Split the JWT into its three parts
        const [header, payload, signature] = cookieValue.split(".");

        // Validate the JWT structure
        if (!header || !payload || !signature) {
            throw new Error("Invalid JWT structure.");
        }

        // Decode the payload
        const decodedPayload = decodeBase64Url(payload);

        // Parse the decoded payload into a JSON object
        const payloadObj: TypeUserInfo = JSON.parse(decodedPayload);

        // Validate the parsed payload
        if (!isValidUserInfo(payloadObj)) {
            throw new Error("Invalid user info payload.");
        }

        // Return the parsed payload
        return payloadObj;

        //
    } catch (error) {
        console.error("ERROR WHILE GETTING USER INFO:", error);
        return undefined;
    }
};

// Function to decode Base64Url
function decodeBase64Url(base64Url: string): string {
    // Convert Base64Url to Base64
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    // Pad the Base64 string with '=' to make its length a multiple of 4
    const padLength = (4 - (base64.length % 4)) % 4;
    base64 = base64.padEnd(base64.length + padLength, '=');

    // Decode the Base64 string to a binary string
    const binaryString = atob(base64);

    // Convert the binary string to a UTF-8 string
    const utf8String = decodeURIComponent(
        Array.prototype.map.call(binaryString, (c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join('')
    );

    // Return the decoded UTF-8 string
    return utf8String;
}

// Function to validate the user info payload
function isValidUserInfo(payload: any): payload is TypeUserInfo {
    // Add validation logic based on the structure of TypeUserInfo
    return payload && typeof payload === "object" && "id" in payload && "token" in payload;
}

export default cache(getUserInfo)