import parseResponse from "../parseResponse"
import { FNGetAllScreens } from "../type"

type Args = {
    onFetching?: () => void
    onError?: (error: string) => void
    onSuccess?: (userInfo: FNGetAllScreens) => void
    onFinally?: () => void
    options: {
        token: string
    }
}

type API = {
    request: {
        headers: {
            authorization: `bearer ${string}`
        }
    }
    response: {
        status: number
        message: string
        data?: FNGetAllScreens
    }
}

const getAllScreens = async (args: Args): Promise<FNGetAllScreens | undefined> => {
    try {
        // Run onFetching FN
        args?.onFetching?.();

        // Prepare header
        const headers: API["request"]["headers"] = {
            authorization: `bearer ${args.options?.token ?? ""}`,
        }

        // Make API call to server
        const request = await fetch("https://airquality.aqi.in/api/v1/aqi-cloud-tv/GetAllTvScreenList", {
            headers: headers,
            cache: "no-store"
        });

        // Convert the data
        const response = await parseResponse<API["response"]>(request)

        // If  data received
        if (response.data != null) {
            // Return response
            args?.onSuccess?.(response.data)
            return response.data
        }
        // Else
        throw new Error(response.message)

    } catch (error: any) {
        args?.onError?.(error.message)
    } finally {
        args?.onFinally?.();
    }
}

export default getAllScreens