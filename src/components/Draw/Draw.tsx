import { useEffect, useState } from "react";
import "./Draw.css"
import React from "react";
import { useQuery } from "react-query";

const topics = ["doggie"]

interface Pic {
    src: string;
    id: string;
}

function Draw() {
    const [pics, SetPics] = useState<Pic[]>([]);
    const { data: initialPics, isLoading } = useQuery([topics],
        async () => {
            let currentPic: Pic[] = []
            const newPic: Pic[] = []
            for (let topicIndex = 0; topicIndex < topics.length; topicIndex++) {
                const topic = topics[topicIndex];
                for (let index = 1; index <= 9; index++) {
                    const url = `http://localhost:4000/public/2024pic/pic${index}_${topic}.jpg`;
                    try {
                        const response = await fetch(url);
                        if (response.status !== 201) {
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
        if (!isLoading && initialPics) {
            SetPics([...initialPics])
        }
    }, [initialPics, isLoading])
    // useEffect(() => {
    //     const newPic: Pic[] = []
    //     const loadPic = async () => {
    //         for (let topicIndex = 0; topicIndex < topics.length; topicIndex++) {
    //             const topic = topics[topicIndex];
    //             for (let index = 1; index <= 9; index++) {
    //                 const url = `http://localhost:4000/public/2024pic/pic${index}_${topic}.jpg`;

    //                 try {
    //                     const response = await fetch(url);
    //                     if (response.status !== 201) {
    //                         newPic.push({ src: url, id: `${topicIndex}-${index}` });
    //                         SetPics([...newPic]);
    //                     }
    //                 } catch (error) {
    //                     console.log("Error loading")
    //                     break;
    //                 }
    //             }
    //         }
    //     }
    //     loadPic()
    // }, [])

    return (
        <>
            <div id="main-content-draw">
                <div id="content-draw">
                    {pics.map(pic => (
                        <div key={pic.id} className="imgBox">
                            <img src={pic.src} />
                        </div>
                    ))}
                </div>
            </div>
            <hr />
            <form action="" method="">
                <textarea name="comment" id="to-comment" placeholder="对小狗善良一些！"></textarea>
                <button id='handout' type="submit">Push</button>
            </form>
            <div id="logo2">ฅ边.牧ฅノ</div>
        </>
    )
}


export default Draw;