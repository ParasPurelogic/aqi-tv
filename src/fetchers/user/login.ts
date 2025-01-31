import parseResponse from "../parseResponse"
import { FNUserLogin } from "../type"

type Args = {
    onFetching?: () => void
    onError?: (error: string) => void
    onSuccess?: (done: FNUserLogin) => void
    onFinally?: () => void
    options: {
        email: string
        password: string
    }
}

// Response
type ApiResponse = FNUserLogin & {
    error: string
}

const login = async (args: Args): Promise<FNUserLogin | undefined> => {
    try {
        // Run onFetching FN
        args?.onFetching?.();

        // Form Data
        const formData = new URLSearchParams();
        formData.append('email', args?.options?.email || "");
        formData.append('password', args?.options?.password || "");

        // Make API call to server
        const request = await fetch("https://airquality.aqi.in/api/v1/aqi-cloud-tv/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString(),
            cache: "no-store"
        });

        // Convert the data
        const response = await parseResponse<ApiResponse>(request)

        // If error received
        if (response.error) {
            throw new Error(response.error ?? "Email or Password is incorrect")
        }

        // if data received
        args?.onSuccess?.(response)
        return response

    } catch (error: any) {
        args?.onError?.(error.message)
    } finally {
        args?.onFinally?.();
    }
}

export default login