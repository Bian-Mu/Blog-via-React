import React from "react";
import { useEffect, useState } from "react";
import { setClick } from "../../../store/modules/music";
import { useDispatch, useSelector } from "react-redux";
import formatTime from "../utils/formatTime/formatTime";
import "./Audio.css"
interface AudioControlsProps {
    audioRef: React.RefObject<HTMLAudioElement>;
}

const Audio: React.FC<AudioControlsProps> = ({ audioRef }) => {
    const [progress, setProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const dispatch = useDispatch();
    const { click } = useSelector((state: { music: { click: boolean } }) => state.music);

    const handleTimeUpdate = () => {
        if (audioRef.current && audioRef.current.duration > 0) {
            setCurrentTime(audioRef.current.currentTime);
            setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        }
    };

    const togglePlayPause = () => {
        if (audioRef.current) {
            isPlaying ? audioRef.current.pause() : audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newProgress = parseFloat(e.target.value);
        setProgress(newProgress);
        if (audioRef.current) {
            audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
        }
    };

    const handleNextSong = () => {
        setProgress(0);
        setCurrentTime(0);
        setIsPlaying(false);
        dispatch(setClick(click));
    };


    useEffect(() => {
        const handleLoadedMetadata = () => {
            if (audioRef.current) {
                setDuration(audioRef.current.duration);
                setCurrentTime(audioRef.current.currentTime);
                setProgress(0);
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
        <div style={{ width: '300px', textAlign: 'center', margin: '20px auto', background: 'transparent' }}>
            {/* 时间显示 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '14px' }}>
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
            </div>

            {/* 自定义进度条 */}
            <input
                className="custom-range"
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleProgressChange}
                style={{
                    width: '100%',
                    cursor: 'pointer',
                }}
            />

            {/* 播放 / 暂停按钮 */}
            <button
                onClick={togglePlayPause}
                style={{
                    padding: '5px 10px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    backgroundColor: isPlaying ? '#f44336' : '#4caf50',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    marginTop: '10px', // 放在进度条下方
                }}
            >
                {isPlaying ? '暂停' : '播放'}
            </button>

            {/* 切歌按钮 */}
            <button
                onClick={handleNextSong}
                style={{
                    padding: '5px 10px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    backgroundColor: '#2196f3',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    marginTop: '10px',
                }}
            >
                切歌
            </button>
        </div>
    );
};

export default Audio;