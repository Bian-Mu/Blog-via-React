import { createSlice } from "@reduxjs/toolkit"


const calendarStore = createSlice({
    name: "calendar",
    initialState: {
        month: 1
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