import { useEffect, useState } from "react";
import "./Draw.css"
import React from "react";

const topics = ["doggie"]

function Draw() {
    const [pics, SetPics] = useState([]);
    useEffect(() => {
        const newPic = []
        const loadPic = async () => {
            for (let topicIndex = 0; topicIndex < topics.length; topicIndex++) {
                const topic = topics[topicIndex];
                for (let index = 1; index <= 9; index++) {
                    const url = `http://localhost:4000/public/2024pic/pic${index}_${topic}.jpg`;

                    try {
                        const response = await fetch(url);
                        if (response.status !== 201) {
                            newPic.push({ src: url, id: `${topicIndex}-${index}` });
                            SetPics([...newPic]);
                        }
                    } catch (error) {
                        console.log("Error loading")
                        break;
                    }
                }
            }
        }
        loadPic()
    }, [])

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