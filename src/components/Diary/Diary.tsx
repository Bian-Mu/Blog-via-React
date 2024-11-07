import { useState } from "react";
import "./Diary.css"
import TimeButton from "./timebutton/timebutton";
import { MdProvider } from "../../context/diarymd"
import { useMd } from "../../context/diarymd";

import React from "react";
import Comment from "../zother/Comments/Comment";


function Diary() {
    return (
        <MdProvider>
            <DiaryContent />
        </MdProvider>
    );
}

function DiaryContent() {
    const [calendar, SetCalendar] = useState(false);
    const { title, text } = useMd();

    return (
        <>
            <div id="time-button">
                <button name="选择日期" onClick={() => SetCalendar(!calendar)}>
                    <mark>
                        re-DAYs
                    </mark>
                </button>
            </div>
            {calendar && <TimeButton />}
            <h1 id="date">{title}</h1>
            <div id="main-content">
                <p id="content" dangerouslySetInnerHTML={{ __html: text }}>
                </p>
            </div>
            <hr />
            <Comment />
        </>
    );
}

export default Diary;