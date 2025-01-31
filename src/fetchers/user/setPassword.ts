import parseResponse from "../parseResponse"

type Args = {
    onFetching?: () => void
    onError?: (error: string) => void
    onSuccess?: (msg: string) => void
    onFinally?: () => void
    options: {
        email: string
        password: string
    }
}

const setPassword = async (args: Args): Promise<string | undefined> => {
    try {
        // Run onFetching FN
        args?.onFetching?.();

        // Set formData
        const formData = new URLSearchParams();
        formData.append('email', args.options.email);
        formData.append('password', args.options.password);

        // API call body
        const requestBody = formData.toString();

        // Make API call
        const request = await fetch("https://airquality.aqi.in/api/v1/SetUserNewPassword", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: requestBody,
            cache: "no-store"
        });

        // Convert the data
        const response = await parseResponse<{ status: 0 | 1, message: string, msg: string }>(request)

        // If success
        if (response.status == 1) {
            args?.onSuccess?.(response.message)
            return response.message
        }

        // Else
        throw new Error(response.message ?? response.msg ?? "Error while resetting password.")

    } catch (error: any) {
        args?.onError?.(error.message)
    } finally {
        args?.onFinally?.();
    }
}

export default setPassword