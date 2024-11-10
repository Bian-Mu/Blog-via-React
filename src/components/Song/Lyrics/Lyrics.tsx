import React, { useState, useEffect, useRef } from 'react';
import "./Lyrics.css"

interface LyricLine {
    time: number;
    text: string;
}

interface LyricsProps {
    lyrics: LyricLine[];
    currentTime: number;
    onLineClick: (time: number) => void;
}
const Lyrics: React.FC<LyricsProps> = ({ lyrics, currentTime, onLineClick }) => {
    const [currentindex, setCurrentIndex] = useState(-1);
    const lyricsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const index = lyrics.findIndex(line => line.time > currentTime);
        setCurrentIndex(index > 0 ? index - 1 : 0)

        if (lyricsRef.current) {
            const currentLyric = lyricsRef.current.children[currentindex] as HTMLDivElement;
            if (currentLyric) {
                const offset = 1.2 * lyricsRef.current.offsetHeight - currentLyric.offsetHeight * 2;
                lyricsRef.current.scrollTop = currentLyric.offsetTop - offset;
            }
        }
    }, [currentTime, lyrics])

    return (
        <div ref={lyricsRef} id="main-content-lyrics">
            {lyrics.map((line, index) => (
                <div className="line" key={index} onClick={() => onLineClick(line.time)}
                    style={{
                        transition: 'opacity 0.3s',
                        opacity: index === currentindex ? 1 : 0.5
                    }}>
                    {line.text}
                </div>
            ))}
        </div>
    )
}


export default Lyrics;