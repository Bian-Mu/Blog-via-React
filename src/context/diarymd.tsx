import { ReactNode, createContext, useState, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import React from "react"
import { marked } from "marked"
interface MdContextType {
    title: string;
    text: string;
    updateTitle: (newtitle: string) => void;
    updateText: (newtext: string) => void
}

interface MdProviderProps {
    children: ReactNode;
}
const MdContext = createContext<MdContextType | undefined>(undefined);


export function MdProvider({ children }: MdProviderProps) {
    let today = new Date();
    const { month } = useSelector((state: { calendar: { month: number } }) => state.calendar)
    let time = `2025/${month}/${today.getDate()}`;

    const [title, SetTitle] = useState(time)
    const [text, SetText] = useState(marked("## Temporarily blank") as string)
    function updateTitle(newtitle: string) {
        SetTitle(newtitle)
    }

    function updateText(newtext: string) {
        SetText(marked(newtext) as string)
    }

    // //组件挂载后通过钩子异步获取数据
    useEffect(() => {
        async function initialGetMd() {

            const url = `https://blog.bianmu.link:6109/public/2025md/${month}-${today.getDate()}.md`;
            try {
                const response = await fetch(url);
                if (response.status !== 204) {
                    const initialText = await response.text();
                    updateText(initialText);
                }

            } catch (error) {
                updateText("## Temporarily blank");
            }
        }
        initialGetMd();
    }, []);
    return (
        <MdContext.Provider value={{ title, text, updateTitle, updateText }}>
            {children}
        </MdContext.Provider>
    )
}

export const useMd = (): MdContextType => {
    return useContext(MdContext) as MdContextType;
}