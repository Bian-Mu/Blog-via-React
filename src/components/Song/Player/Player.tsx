import React, { useState, useRef } from 'react';
import Lyrics from '../Lyrics/Lyrics';
import "./Player.css"
import Audio from '../Audio/Audio';
import { SongInfo } from '../../../store/modules/music';
import { useSelector } from 'react-redux';
interface LyricLine {
    time: number;
    text: string;
}

interface Song {
    pic: string;
    lyrics: LyricLine[];
    audio: string;
}


interface PlayerProps {
    song: Song;
}

const Player: React.FC<PlayerProps> = ({ song }) => {
    //当前播放时间（影响歌词高亮）
    const [currentTime, setCurrentTime] = useState(0);
    const { info } = useSelector((state: { music: { info: SongInfo } }) => state.music)
    const audioRef = useRef<HTMLAudioElement>(null);

    const TimeUpdate = () => {
        //时刻将当前状态传递给“currentTime”
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const jumpTo = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
        }
    };


    const box = document.getElementById("main-content-audio")
    box?.style.setProperty('--background-image-url', `url(${info.picUrl})`)


    return (
        <div id="main-content-audio" >
            <div id="visible">
                <div id="songInfo">
                    <div>《{info.name}》</div>
                    <img id="recordPic" src={song.pic} alt="pic" />
                    <div>{info.singer}    《{info.recordName}》</div>
                </div>

                <div id="lyrics">
                    <Lyrics lyrics={song.lyrics} currentTime={currentTime} onLineClick={jumpTo} />
                </div>
            </div>
            <Audio audioRef={audioRef} />
            <audio
                ref={audioRef}
                src={song.audio}
                onTimeUpdate={TimeUpdate}
                style={{ display: 'none' }}
            />
        </div>
    )
};

export default Player;