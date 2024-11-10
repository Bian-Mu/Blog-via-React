export async function getFlac(songId: number): Promise<string | null> {
    const flacUrl = `http://localhost:4000/api/flac?songId=${songId}`;
    try {
        const response = await fetch(flacUrl)
        const flabBlob = await response.blob()

        const flacObjectURL = URL.createObjectURL(flabBlob)
        return flacObjectURL
    }
    catch (error) {
        console.log("Error fetching data: ", error);
    }
    return null
}