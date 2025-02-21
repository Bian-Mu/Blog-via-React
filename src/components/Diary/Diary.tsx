import { useState } from "react";
import "./Diary.css"
import TimeButton from "./timebutton/timebutton";
import { MdProvider } from "../../context/diarymd"
import { useMd } from "../../context/diarymd";

import React from "react";
import Comment from "../zother/Comments/Comment";

import UploadPage from "./uploadbutton/uploadbutton";

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


    const [upload, SetUpload] = useState(false);
    const handleUploadChange = () => {
        SetUpload(false)
    }


    return (
        <div id="main-content-diary">
            <div id="content-diary">
                <div id="time-button">
                    <button name="选择日期" onClick={() => SetCalendar(!calendar)}>
                        <mark>
                            re-DAYs
                        </mark>
                    </button>
                </div>
                <div id="upload-button">
                    <button name="上传日记" onClick={() => SetUpload(!upload)}>
                        <mark>
                            upload-MD
                        </mark>
                    </button>
                </div>
                {calendar && <TimeButton />}
                {upload && <UploadPage uploadState={handleUploadChange} />}
                <h1 id="date">{title}</h1>

                <div id="main-content">
                    <p id="content" dangerouslySetInnerHTML={{ __html: text }}>
                    </p>
                </div>
            </div>
            <hr />
            <Comment />
        </div>
    );
}

export default Diary;