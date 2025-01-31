// Action
export type TypeAction<D = undefined> = {
    status: boolean
    message: string
    data?: D
}

// UserInfo
export type TypeUserInfo = {
    token?: string
    id?: number
    firstName?: string
    lastName?: string
    number?: string
    email?: string
    profileImg?: string
}