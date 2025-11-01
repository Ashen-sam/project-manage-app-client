import { GlobalLayout } from "@/components";
import { Calendar as CalendarNew, Home, Overview, ProjectInfo, Projects, Settings, Task } from "@/pages";
import { AuthLayout, Login, Register } from "@/pages/auth";
import { CalendarPage } from "@/pages/calendar/calendar";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        element: <GlobalLayout />,
        children: [
            { path: "/", element: <Home />, index: true },
            { path: "/projects", element: <Projects /> },
            { path: "/calendar", element: <CalendarPage /> },
            { path: "/settings", element: <Settings /> },


            {
                path: "/projects/:projectId",
                element: <ProjectInfo />,
                children: [
                    { index: true, element: <Overview /> },
                    { path: "tasks", element: <Task /> },
                    { path: "calendar", element: <CalendarNew /> },
                ]
            },
        ],

    },
    {

        element: <AuthLayout />,
        children: [
            {
                path: "/login", element: <Login />
            },
            {
                path: "/register", element: <Register />
            }
        ],
    }
]);