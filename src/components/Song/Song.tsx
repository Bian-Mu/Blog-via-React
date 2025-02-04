import { useQuery } from "react-query";
import React from "react"
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
    setFlac
} from "../../store/modules/music"
import { useDispatch, useSelector } from "react-redux";
import { SongInfo, MusicState } from "../../store/modules/music";
import Player, { Music } from "./Player/Player";
import { parseLyrics } from "./utils/parseLyrics/parseLyrics"


function Song() {

    const dispatch = useDispatch();
    const {
        lyrics,
        pic,
        playlist,
        flac
    } = useSelector((state: {
        music: MusicState
    }) => state.music)

    //1.获得歌单
    useQuery([],
        async () => {
            const list = await getPlaylist();
            return list;
        },
        {
            initialData: [],
            onSuccess(data) {
                dispatch(setPlaylist(data))
            }
        }
    )


    // 定义回调函数处理点击事件和数据加载
    const handleSongChange = async () => {

        const newRandomIndex = randomPlay(playlist.length);
        dispatch(setRandom(newRandomIndex));

        const newSongId = playlist[newRandomIndex].id;
        dispatch(setCurrentSongId(newSongId));

        if (newSongId !== null) {
            const songInfo = await songInfoGet(newSongId);
            const songLyrics = await songLyricsGet(newSongId);
            const songPic = await songPicGet(songInfo?.picUrl as string);
            const songFlac = await getFlac(newSongId);

            dispatch(setInfo(songInfo as SongInfo))
            dispatch(setLyrics(songLyrics as string))
            dispatch(setPic(songPic as string))
            dispatch(setFlac(songFlac as string))
        }
    };


    const song: Music = {
        pic: pic ? pic : "",
        lyrics: lyrics ? parseLyrics(lyrics) : [],
        audio: flac ? flac : "",
        handleNextSong: handleSongChange
    }

    return (
        <>
            <Player song={song} />
        </>
    )
}

export default Song