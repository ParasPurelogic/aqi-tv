"use server"

import { cookies } from "next/headers"
import * as jose from "jose"
import { TypeAction, TypeUserInfo } from "@/types/misc"
import profileDetails from "@/fetchers/user/profileDetails"
import refreshToken from "@/fetchers/user/refreshToken"
import { conventions, getCookieConfig } from "@/config/misc"

type Args = {
    userToken: string
    userInfo?: TypeUserInfo
}

const setUserInfoCookie = async (args: Args): Promise<TypeAction<TypeUserInfo>> => {
    // Get user info 
    try {
        let userData: TypeUserInfo = args.userInfo ?? {};

        // Fetch user details, if user data not present
        if (!userData) {
            await profileDetails({
                options: {
                    token: args.userToken
                },
                onError: (msg) => {
                    throw new Error(msg)
                },
                onSuccess: (data) => {
                    // Set userData
                    userData = {
                        token: args.userToken,
                        id: data?.id,
                        firstName: data?.firstname,
                        lastName: data?.lastname,
                        number: data?.phonenumber,
                        email: data?.email,
                        profileImg: data.profile_pic,
                    }
                }
            })
        }

        // If user details provided in arg
        if (args.userInfo) {
            let error = "";

            // Refresh user session
            const newToken = await refreshToken({
                options: {
                    token: args.userToken,
                },
                onError: (err) => error = err
            });

            // If error got
            if (error || !newToken) {
                throw new Error(error ?? "Error while refreshing token");
            }

            // Replace old token with new one
            userData = {
                ...args.userInfo,
                token: newToken
            }
        }

        // If user data not found
        if (!userData) {
            throw new Error("User not found");
        }

        // Delete old JWT data from userData payload
        // @ts-expect-error type mismatch
        if (userData?.iss || userData?.exp || userData?.iat) {
            ['iss', 'exp', 'iat'].forEach(key => {
                if (userData.hasOwnProperty(key)) {
                    // @ts-expect-error type mismatch
                    delete userData[key];
                }
            });
        }

        // Cookies
        const cookie = await cookies();

        // Sign a JWT token
        // Generate JWT
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        // JWT Algo
        const alg = 'HS256'
        // Sign JWT
        const signedUserInfo = await new jose.SignJWT(userData)
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setIssuer(args.userInfo ? "r" : "n")
            .setExpirationTime('6d')
            .sign(secret)

        // Set the token in Cookie
        cookie.set(
            conventions.cookie.userInfo,
            signedUserInfo,
            {
                ...getCookieConfig()
            }
        )

        // Return success
        return {
            status: true,
            message: "Userinfo Cookie set successfully",
            data: userData
        }

        //
    } catch (error: any) {
        console.log("ERROR WHILE SETTING USERINFO COOKIE", error);
        return {
            status: false,
            message: error.message
        }
    }
}

export default setUserInfoCookie