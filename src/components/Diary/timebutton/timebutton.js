import "./timebutton.css"
import { useDispatch, useSelector } from "react-redux"
import { increment, decrement } from "../../../store/modules/calendar"
import { useMd } from "../../../context/diarymd"
import { useEffect, useState } from "react"


function MonthList() {
    const dispatch = useDispatch()
    const { month } = useSelector(state => state.calendar)
    return (
        <>
            <button className="monthConvert" onClick={() => dispatch(decrement())}>&lt;&lt;</button>
            <p id="monthDisplay">2024 =&gt; {month}</p>
            <button className="monthConvert" onClick={() => dispatch(increment())}>&gt;&gt;</button>
        </>
    )
}

function Everyday({ date }) {
    const { month } = useSelector(state => state.calendar)
    const [available, SetAvailable] = useState(false)

    useEffect(() => {
        if (date === "～") {
            SetAvailable(false)
        }
        else {
            const fetchData = async () => {
                const url = `../../../../public/2024/${month}-${date}.md`;
                try {
                    const response = await fetch(url);
                    if (response.ok) {
                        SetAvailable(true)
                        console.log(response)
                    }
                    else {
                        SetAvailable(false)
                        console.log("false")
                    }
                } catch (error) {
                    console.error("Error fetching data: ", error)
                    SetAvailable(false);
                }
            }
            fetchData()
        }
    }, [date, month])

    if (available) {
        return (<li>
            <button className="haveagoodday">
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
    const { month } = useSelector(state => state.calendar)
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