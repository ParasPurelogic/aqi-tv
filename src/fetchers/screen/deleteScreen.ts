import parseResponse from "../parseResponse"
import { FNGetAllScreens } from "../type"
import getAllScreens from "./getAllScreens"

type Args = {
    onFetching?: () => void
    onError?: (error: string) => void
    onSuccess?: (screens: FNGetAllScreens) => void
    onFinally?: () => void
    options: {
        token: string
        serialNumbers: string[]
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

const deleteScreens = async (args: Args): Promise<FNGetAllScreens | undefined> => {
    try {
        // Run onFetching FN
        args?.onFetching?.();

        // make API calls
        await Promise.all(args.options.serialNumbers.map(async serialNo => {
            // Prepare form data
            const formData = new URLSearchParams();
            formData.append("serialNo", serialNo);
            formData.append("user_id", String(args?.options?.userId));
            // Make API call
            const request = await fetch("https://airquality.aqi.in/api/v1/aqi-cloud-tv/RemoveTvScreen", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    authorization: `bearer ${args?.options?.token}`,
                },
                body: formData.toString(),
                cache: "no-store",
            });
            // Decode response
            const response = await parseResponse<API["response"]>(request);
            // Throw error if received
            if (response.status == 0) {
                throw new Error(response.message ?? `Error for serial ${serialNo}: ${response.message}`);
            }

            // Return success
            return response;
        }))

        // Get All Screens
        const allScreens = (await getAllScreens({
            options: {
                token: args.options.token
            }
        })) ?? []

        // Return response
        args?.onSuccess?.(allScreens)
        return allScreens

        //
    } catch (error: any) {
        args?.onError?.(error.message)
    } finally {
        args?.onFinally?.();
    }
}

export default deleteScreens