import { useState } from "react";
import { useQuery } from "react-query";
import React, { useEffect } from "react"
import { songInfoGet, songLyricsGet, songPicGet, getPlaylist } from "./utils/lyrics_pics/LyricsPics"
import { getFlac } from "./utils/flacs/flacs";
import { randomPlay } from "./utils/randomPlay/randomPlay";



import Player from "./Player/Player";
import { parseLyrics } from "./Lyrics/convert"

interface eachSong {
    id: number,
    name: string,
    singer: string,
    path: string
}
interface SongInfo {
    name: string,
    singer: string,
    recordName: string,
    picUrl: string
}
interface LyricLine {
    time: number;
    text: string;
}
interface Song {
    cover: string;
    lyrics: LyricLine[];
    audio: string;
}

function Song() {
    //歌曲信息：歌名+歌手+专辑名+封面链接
    const [info, setInfo] = useState<SongInfo>({ name: "", singer: "", recordName: "", picUrl: "" })
    //歌词
    const [lyrics, setLyrics] = useState<string>("")
    //专辑封面
    const [pic, setPic] = useState<string>("")
    //后端歌单
    const [playlist, setPlaylist] = useState<eachSong[]>([{
        id: 426850306,
        name: "中了爱情一枪",
        singer: "许钧",
        path: "./music/中了爱情一枪.flac"
    }])
    //当前歌曲的id
    const [currentSongId, setCurrentSongId] = useState<number | null>(null);
    //设置随机索引
    const [random, setRandom] = useState<number>(0);
    //切歌
    const [click, setClick] = useState<boolean>(true)
    //音频
    const [flac, setFlac] = useState<string>("")


    //1.获得歌单
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

    //2.切歌
    useEffect(() => {
        setRandom(randomPlay(playlist.length))
        setCurrentSongId(playlist[random].id)
    }, [click])

    //3.获取歌曲所有信息
    const { data: isGetInfo } = useQuery([currentSongId],
        async () => {
            if (currentSongId === null) { return null };
            const songInfo = await songInfoGet(currentSongId);
            const songLyrics = await songLyricsGet(currentSongId);
            const songPic = await songPicGet(songInfo?.picUrl as string);
            const songFlac = await getFlac(currentSongId)
            return [songInfo, songLyrics, songPic, songFlac];
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
            setFlac(isGetInfo[3] as string)
        }
    }, [isGetInfo])

    const song: Song = {
        cover: pic,
        lyrics: parseLyrics(lyrics),
        audio: flac
    }

    return (
        <>
            <Player song={song} />
            {/* <div>
                {info.name}
                <br />
                {info.singer}
                <br />
                {info.recordName}
                <hr />
                <img src={pic} alt={info.name} />
                <hr />
                {lyrics}
                <hr />
            </div>
            <audio controls src={flac}></audio> */}
            <button onClick={() => { setClick(!click) }}>
                切歌
            </button>
        </>
    )
}

export default Song