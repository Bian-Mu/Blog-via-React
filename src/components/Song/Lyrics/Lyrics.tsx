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
    const lyricsContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const index = lyrics.findIndex(line => line.time > currentTime);
        setCurrentIndex(index > 0 ? index - 1 : 0)

        if (lyricsContainerRef.current) {
            const currentLyricElement = lyricsContainerRef.current.children[currentindex] as HTMLDivElement;
            if (currentLyricElement) {
                const offset = (lyricsContainerRef.current.offsetHeight - currentLyricElement.offsetHeight) / 2;
                lyricsContainerRef.current.scrollTop = currentLyricElement.offsetTop - offset;
            }
        }
    }, [currentTime, lyrics])

    return (
        <div ref={lyricsContainerRef} id="main-content-lyrics">
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