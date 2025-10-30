import { GlobalLayout } from "@/components";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarNew, Home, Overview, ProjectInfo, Projects, Settings, Task } from "@/pages";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        element: <GlobalLayout />,
        children: [
            { path: "/", element: <Home />, index: true },
            { path: "/projects", element: <Projects /> },
            { path: "/calendar", element: <Calendar /> },
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
]);