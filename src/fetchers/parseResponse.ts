const parseResponse = async <T>(argResponse: Response): Promise<T> => {
    const responseText = await argResponse.text();
    try {
        return JSON.parse(responseText) as T;
    } catch {
        const titleMatch = responseText.match(/<title>(.*?)<\/title>/);
        throw new Error(titleMatch ? titleMatch[1] : "Error while fetching data");
    }
}

export default parseResponse;
