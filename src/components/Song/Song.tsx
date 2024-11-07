import React from "react"

// 本功能使用网易云api

async function songInfoGet(songId: number) {
    const songUrl = `http://localhost:4000/api/songInfo?songId=${songId}`;

    try {
        const response = await fetch(songUrl);
        const json = await response.json();
        const songInfo = json.songs[0].al
        console.log(songInfo.name + songInfo.picUrl);
    } catch (error) {
        console.log("Error fetching data: ", error);
    }
}

async function songLyricsGet(songId: number) {
    const lyricsUrl = `http://localhost:4000/api/lyricsInfo?songId=${songId}`;

    try {
        const response = await fetch(lyricsUrl);
        const json = await response.json();
        const lyrics = json.lyric
        console.log(lyrics);

    } catch (error) {
        console.log("Error fetching data: ", error);
    }
}

function Song() {
    songInfoGet(426850306)
    songLyricsGet(426850306)
    return (
        <div>
            this is song
        </div>
    )
}

export default Song