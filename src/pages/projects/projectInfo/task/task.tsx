// Task.tsx
import { TaskTable } from "@/components/common/taskTable";
import { useState } from "react";

interface Task {
    id: number;
    title: string;
    description: string;
    status: "Todo" | "In Progress" | "Done";
    priority: "Low" | "Medium" | "High";
    assignee: string;
    dueDate: string;
    projectName: string;
}

export const Task = () => {
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: 1,
            title: "Design homepage mockup",
            description: "Create high-fidelity mockup for new homepage",
            status: "In Progress",
            priority: "High",
            assignee: "John Doe",
            dueDate: "2025-11-05",
            projectName: "Website Redesign",

        },
        {
            id: 2,
            title: "Setup Firebase authentication",
            description: "Implement user authentication using Firebase",
            status: "Todo",
            priority: "High",
            assignee: "Jane Smith",
            dueDate: "2025-11-10",
            projectName: "Mobile App Development",
        },

    ]);

    const handleAddTask = (newTask: Omit<Task, 'id'>) => {
        const task: Task = {
            id: Math.max(...tasks.map((t) => t.id), 0) + 1,
            ...newTask,
        };
        setTasks([...tasks, task]);
    };

    const handleUpdateTask = (updatedTask: Task) => {
        setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    };

    const handleDeleteTask = (taskId: number) => {
        setTasks(tasks.filter((t) => t.id !== taskId));
    };

    return (
        <div className="">
            <TaskTable
                tasks={[]}
                onAdd={handleAddTask}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
            />
        </div>
    );
};