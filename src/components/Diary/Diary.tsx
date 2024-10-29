import { useState } from "react";
import "./Diary.css"
import TimeButton from "./timebutton/timebutton";
import { MdProvider } from "../../context/diarymd"
import { useMd } from "../../context/diarymd";
import { marked } from "marked"
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
                <p id="content" dangerouslySetInnerHTML={{ __html: marked(text) }}>
                </p>
            </div>
            <hr />
            <form action="" method="">
                <textarea name="comment" id="to-comment" placeholder="对小狗善良一些！"></textarea>
                <button id='handout' type="submit">Push</button>
            </form>
            <div id="logo2">ฅ边.牧ฅノ</div>
        </>
    );
}

export default Diary;