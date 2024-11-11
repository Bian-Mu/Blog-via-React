import { createSlice, PayloadAction } from "@reduxjs/toolkit"
export interface eachSong {
    id: number,
    name: string,
    singer: string,
    path: string
}
export interface SongInfo {
    name: string,
    singer: string,
    recordName: string,
    picUrl: string
}

export interface MusicState {
    info: SongInfo;
    lyrics: string;
    pic: string;
    playlist: eachSong[];
    currentSongId: number | null;
    random: number;
    flac: string;
}

const initialState: MusicState = {
    info: { name: "", singer: "", recordName: "", picUrl: "" },
    lyrics: "",
    pic: "",
    playlist: [{
        id: 426850306,
        name: "中了爱情一枪",
        singer: "许钧",
        path: "./music/中了爱情一枪.flac"
    }],
    currentSongId: null,
    random: 0,
    flac: ""
}

const musicStore = createSlice({
    name: "music",
    initialState: initialState,
    reducers: {
        //歌曲信息：歌名+歌手+专辑名+封面链接
        setInfo(state, action: PayloadAction<SongInfo>) {
            state.info = action.payload;
        },
        //歌词
        setLyrics(state, action: PayloadAction<string>) {
            state.lyrics = action.payload;
        },
        //专辑封面
        setPic(state, action: PayloadAction<string>) {
            state.pic = action.payload;
        },
        //后端歌单
        setPlaylist(state, action: PayloadAction<eachSong[]>) {
            state.playlist = action.payload;
        },
        //当前歌曲的id
        setCurrentSongId(state, action: PayloadAction<number | null>) {
            state.currentSongId = action.payload;
        },
        //设置随机索引
        setRandom(state, action: PayloadAction<number>) {
            state.random = action.payload;
        },
        //音频
        setFlac(state, action: PayloadAction<string>) {
            state.flac = action.payload;
        }
    }
})

export const {
    setInfo,
    setLyrics,
    setPic,
    setPlaylist,
    setCurrentSongId,
    setRandom,
    setFlac
} = musicStore.actions

const musicReducer = musicStore.reducer

export default musicReducer