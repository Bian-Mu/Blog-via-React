import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./modules/calendar";
import musicReducer from "./modules/music";
const store = configureStore({
    reducer: {
        calendar: calendarReducer,
        music: musicReducer
    }
})

export default store