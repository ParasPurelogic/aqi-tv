import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { routes } from './config/routes';
import { domainName, getCurrentTime } from './config/misc';

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
    let userAuth = getUserInfo();

    // Check if the requested path is a public path or not
    const isPublicPath = CheckIfPathIsPublicPath(pathName);

    // If user is authenticated and accessing a public path and request does not have a "next-action" header, redirect to "dashboard" page
    if (isPublicPath && userAuth?.token && !request.headers.get("next-action")) {
        return NextResponse.redirect(new URL(routes.dashboard.parent.url, request.url));
    }

    // If user is not authenticated and accessing a private path, redirect to "login" page
    if (!isPublicPath && !userAuth?.token) {
        // Encode the requested path
        const requestedPath = `${domainName}${pathName}`;
        // Redirect to login page with search parameters
        const redirectTo = `${routes.auth.login.url}?${conventions.routes.loginParam}=${encodeURIComponent(requestedPath)}`;
        // Redirect to login page
        return NextResponse.redirect(new URL(redirectTo, request.url));
    }

    // If user has a passkey, and pathname is not /checkout or /auth, redirect to /personalized
    if (
        userAuth?.passKey &&
        !pathName.includes(routes.personalized.parent.pathName) &&
        !pathName?.endsWith(routes.checkout.parent.pathName) &&
        !pathName?.endsWith(routes.auth.parent.pathName)

    ) {
        // Redirect to personalized path
        return NextResponse.redirect(new URL(routes.personalized[userAuth.passKey].url, request.url));
    }

    // If user doesn't have passKey but trying to access the /personalized
    if (
        !userAuth?.passKey &&
        pathName.includes(routes.personalized.parent.pathName + "/")
    ) {
        console.log({ sa: true })
        // Redirect to dashboard
        return NextResponse.redirect(new URL(routes.dashboard.parent.url, request.url));
    }

    // Have a response
    const response = NextResponse.next();

    // If no condition matches
    return response;
}

export const config = {
    matcher: '/((?!scripts|_next/static|media|_next/image|favicon.ico|favicons|robots.txt|sw.*\\.js|workbox-.*\\.js|manifest.json).*)',
};
