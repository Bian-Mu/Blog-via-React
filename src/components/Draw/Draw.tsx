import { useEffect, useState } from "react";
import "./Draw.css"
import React from "react";
import { useQuery } from "react-query";
import Comment from "../zother/Comments/Comment"
const topics = ["doggie"] //2024
// const topics = [] as string[] //2025
interface Pic {
    src: string;
    id: string;
}

function Draw() {
    const [pics, SetPics] = useState<Pic[]>([]);
    const { data: initialPics } = useQuery([topics],
        async () => {
            let currentPic: Pic[] = []
            const newPic: Pic[] = []
            for (let topicIndex = 0; topicIndex < topics.length; topicIndex++) {
                const topic = topics[topicIndex];
                for (let index = 1; index <= 9; index++) {
                    const url = `https://blog.bianmu.link:6109/public/2024pic/pic${index}_${topic}.jpg`;
                    try {
                        const response = await fetch(url);
                        if (response.status !== 204) {
                            newPic.push({ src: url, id: `${topicIndex}-${index}` });
                            currentPic = [...newPic]
                        }
                    } catch (error) {
                        console.log("Error loading")
                        break;
                    }
                }
            }
            return currentPic;
        }
    )
    useEffect(() => {
        if (initialPics) {
            SetPics([...initialPics])
        }
    }, [initialPics])

    return (
        <div id="main-content-draw">
            <div id="main-draw">
                <div id="content-draw">
                    {pics.map(pic => (
                        <div key={pic.id} className="imgBox">
                            <img src={pic.src} alt={`${pic.src}+${pic.id}`} />
                        </div>
                    ))}
                </div>
            </div>
            <hr />
            <Comment />
        </div>
    )
}


export default Draw;