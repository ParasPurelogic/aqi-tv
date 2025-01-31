import parseResponse from "../parseResponse"

type Args = {
    onFetching?: () => void
    onError?: (error: string) => void
    onSuccess?: (msg: string) => void
    onFinally?: () => void
    options: {
        email: string
    }
}

const resendOTP = async (args: Args): Promise<string | undefined> => {
    try {
        // Run onFetching FN
        args?.onFetching?.();

        // Prepare data for api call
        const formData = new URLSearchParams();
        formData.append('email', args.options.email);

        // API call body
        const requestBody = formData.toString();

        // Make API call
        const request = await fetch("https://airquality.aqi.in/api/v1/resend-otpemail", {
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
        throw new Error(response.message ?? response.msg ?? "Error while sending OTP.")

    } catch (error: any) {
        args?.onError?.(error.message)
    } finally {
        args?.onFinally?.();
    }
}

export default resendOTP