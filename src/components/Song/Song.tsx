import { useQuery } from "react-query";
import React, { useEffect } from "react"
import { songInfoGet, songLyricsGet, songPicGet, getPlaylist } from "./utils/lyrics_pics/LyricsPics"
import { getFlac } from "./utils/flacs/flacs";
import { randomPlay } from "./utils/randomPlay/randomPlay";
import {
    setInfo,
    setLyrics,
    setPic,
    setPlaylist,
    setCurrentSongId,
    setRandom,
    setClick,
    setFlac
} from "../../store/modules/music"
import { useDispatch, useSelector } from "react-redux";
import { SongInfo, MusicState } from "../../store/modules/music";
import Player from "./Player/Player";
import { parseLyrics } from "./Lyrics/convert"

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

    const dispatch = useDispatch();
    const {
        info,
        lyrics,
        pic,
        playlist,
        currentSongId,
        random,
        click,
        flac
    } = useSelector((state: {
        music: MusicState
    }) => state.music)

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
            dispatch(setPlaylist(isGetPlaylist))
        }
    }, [isGetPlaylist, dispatch])

    //2.切歌
    useEffect(() => {
        dispatch(setRandom(randomPlay(playlist.length)))
        dispatch(setCurrentSongId(playlist[random].id))
    }, [click, dispatch])

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
            dispatch(setInfo(isGetInfo[0] as SongInfo))
            dispatch(setLyrics(isGetInfo[1] as string))
            dispatch(setPic(isGetInfo[2] as string))
            dispatch(setFlac(isGetInfo[3] as string))
        }
    }, [isGetInfo, dispatch])

    const song: Song = {
        cover: pic,
        lyrics: parseLyrics(lyrics),
        audio: flac
    }

    return (
        <>
            <Player song={song} />
            <button onClick={() => { dispatch(setClick(click)) }}>
                切歌
            </button>
        </>
    )
}

export default Song