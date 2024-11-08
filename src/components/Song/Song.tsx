import React, { useEffect } from "react"
import { songInfoGet, songLyricsGet, songPicGet } from "./lyrics_pics/LyricsPics"
import { useState } from "react";
import { useQuery } from "react-query";


interface SongInfo {
    recordName: string,
    picUrl: string
}
function Song() {
    const [info, setInfo] = useState<SongInfo>({ recordName: "", picUrl: "" })
    const [lyrics, setLyrics] = useState<string>("")
    const [pic, setPic] = useState<string>("")
    let songId = 426850306;


    const { data: isGetInfo } = useQuery([songId],
        async () => {
            const songInfo = await songInfoGet(songId);
            const songLyrics = await songLyricsGet(songId);

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
    return (
        <div>
            {info.recordName}
            <hr />
            {info.picUrl}
            <img src={pic} />
            <hr />
            {lyrics}
        </div>
    )
}

export default Song