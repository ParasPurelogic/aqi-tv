import { TypeSlide } from "@/types/misc"
import parseResponse from "../parseResponse"
import { FNGetAllPlaylist } from "../type"
import getAllPlaylist from "./getAllPlaylist"

type Args = {
    onFetching?: () => void
    onError?: (error: string) => void
    onSuccess?: (playlist?: FNGetAllPlaylist[0]) => void
    onFinally?: () => void
    options: {
        token: string
        userId: number
        playlistName: string
        playlistId?: number
        slides: TypeSlide[]
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
    }
}

const createUpdatePlaylist = async (args: Args): Promise<FNGetAllPlaylist[0] | undefined> => {
    try {
        // Run onFetching FN
        args?.onFetching?.();

        // Form Data
        const formData = new URLSearchParams();
        formData.append('user_id', String(args?.options?.userId));
        formData.append('name', String(args?.options?.playlistName));
        formData.append('slides_json', JSON.stringify(args.options.slides));

        if (args.options.playlistId) {
            formData.append('id', String(args?.options?.playlistId));
        }

        // Make API call to server
        const request = await fetch(args.options.playlistId ? "https://airquality.aqi.in/api/v1/aqi-cloud-tv/UpdatePlaylistForTvScreen" : "https://airquality.aqi.in/api/v1/aqi-cloud-tv/CreatePlaylistForTvScreen", {
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

        // If error
        if (response.status == 0) {
            throw new Error(response.message)
        }

        // Payload
        const playlist: FNGetAllPlaylist[0] | undefined = (await getAllPlaylist({
            options: {
                token: args.options.token
            }
        }))?.find(p => p?.name?.toLowerCase() == args?.options?.playlistName?.toLowerCase())

        // Return response
        args?.onSuccess?.(playlist)
        return playlist

    } catch (error: any) {
        args?.onError?.(error.message)
    } finally {
        args?.onFinally?.();
    }
}

export default createUpdatePlaylist