import "./Diary.css"
function Diary() {
    return (
        <>
            <div id="time-button"><button name="选择日期">
                <mark>
                    re-DAYs
                </mark>
            </button>
            </div>
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