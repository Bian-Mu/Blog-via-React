import React from "react";
import ReacDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//import components
import App from "../App";
import NotFound from "../components/NotFound/NotFound";
import Diary from "../components/Diary/Diary";
import Draw from "../components/Draw/Draw";
import Novel from "../components/Novel/Novel";
import Song from "../components/Song/Song";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Diary />
            },
            {
                path: "/diary",
                element: <Diary />
            },
            {
                path: "/draw",
                element: <Draw />
            },
            {
                path: "/novel",
                element: <Novel />
            },
            {
                path: "/song",
                element: <Song />
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
])

export default router;