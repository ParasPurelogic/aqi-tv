import parseResponse from "../parseResponse"
import { FNGetSingleScreen } from "../type"
import getAllScreens from "./getAllScreens"

type Args = {
    onFetching?: () => void
    onError?: (error: string) => void
    onSuccess?: (info: FNGetSingleScreen) => void
    onFinally?: () => void
    options: {
        token: string
        screenId: number
    }
}

const getSingleScreen = async (args: Args): Promise<FNGetSingleScreen | undefined> => {
    try {
        // Run onFetching FN
        args?.onFetching?.();

        // Get asked screen
        const screen = (await getAllScreens({
            options: {
                token: args.options.token ?? ""
            },
            onError: err => {
                throw new Error(err)
            }
        }))?.find(s => s.id == args.options.screenId);

        // If screen not found, throw error
        if (!screen?.id) {
            throw new Error("Invalid screen ID provided")
        }

        // Get Playlists
        const request = await fetch("https://airquality.aqi.in/api/v1/aqi-cloud-tv/GetSingleTvPlaylist", {
            headers: {
                authorization: `bearer ${args.options?.token ?? ""}`,
                id: String(args.options.screenId)
            },
            cache: "no-store"
        });

        // Convert the data
        const response = await parseResponse<{
            status: number
            message: string
            data?: FNGetSingleScreen["playlists"]
        }>(request);

        // Info
        const info: FNGetSingleScreen = {
            ...screen,
            playlists: response.data ?? []
        }

        // Return response
        args?.onSuccess?.(info)
        return info

    } catch (error: any) {
        args?.onError?.(error.message)
    } finally {
        args?.onFinally?.();
    }
}

export default getSingleScreen