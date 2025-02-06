const parseResponse = async <T>(argResponse: Response): Promise<T> => {
    try {
        return argResponse.json() as T;
    } catch {
        const responseText = await argResponse.text();
        const titleMatch = responseText.match(/<title>(.*?)<\/title>/);
        throw new Error(titleMatch ? titleMatch[1] : "Error while fetching data");
    }
}

export default parseResponse;
