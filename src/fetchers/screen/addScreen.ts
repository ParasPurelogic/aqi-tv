import parseResponse from "../parseResponse"
import { FNGetAllScreens } from "../type"

type Args = {
    onFetching?: () => void
    onError?: (error: string) => void
    onSuccess?: (screens: FNGetAllScreens) => void
    onFinally?: () => void
    options: {
        token: string
        screenName: string
        screenSerialNo: string
        userId: number
    }
}

type API = {
    response: {
        status: number
        message: string
        data?: FNGetAllScreens
    }
}

const addScreen = async (args: Args): Promise<FNGetAllScreens | undefined> => {
    try {
        // Run onFetching FN
        args?.onFetching?.();

        // Form Data
        const formData = new URLSearchParams();
        formData.append('ScreenName', args?.options?.screenName);
        formData.append('serialNo', args?.options?.screenSerialNo);
        formData.append('user_id', String(args?.options?.userId));

        // Make API call to server
        const request = await fetch("https://airquality.aqi.in/api/v1/aqi-cloud-tv/AddTvScreen", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                authorization: `bearer ${args?.options?.token}`
            },
            body: formData.toString(),
            cache: "no-store"
        });

        // Convert the data
        const response = await parseResponse<API["response"]>(request)

        // If  data received
        if (response.data != null) {
            // Return response
            args?.onSuccess?.(response?.data?.reverse())
            return response?.data?.reverse()
        }
        // Else
        throw new Error(response.message)

    } catch (error: any) {
        args?.onError?.(error.message)
    } finally {
        args?.onFinally?.();
    }
}

export default addScreen