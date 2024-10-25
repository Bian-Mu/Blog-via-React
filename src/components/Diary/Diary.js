import { useState } from "react";
import "./Diary.css"
import TimeButton from "./timebutton/timebutton";
function Diary() {
    const [calendar, SetCalendar] = useState(false);
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
            <h1 id="date">123456789</h1>
            <div id="main-content">
                <p id="content">
                </p>
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


export default Diary;