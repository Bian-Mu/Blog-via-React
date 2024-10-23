import { useNavigate } from "react-router";
import Diary from "../../Diary/Diary";
import Draw from "../../Draw/Draw";
import Novel from "../../Novel/Novel";
import Song from "../../Song/Song";


const nav_list = [
    {
        path: "/diary",
        element: <Diary />,
        titile: "小狗日记"
    },
    {
        path: "/draw",
        element: <Draw />,
        titile: "画一幅画"
    },
    {
        path: "/novel",
        element: <Novel />,
        titile: "写本小说"
    },
    {
        path: "/song",
        element: <Song />,
        titile: "唱一首歌"
    }
]
function NavButton({ path, children }) {
    const navigate = useNavigate();
    return (
        <button onClick={() => navigate(path)}>{children}</button>
    )
}
function Nav() {

    return (
        <nav>
            <ul>
                {nav_list.map((item, index) => {
                    return (
                        <li key={index}><NavButton path={item.path}>{item.titile}</NavButton></li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Nav;