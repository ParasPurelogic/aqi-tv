// Action
export type TypeAction<D = undefined> = {
    status: boolean
    message: string
    data?: D
}