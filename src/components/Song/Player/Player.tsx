import React, { useState, useRef } from 'react';
import Lyrics from '../Lyrics/Lyrics';
import "./Player.css"
import Audio from '../Audio/Audio';
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
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    const TimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const jumpTo = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
        }
    };
    return (
        <div id="main-content-audio">
            <div id="visible">
                <img id="recordPic" src={song.pic} alt="pic" />
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