import "./SelfIntro.css"
import avatar from "../../../assets/image/avatar.jpg"

import React from "react"
const contact_list = [
    {
        target: "Github",
        src: "https://github.com/Bian-Mu",
        id: "github"
    },
    // {
    //     target: "email",
    //     src: "bianmu.sky@gmail.com"
    // },
    {
        target: "Telegram",
        src: "https://t.me/Jiang_Yang",
        id: "telegram"
    }
]
function SelfIntro() {
    return (
        <aside className="self-intro">
            <figure>
                <img src={avatar} alt="头像" id="avatar" />
            </figure>
            <div id="contact">
                <span>To contact:</span>
                <hr />
                <ul id="contact-list">
                    {contact_list.map((item) => {
                        return <p key={item.id}><li><a href={item.src}>{item.target}</a></li></p>
                    })}
                </ul>
            </div>
            <hr />
            <p id="description">
                个人博客
                <br />
                不定期更新
            </p>
        </aside>
    )
}


export default SelfIntro