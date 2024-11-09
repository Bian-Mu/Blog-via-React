import React, { useState, useRef } from 'react';
import Lyrics from '../Lyrics/Lyrics';

interface LyricLine {
    time: number;
    text: string;
}

interface Song {
    cover: string;
    lyrics: LyricLine[];
    audio: string;
}


interface PlayerProps {
    song: Song;
}

const Player: React.FC<PlayerProps> = ({ song }) => {
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handleTimeUpdate = () => {
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
        <div style={{ display: 'flex', width: '100%' }}>
            <div style={{ width: '40%' }}>
                <img src={song.cover} alt="cover" style={{ width: '100%' }} />
            </div>
            <div style={{ width: '60%', display: 'flex', flexDirection: 'column' }}>
                <Lyrics lyrics={song.lyrics} currentTime={currentTime} onLineClick={jumpTo} />
                <audio
                    ref={audioRef}
                    src={song.audio}
                    controls
                    onTimeUpdate={handleTimeUpdate}
                    style={{ width: '100%', height: '30%' }}
                />
            </div>
        </div>
    );
};

export default Player;