import React from "react"
import "./Novel.css"
import novelRecord from "../../assets/image/novelRecord.png"

function Novel() {


    return (
        <div id="main-content-novel">
            <div id="novelInfo">
                <div>
                    <img id="novelRecord" src={novelRecord} alt="pic" />
                </div>
                <div id="novelBrief">
                    <span>
                        《将醒》
                    </span>
                    <p>
                        &nbsp;&nbsp;——连载中——
                    </p>
                    <span>
                        剧情介绍:
                    </span>
                    <br />
                    <p>
                        反复挣扎，笑比哭难看的与几年青春握手言和
                    </p>
                </div>
            </div>
            <div id="novelLink">
                暂未发表于互联网，敬请期待
            </div>
        </div>
    )
}

export default Novel