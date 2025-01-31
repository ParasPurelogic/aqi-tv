"use server"

import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import type { NextRequest } from 'next/server';
import { TypeAction, TypeUserInfo } from '@/types/misc';
import { conventions } from '@/config/misc';

interface Args {
    request?: NextRequest,
    token?: string
}

const authUser = async (args?: Args): Promise<TypeAction<TypeUserInfo>> => {

    // Cookie
    const cookie = await cookies();

    // Let token
    let token: string = "";

    try {
        // If request is passed in function
        if (args?.request) token = args.request.cookies.get(conventions.cookie.userInfo)?.value || "";
        // If token is passed in function
        else if (args?.token) token = args.token
        // Else
        else token = cookie.get(conventions.cookie.userInfo)?.value || ""

        // If no token found (empty)
        if (!token) {
            return {
                status: false,
                message: "failed"
            }
        };

        // Verify token - It will throw error if not verified
        const data: { payload: TypeUserInfo } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))

        // Extract Payload
        const payload: TypeUserInfo = data.payload;

        // return payload
        return {
            status: true,
            message: "success",
            data: payload
        }

    } catch (error: any) {
        // on verification failed
        return {
            status: false,
            message: "failed"
        };
    }
};

export default authUser;
