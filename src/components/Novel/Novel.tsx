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
                        None
                    </p>
                </div>
            </div>
            <div id="novelLink">

            </div>
        </div>
    )
}

export default Novel