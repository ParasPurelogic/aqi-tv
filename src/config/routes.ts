import { domainName } from "./misc";

export const routes = {
    // Home
    home: {
        id: "home",
        name: "Home",
        pathname: "/",
        url: domainName
    },
    // Login
    authLogin: {
        id: "authLogin",
        name: "Login",
        pathname: "/auth/login",
        url: `${domainName}/auth/login`
    },
    // Signup
    authSignup: {
        id: "authSignup",
        name: "Signup",
        pathname: "/auth/signup",
        url: `${domainName}/auth/signup`
    },
    // Playlist
    playlist: {
        id: "playlist",
        name: "Playlist",
        pathname: "/playlist",
        url: `${domainName}/playlist`
    },
    // Edit Playlist
    playlistEdit: {
        id: "playlistEdit",
        name: "Edit Playlist",
        pathname: "/playlist/edit",
        url: `${domainName}/playlist/edit`
    },
    // Add Playlist
    playlistAdd: {
        id: "playlistAdd",
        name: "Add Playlist",
        pathname: "/playlist/add",
        url: `${domainName}/playlist/add`
    },
    // my Account
    myAccount: {
        id: "myAccount",
        name: "My Account",
        pathname: "/my-account",
        url: `${domainName}/my-account`
    },
}