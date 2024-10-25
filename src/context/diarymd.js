import { createContext, useState, useContext } from "react";

const MdContext = createContext();

export function MdProvider({ children }) {
    const [title, SetTitle] = useState("")
    const [text, SetText] = useState("")
    function updateTitle(newtitle) {
        SetTitle(newtitle)
    }

    function updateText(newtext) {
        SetText(newtext)
    }

    return (
        <MdContext.Provider value={{ title, text, updateTitle, updateText }}>
            {children}
        </MdContext.Provider>
    )
}

export const useMd = () => {
    useContext(MdContext)
}