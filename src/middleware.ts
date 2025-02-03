import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { routes } from './config/routes';
import { getCurrentTime } from './config/misc';
import getUserInfo from '@/utility/server/getUserInfo';

export async function middleware(request: NextRequest) {

    // Read the requested path name
    const pathName = request.nextUrl.pathname;

    // Log necessary headers
    console.log({
        ip: request?.headers?.get?.('x-forwarded-for') ?? request?.headers?.get?.("x-real-ip") ?? "N/A",
        url: request.url,
        referer: request.headers.get("Referer"),
        userAgent: request.headers.get("User-Agent"),
        time: getCurrentTime(),
    })

    // Authenticate user via access token cookie
    const userInfo = await getUserInfo();

    // Check if the requested path is a public path or not
    const isPublicPath = pathName.includes("/auth");

    // If user is authenticated and accessing a public path and request does not have a "next-action" header, redirect to "home" page
    if (isPublicPath && userInfo?.token && !request.headers.get("next-action")) {
        return NextResponse.redirect(new URL(routes.screens.url, request.url));
    }

    // If user is not authenticated and accessing a private path, redirect to "login" page
    if (!isPublicPath && !userInfo?.token) {
        return NextResponse.redirect(new URL(routes.authLogin.url, request.url));
    }
    // Have a response
    const response = NextResponse.next();

    // If no condition matches
    return response;
}

export const config = {
    matcher: '/((?!scripts|_next/static|media|_next/image|favicon.ico|favicons|robots.txt|sw.*\\.js|workbox-.*\\.js|manifest.json).*)',
};
