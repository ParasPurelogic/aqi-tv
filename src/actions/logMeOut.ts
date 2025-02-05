"use server"

import { conventions, getCookieConfig } from "@/config/misc";
import { TypeAction } from "@/types/misc";
import { cookies } from "next/headers";

const logMeOut = async (): Promise<TypeAction> => {
    try {

        // Cookie
        const cookie = await cookies();

        // Clear cookie
        cookie.set(
            conventions.cookie.userInfo,
            "",
            {
                ...getCookieConfig(),
                maxAge: 0
            }
        )

        // Return Action Response
        return {
            status: true,
            message: "Logged out successfully"
        }

    } catch (error: any) {
        console.log("ERROR WHILE LOGGING OUT::: ", error?.message);
        return {
            status: false,
            message: "Something went wrong"
        }
    }
}

export default logMeOut