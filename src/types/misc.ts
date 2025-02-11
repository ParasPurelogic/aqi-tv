// Slide
export type TypeSlide = Partial<
    {
        slide_no: number
        slide_name: string
        widgets: TypeWidget[]
    }
>

// Widget
export type TypeWidget = Partial<{
    widget_id: number
    widget_name: string
    previewIcon: string
    previewScreen: string
}>

// Action
export type TypeAction<D = undefined> = {
    status: boolean
    message: string
    data?: D
}

// UserInfo
export type TypeUserInfo = Partial<{
    token: string
    id: number
    firstName: string
    lastName: string
    number: string
    email: string
    profileImg: string
}>

