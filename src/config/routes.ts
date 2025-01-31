import { domainName } from "./misc";

export const routes = {
    home: {
        id: "home",
        name: "Home",
        pathname: "/",
        url: domainName
    },
    authLogin: {
        id: "authLogin",
        name: "Login",
        pathname: "/auth/login",
        url: `${domainName}/auth/login`
    },
    authSignup: {
        id: "authSignup",
        name: "Signup",
        pathname: "/auth/signup",
        url: `${domainName}/auth/signup`
    }
}