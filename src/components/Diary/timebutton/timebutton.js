import "./timebutton.css"
import { useDispatch, useSelector } from "react-redux"
import { increment, decrement } from "../../../store/modules/calendar"

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
    return (
        <li>
            <button className="everyday">
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
                    return <Everyday date={item} />
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