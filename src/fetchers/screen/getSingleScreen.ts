import { FNGetSingleScreen } from "../type"
import getAllPlaylist from "./getAllPlaylist"
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

        // Fetch screens and playlists
        const [screens, playlists] = await Promise.all([
            // Fetch all screens
            getAllScreens({
                options: {
                    token: args.options.token ?? ""
                },
                onError: err => {
                    throw new Error(err);
                }
            }),
            // Fetch all playlists
            getAllPlaylist({
                options: {
                    token: args.options.token ?? ""
                },
                onError: err => {
                    throw new Error(err);
                }
            })
        ]);

        // Find the requested screen
        const screen = screens?.find(s => s.id == args.options.screenId);

        // If screen not found, throw error
        if (!screen?.id) {
            throw new Error("Invalid screen ID provided");
        }

        // Info
        const info: FNGetSingleScreen = {
            ...screen,
            playlists: playlists
                ? [...playlists].sort((a, b) => {
                    const aAssigned = a?.assign_tvscreens?.some((s) => s?.screen_id === screen.id) ? 1 : 0;
                    const bAssigned = b?.assign_tvscreens?.some((s) => s?.screen_id === screen.id) ? 1 : 0;
                    return bAssigned - aAssigned; // Sorts with assigned playlists first
                })
                : [],
        };

        // Return response
        args?.onSuccess?.(info);
        return info;

    } catch (error: any) {
        args?.onError?.(error.message);
    } finally {
        args?.onFinally?.();
    }
};
export default getSingleScreen