import "./timebutton.css"
import { useDispatch, useSelector } from "react-redux"
import { increment, decrement } from "../../../store/modules/calendar"
import { useMd } from "../../../context/diarymd"
import { useEffect, useState } from "react"
import React from "react"
import { useQuery } from "react-query"


const MonthList: React.FC = () => {
    const dispatch = useDispatch()
    const { month } = useSelector((state: { calendar: { month: number } }) => state.calendar)

    return (
        <>
            <button className="monthConvert" onClick={() => dispatch(decrement())}>&lt;&lt;</button>
            <p id="monthDisplay">2024 =&gt; {month}</p>
            <button className="monthConvert" onClick={() => dispatch(increment())}>&gt;&gt;</button>
        </>
    )
}
interface EverydayProps {
    date: string | number
}
const Everyday: React.FC<EverydayProps> = ({ date }) => {
    const { month } = useSelector((state: { calendar: { month: number } }) => state.calendar)
    const [available, SetAvailable] = useState(false)
    const { updateTitle, updateText } = useMd()

    async function getMd() {
        const url = `http://localhost:4000/public/2024md/${month}-${date}.md`;
        try {
            const response = await fetch(url);
            updateTitle(`2024/${month}/${date}`)
            updateText(await response.text())

        } catch (error) {
            console.error("Error fetching data: ", error)
        }
    }
    const { data: isAvailable } = useQuery([month, date],
        async () => {
            const url = `http://localhost:4000/public/2024md/${month}-${date}.md`;
            const response = await fetch(url);
            if (response.status !== 201) {
                return true
            }
        },
        {
            onError: () => SetAvailable(false),
            initialData: false
        }
    )
    useEffect(() => {
        if (typeof isAvailable === "boolean") {
            SetAvailable(isAvailable);
        }
    }, [isAvailable]);
    // useEffect(() => {
    //     if (date === "～") {
    //         SetAvailable(false)
    //     }
    //     else {
    //         const fetchData = async () => {
    //             const url = `http://localhost:4000/public/2024md/${month}-${date}.md`;
    //             try {
    //                 const response = await fetch(url);
    //                 if (response.status !== 201) { //文件不存在
    //                     SetAvailable(true)
    //                 }
    //                 else {
    //                     SetAvailable(false)
    //                 }
    //             } catch (error) {
    //                 console.error("Error fetching data: ", error)
    //                 SetAvailable(false);
    //             }
    //         }
    //         fetchData()
    //     }
    // }, [date, month])

    if (available) {
        return (<li>
            <button className="haveagoodday" onClick={() => getMd()}>
                {date}
            </button>
        </li>)
    }
    return (
        <li>
            <button className="everyday" disabled>
                {date}
            </button>
        </li>
    )
}

function DaysList() {
    const { month } = useSelector((state: { calendar: { month: number } }) => state.calendar)

    let daysInMonth = new Date(2024, month, 0).getDate();
    let daysArray = Array.from({ length: daysInMonth }, (x, i) => i + 1)

    return (
        <>
            <ul id="daysDisplay">
                {daysArray.map((item) => {
                    return <Everyday date={item} key={month.toString() + "/" + item.toString()} />
                })}
                <Everyday date={"～"} />
            </ul>
        </>
    )
}
function TimeButton() {

    return (
        <div id="overlay">
            <div id="month">
                <MonthList />
            </div>
            <div id="days">
                <DaysList />
            </div>
        </div>
    )
}

export default TimeButton