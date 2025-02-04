import React, { useEffect, useRef } from "react";
import "./Record.css"

import { useDispatch, useSelector } from "react-redux";
interface recordProps {
    src: string;
    audioState: React.RefObject<HTMLAudioElement>;
}

const Record: React.FC<recordProps> = ({ src, audioState }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const ratio = window.devicePixelRatio || 1;
    const centerX = 175 / ratio;
    const centerY = 175 / ratio;
    const radius = 125 / ratio;

    const { isPlaying } = useSelector((state: { music: { isPlaying: boolean } }) => state.music)

    useEffect(() => {

        const canvas = canvasRef.current;
        if (canvas?.width && canvas?.height) {
            canvas.width = 350;
            canvas.height = 350;
        }
        const ctx = canvas?.getContext('2d');

        if (canvas && ctx) {
            const image = new Image();
            image.src = src;

            image.onload = () => {
                const outerRadius = radius + 25;
                ctx.save();
                ctx.scale(ratio, ratio);
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = "high";
                ctx.beginPath();
                ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
                ctx.fillStyle = 'black';
                ctx.fill();

                const lineSpacing = 5;

                for (let r = outerRadius - lineSpacing; r >= radius; r -= lineSpacing) {
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
                    ctx.strokeStyle = 'grey';
                    ctx.lineWidth = 0.45;
                    ctx.stroke();
                }

                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                ctx.clip();
                ctx.drawImage(image, centerX - radius, centerY - radius, 250 / ratio, 250 / ratio);

                ctx.restore();
            }

        }
    }, [src, ratio])

    return (
        <canvas ref={canvasRef} id="recordPic" className={isPlaying ? "spin" : ""} />
    )
}

export default Record;