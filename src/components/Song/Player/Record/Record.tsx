import React, { useEffect, useRef } from "react";
import "./Record.css"

interface recordProps {
    src: string;
}

const Record: React.FC<recordProps> = ({ src }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const centerX = 75;
    const centerY = 75;
    const radius = 50;
    useEffect(() => {

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        if (canvas && ctx) {
            const image = new Image();
            image.src = src;

            image.onload = () => {
                ctx.save();
                ctx.scale(2, 1);
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius + 15, 0, Math.PI * 2);
                ctx.fillStyle = 'black';
                ctx.fill();

                const lineSpacing = 3;
                const outerRadius = radius + 15;

                for (let r = outerRadius - lineSpacing; r >= radius; r -= lineSpacing) {
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
                    ctx.strokeStyle = 'grey';
                    ctx.lineWidth = 0.2;
                    ctx.stroke();
                }

                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                ctx.clip();

                ctx.drawImage(image, centerX - radius, centerY - radius, 100, 100);

                ctx.restore();
            }

        }
    }, [src])

    return (
        <canvas ref={canvasRef} id="recordPic" />
        // <img id="recordPic" src={src} alt="pic" />
    )
}

export default Record;