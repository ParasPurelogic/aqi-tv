import parseResponse from "../parseResponse"

type Args = {
    onFetching?: () => void
    onError?: (error: string) => void
    onSuccess?: (done: string) => void
    onFinally?: () => void
    options: {
        firstName: string
        lastName: string
        email: string
        password: string
        mobileNumber: string
    }
}

const signup = async (args: Args): Promise<string | undefined> => {
    try {
        // Run onFetching FN
        args?.onFetching?.();

        // Form Data
        const formData = new URLSearchParams();
        formData.append('firstname', args.options.firstName ?? "");
        formData.append('lastname', args.options.lastName ?? "");
        formData.append('email', args.options.email ?? "");
        formData.append('password', args.options.password ?? "");
        formData.append('phonenumber', args.options.mobileNumber ?? "");

        // API call body
        const requestBody = formData.toString();

        // Make API call
        const request = await fetch("https://airquality.aqi.in/api/v1/aqi-cloud-tv/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: requestBody,
            cache: "no-store"
        });

        // Convert the data
        const response = await parseResponse<{ status: 1 | 0, message?: string, data: { error?: string[] } }>(request);

        // If success received
        if (response.status == 1) {
            args?.onSuccess?.(response.message ?? "Signup successful");
            return response.message ?? "Signup successful";
        }

        // If error and email taken error
        throw new Error(response.data.error?.[0] ?? response?.message ?? "Something went wrong");

    } catch (error: any) {
        args?.onError?.(error.message)
    } finally {
        args?.onFinally?.();
    }
}

export default signup