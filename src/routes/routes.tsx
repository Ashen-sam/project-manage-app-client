import { GlobalLayout } from "@/components";
import { Calendar, Home, Overview, ProjectInfo, Projects, Task } from "@/pages";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        element: <GlobalLayout />,
        children: [
            { path: "/", element: <Home />, index: true },
            { path: "/projects", element: <Projects /> },
            {
                path: "/projects/:projectId",
                element: <ProjectInfo />,
                children: [
                    { index: true, element: <Overview /> },
                    { path: "tasks", element: <Task /> },
                    { path: "calendar", element: <Calendar /> },
                ]
            },
        ],
    },
]);