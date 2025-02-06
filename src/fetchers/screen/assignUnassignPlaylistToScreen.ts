import parseResponse from "../parseResponse"

type Args = {
    onFetching?: () => void
    onError?: (error: string) => void
    onSuccess?: (msg: string) => void
    onFinally?: () => void
    options: {
        token: string
        userId: number
        playlistId: number
        screenId: number
        actions: "assign" | "unassign"
    }
}

const assignUnassignPlaylistToScreen = async (args: Args): Promise<string | undefined> => {
    try {
        // Run onFetching FN
        args?.onFetching?.();

        // Form Data
        const formData = new URLSearchParams();
        formData.append('user_id', String(args?.options?.userId));
        formData.append('playlist_id', String(args?.options?.playlistId));
        formData.append('screen_id', String(args?.options?.screenId));
        formData.append('type', args?.options?.actions == "assign" ? "1" : "2");

        // Make API call to server
        const request = await fetch("https://airquality.aqi.in/api/v1/aqi-cloud-tv/AssignOrDeassignPlaylistToTvScreen", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                authorization: `bearer ${args?.options?.token}`
            },
            body: formData.toString(),
            cache: "no-store"
        });

        // Convert the data
        const response = await parseResponse<{
            status: number
            message: string
        }>(request)

        // If error
        if (response.status == 0) {
            throw new Error(response.message)
        }

        // Return response
        args?.onSuccess?.(response.message)
        return response.message

        //
    } catch (error: any) {
        args?.onError?.(error.message)
    } finally {
        args?.onFinally?.();
    }
}

export default assignUnassignPlaylistToScreen