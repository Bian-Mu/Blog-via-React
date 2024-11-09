import { createSlice, PayloadAction } from "@reduxjs/toolkit"
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


interface MusicState {
    info: SongInfo;
    lyrics: string;
    pic: string;
    playlist: eachSong[];
    currentSongId: number | null;
    random: number;
    click: boolean;
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
    click: true,
    flac: ""
}

const musicStore = createSlice({
    name: "music",
    initialState: initialState,
    reducers: {
        setInfo(state, action: PayloadAction<SongInfo>) {
            state.info = action.payload;
        },
        setLyrics(state, action: PayloadAction<string>) {
            state.lyrics = action.payload;
        },
        setPic(state, action: PayloadAction<string>) {
            state.pic = action.payload;
        },
        setPlaylist(state, action: PayloadAction<eachSong[]>) {
            state.playlist = action.payload;
        },
        setCurrentSongId(state, action: PayloadAction<number | null>) {
            state.currentSongId = action.payload;
        },
        setRandom(state, action: PayloadAction<number>) {
            state.random = action.payload;
        },
        setClick(state) {
            state.click = !state.click;
        },
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
    setClick,
    setFlac
} = musicStore.actions

const musicReducer = musicStore.reducer

export default musicReducer