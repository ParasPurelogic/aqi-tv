import { TypeSlide } from "@/types/misc"

// FNGetAllPlaylist
export type FNGetAllPlaylist = Partial<{
    id: number
    user_id: number
    name: string
    slides_json: TypeSlide[]
    created_at: string
    updated_at: string
    assign_tvscreens: Partial<{
        screen_serialNo: string
        screen_id: number
        screen_name: string
    }>[]
}>[]

// FNGetSingleScreen
export type FNGetSingleScreen = Partial<FNGetAllScreens[0] & {
    playlists: FNGetAllPlaylist
}>

// FNGetAllScreens
export type FNGetAllScreens = Partial<
    {
        id: number
        user_id: number
        serialNo: string
        ScreenName: string
        created_at: string
        updated_at: string
        isOnline: 0 | 1
    }
>[]

// FNUserProfileDetails
export type FNUserProfileDetails = {
    id: number
    firstname?: string
    lastname?: string
    organization?: string
    phonenumber?: string
    email: string
    profile_pic?: string
    account_type: number
    license_type: number
    location?: string
    city?: string
    city_id?: number
    state?: string
    state_id?: number
    country?: string
    country_id?: number
    pincode?: string
}

// FNUserLogin
export type FNUserLogin = Partial<{
    token: string
    token_type: string
    token_validity: number
    user: Partial<{
        id: number
        firstname: string
        lastname: string
        organization: any
        phonenumber: string
        email: string
        profile_pic: any
        account_type: number
    }>
}>