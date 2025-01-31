"use server"

import { regexChecks } from "@/config/misc"
import login from "@/fetchers/user/login"
import { TypeAction } from "@/types/misc"
import setUserInfoCookie from "./setUserInfoCookie"

type Args = {
    email: string
    password: string
}

const logMeIn = async (args: Args): Promise<TypeAction> => {
    try {
        // If invalid email
        if (!regexChecks.email.test(args.email) || !regexChecks.password.test(args.password)) {
            throw new Error("Invalid email or password found")
        }

        // Login user
        const loginInfo = await login({
            options: {
                email: args.email,
                password: args.password
            },
            onError: err => {
                throw new Error(err)
            }
        })

        // If not logged in
        if (!loginInfo || !loginInfo.token || !loginInfo?.user?.id) {
            throw new Error("..Email or Password is incorrect")
        }

        // Set user Info cookie
        const loginCookieInfo = await setUserInfoCookie({
            userToken: loginInfo.token,
        });

        // If user info cookie not set
        if (!loginCookieInfo.status) {
            throw new Error("Unable to login you in at this moment")
        }

        // Return
        return {
            status: true,
            message: "Login successfully",
        }

        // Error
    } catch (error: any) {
        console.log(error)
        return {
            status: false,
            message: error.message ?? "oh ho! something went wrong",
        }
    }
}

export default logMeIn