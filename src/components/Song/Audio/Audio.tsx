import React from "react";
import { useEffect, useState } from "react";
import formatTime from "../utils/formatTime/formatTime";
import "./Audio.css"
interface AudioControlsProps {
    audioRef: React.RefObject<HTMLAudioElement>;
    handleNextSong: () => void
}

const Audio: React.FC<AudioControlsProps> = ({ audioRef, handleNextSong }) => {
    //进度条
    const [progress, setProgress] = useState(0);
    //当前播放状态
    const [isPlaying, setIsPlaying] = useState(false);
    //当前播放时间（用于span）
    const [currentTime, setCurrentTime] = useState(0);
    //总时长
    const [duration, setDuration] = useState(0);
    //用于初始化第一首歌
    useEffect(() => {
        handleNextSong()
    }, [])

    //切换歌曲状态
    const togglePlayPause = () => {
        if (audioRef.current) {
            isPlaying ? audioRef.current.pause() : audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    //点击进度条
    const changeProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newProgress = parseFloat(e.target.value);
        setProgress(newProgress ? newProgress : 0);
        if (audioRef.current) {
            audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
        }
    };

    //切歌
    const nextSong = () => {
        setProgress(0);
        setCurrentTime(0);
        setIsPlaying(false);
        handleNextSong();
    };

    //歌曲切换时重新渲染各种状态
    useEffect(() => {
        const handleLoadedMetadata = () => {
            if (audioRef.current) {
                setDuration(audioRef.current.duration);
                setCurrentTime(audioRef.current.currentTime);
                setProgress(0);
            }
        };
        const handleTimeUpdate = () => {
            if (audioRef.current) {
                setCurrentTime(audioRef.current.currentTime);
                setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
            }
        };

        const audio = audioRef.current;
        if (audio) {
            audio.addEventListener('loadedmetadata', handleLoadedMetadata);
            audio.addEventListener('timeupdate', handleTimeUpdate);
        }
        return () => {
            if (audio) {
                audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
                audio.removeEventListener('timeupdate', handleTimeUpdate);
            }
        };
    }, [audioRef]);



    return (
        <div id="playerProgress" >
            <div id="progress" >
                <span>{formatTime(currentTime)}</span>
                <input id="progressInput"
                    type="range"
                    min="0"
                    max="100"
                    value={progress.toString()}
                    onChange={changeProgress}
                />
                <span>{formatTime(duration)}</span>
            </div>

            <button id="progressPlayButton"
                onClick={togglePlayPause}>
                {isPlaying ? '| |' : '▶'}
            </button>
            <button id="progressNextSongButton"
                onClick={nextSong}>
                ⌆
            </button>
        </div>
    );
};

export default Audio;