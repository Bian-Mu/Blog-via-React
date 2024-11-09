import React, { useState, useEffect } from 'react';


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
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const index = lyrics.findIndex(line => line.time > currentTime);
        setActiveIndex(index > 0 ? index - 1 : 0);
    }, [currentTime, lyrics]);

    return (
        <div style={{ overflowY: 'auto', height: '70%' }}>
            {lyrics.map((line, index) => (
                <div
                    key={index}
                    onClick={() => onLineClick(line.time)}
                    style={{
                        transition: 'opacity 0.3s',
                        opacity: index === activeIndex ? 1 : 0.5,
                        cursor: 'pointer',
                        backgroundColor: index === activeIndex ? 'yellow' : 'transparent',
                    }}
                >
                    {line.text}
                </div>
            ))}
        </div>
    );
};

export default Lyrics;