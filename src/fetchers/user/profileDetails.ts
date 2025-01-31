import parseResponse from "../parseResponse"
import { FNUserProfileDetails } from "../type"

type Args = {
    onFetching?: () => void
    onError?: (error: string) => void
    onSuccess?: (userInfo: FNUserProfileDetails) => void
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
    response: FNUserProfileDetails
}

const profileDetails = async (args: Args): Promise<FNUserProfileDetails | undefined> => {
    try {
        // Run onFetching FN
        args?.onFetching?.();

        // Prepare header
        const headers: API["request"]["headers"] = {
            authorization: `bearer ${args.options?.token ?? ""}`,
        }

        // Make API call to server
        const request = await fetch("https://airquality.aqi.in/api/v1/aqi-cloud-tv/profile", {
            headers: headers,
            cache: "no-store"
        });

        // Convert the data
        const response = await parseResponse<FNUserProfileDetails>(request)

        // If profile data received
        if (response.id != null) {
            // Return response
            args?.onSuccess?.(response)
            return response
        }
        // Else
        throw new Error("Invalid user")

    } catch (error: any) {
        args?.onError?.(error.message)
    } finally {
        args?.onFinally?.();
    }
}

export default profileDetails