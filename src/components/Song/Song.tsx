import React, { useEffect } from "react"
import { songInfoGet, songLyricsGet, songPicGet, getPlaylist } from "./lyrics_pics/LyricsPics"
import { useState } from "react";
import { useQuery } from "react-query";
import { randomPlay } from "./randomPlay/randomPlay";

interface eachSong {
    id: number,
    name: string,
    singer: string,
    path: string
}
interface SongInfo {
    recordName: string,
    picUrl: string
}


function Song() {
    const [info, setInfo] = useState<SongInfo>({ recordName: "", picUrl: "" })
    const [lyrics, setLyrics] = useState<string>("")
    const [pic, setPic] = useState<string>("")
    const [playlist, setPlaylist] = useState<eachSong[]>([])

    const { data: isGetPlaylist } = useQuery([],
        async () => {
            const list = await getPlaylist();
            return list;
        },
        {
            initialData: []
        }
    )
    useEffect(() => {
        if (isGetPlaylist) {
            setPlaylist(isGetPlaylist)
        }
    }, [isGetPlaylist])

    let currentSongId = 426850306
    let random = 0
    const { data: isGetInfo } = useQuery([currentSongId],
        async () => {
            const songInfo = await songInfoGet(currentSongId);
            const songLyrics = await songLyricsGet(currentSongId);
            const songPic = await songPicGet(songInfo?.picUrl as string);
            return [songInfo, songLyrics, songPic];
        },
        {
            initialData: null
        }
    )
    useEffect(() => {
        if (isGetInfo !== null && typeof isGetInfo !== "undefined") {
            setInfo(isGetInfo[0] as SongInfo)
            setLyrics(isGetInfo[1] as string)
            setPic(isGetInfo[2] as string)
        }
    }, [isGetInfo])
    if (playlist.length !== 0) {
        random = randomPlay(playlist.length)
        currentSongId = playlist[random].id;
        return (
            <div>
                {info.recordName}
                <hr />
                {info.picUrl}
                {/* <img src={pic} /> */}
                <hr />
                {lyrics}
                <hr />
                {playlist && playlist[random].name}
            </div>
        )
    }
    return (
        <div>isloading</div>
    )
}

export default Song