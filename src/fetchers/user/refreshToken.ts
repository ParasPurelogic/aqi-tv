import parseResponse from "../parseResponse"
import { FNUserLogin } from "../type"

type Args = {
    onFetching?: () => void
    onError?: (error: string) => void
    onSuccess?: (newToken: string) => void
    onFinally?: () => void
    options: {
        token: string
    }
}

const refreshToken = async (args: Args): Promise<string | undefined> => {
    try {
        // Run onFetching FN
        args?.onFetching?.();

        // Make API call
        const request = await fetch("https://airquality.aqi.in/api/v1/aqi-cloud-tv/refresh", {
            method: "POST",
            headers: {
                authorization: `bearer ${args.options?.token ?? ""}`,
            },
            cache: "no-store"
        });

        // Convert the data
        const response = await parseResponse<{ token: string }>(request)

        // If success
        if (response.token) {
            args?.onSuccess?.(response.token)
            return response.token
        }

        // Else
        throw new Error("Unable to refresh user session")

    } catch (error: any) {
        args?.onError?.(error.message)
    } finally {
        args?.onFinally?.();
    }
}

export default refreshToken