interface SongInfo {
    recordName: string,
    picUrl: string
}
interface eachSong {
    id: number,
    name: string,
    singer: string,
    path: string
}
// 本功能使用网易云api

export async function songInfoGet(songId: number): Promise<SongInfo | null> {
    const songUrl = `http://localhost:4000/api/songInfo?songId=${songId}`;

    try {
        const response = await fetch(songUrl);
        const json = await response.json();
        const songInfo = json.songs[0].al
        const info: SongInfo = {
            recordName: songInfo.name,
            picUrl: songInfo.picUrl
        }
        return info
    } catch (error) {
        console.log("Error fetching data: ", error);
    }
    return null
}

export async function songLyricsGet(songId: number): Promise<string | null> {
    const lyricsUrl = `http://localhost:4000/api/lyricsInfo?songId=${songId}`;

    try {
        const response = await fetch(lyricsUrl);
        const json = await response.json();
        const lyrics = json.lyric
        return lyrics;

    } catch (error) {
        console.log("Error fetching data: ", error);
    }
    return null
}

export async function songPicGet(picUrl: string) {
    const url = `http://localhost:4000/api/picInfo?picUrl=${picUrl}`;

    try {
        const response = await fetch(url);
        const imageBlob = await response.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);

        return imageObjectURL;
    } catch (error) {
        console.log("Error fetching data: ", error);
    }
}


export async function getPlaylist(): Promise<eachSong[]> {
    const url = `http://localhost:4000/api/playlist`
    const response = await fetch(url)
    const playlist = await response.json()
    return playlist
}