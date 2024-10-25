import { useNavigate } from "react-router";
import Diary from "../../Diary/Diary";
import Draw from "../../Draw/Draw";
import Novel from "../../Novel/Novel";
import Song from "../../Song/Song";

import "./Nav.css"
import { useState } from "react";

const nav_list = [
    {
        path: "/diary",
        element: <Diary />,
        titile: "小狗日记",
        id: 1
    },
    {
        path: "/draw",
        element: <Draw />,
        titile: "画一幅画",
        id: 2
    },
    {
        path: "/novel",
        element: <Novel />,
        titile: "写本小说",
        id: 3
    },
    {
        path: "/song",
        element: <Song />,
        titile: "唱一首歌",
        id: 4
    }
]
function NavButton({ item, children, className, convert }) {
    const navigate = useNavigate();
    return (
        <button className={className}
            onClick={() => {
                navigate(item.path)
                convert(item.id)
            }}>{children}</button>
    )
}

function Nav() {
    const [selected, SetSelected] = useState(1);
    function convert(index) {
        SetSelected(index)
    }
    return (
        <>
            <div id="logo">BRDR-CLL</div>
            <header>
                <nav>
                    <ul>
                        {nav_list.map((item) => {
                            return (
                                <li key={item.id}>
                                    <NavButton item={item}
                                        convert={convert}
                                        className={(selected === item.id) ? "active" : ""}>
                                        {item.titile}
                                    </NavButton>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Nav;