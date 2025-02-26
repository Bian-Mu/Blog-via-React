interface SongInfo {
    name: string,
    singer: string,
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
    const songUrl = `https://blog.bianmu.link:6109/api/songInfo?songId=${songId}`;

    try {
        const response = await fetch(songUrl);
        const json = await response.json();
        const songInfo1 = json.songs[0].ar[0].name
        const songInfo2 = json.songs[0].al
        const info: SongInfo = {
            name: json.songs[0].name,
            singer: songInfo1,
            recordName: songInfo2.name,
            picUrl: songInfo2.picUrl
        }
        return info
    } catch (error) {
        console.log("Error fetching data: ", error);
    }
    return null
}

export async function songLyricsGet(songId: number): Promise<string | null> {
    const lyricsUrl = `https://blog.bianmu.link:6109/api/lyricsInfo?songId=${songId}`;

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

export async function songPicGet(picUrl: string): Promise<string | null> {
    const url = `https://blog.bianmu.link:6109/api/picInfo?picUrl=${picUrl}`;

    try {
        const response = await fetch(url);
        const imageBlob = await response.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);

        return imageObjectURL;
    } catch (error) {
        console.log("Error fetching data: ", error);
    }
    return null
}


export async function getPlaylist(): Promise<eachSong[]> {
    const url = `https://blog.bianmu.link:6109/api/playlist`
    const response = await fetch(url)
    const playlist = await response.json()
    return playlist
}