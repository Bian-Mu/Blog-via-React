import React from "react"
import highEnergy from "../../assets/gif/highEnergy.gif"
import "./NotFound.css"
function NotFound() {
    return (
        <>
            <div id="Warn">
                你来错地方了
            </div>
            <div id="Gif">
                <img src={highEnergy} alt="highEnergy" />
            </div>
        </>
    )
}


export default NotFound