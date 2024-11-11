import React from "react"
import "./Comment.css"

function Push() {
    alert("目前不支持评论捏")
}

export default function Comment() {
    return (
        <>
            <form action="" method="">
                <textarea name="comment" id="to-comment" placeholder="对小狗善良一些！"></textarea>
                <button id='handout' type="button" onClick={() => { Push() }}>Push</button>
            </form>
            <div id="logo2">ฅ边.牧ฅノ</div>
        </>
    )


}