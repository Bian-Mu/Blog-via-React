import { createSlice } from "@reduxjs/toolkit"

let today = new Date()

const calendarStore = createSlice({
    name: "calendar",
    initialState: {
        month: today.getMonth() + 1 as number
    },
    reducers: {
        increment(state) {
            if (state.month < 12) {
                state.month++
            }
        },
        decrement(state) {
            if (state.month > 1) {
                state.month--
            }
        }
    }
})

const { increment, decrement } = calendarStore.actions

const calendarReducer = calendarStore.reducer

export { increment, decrement }
export default calendarReducer