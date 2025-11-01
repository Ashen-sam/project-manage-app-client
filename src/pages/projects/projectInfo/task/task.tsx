// Task.tsx
import { TaskTable, type Task as TaskType } from "@/components/common/taskTable";
import { useState } from "react";

export const Task = () => {
    const [tasks, setTasks] = useState<TaskType[]>([

    ]);

    const handleTasksChange = (updatedTasks: TaskType[]) => {
        setTasks(updatedTasks);
        // You can add additional logic here:
        // - Save to backend API
        // - Update local storage
        // - Show success notification
        console.log("Tasks updated:", updatedTasks);
    };

    return (
        <div className="">
            <TaskTable
                title="Project Tasks"
                initialTasks={tasks}
                onChange={handleTasksChange}
                showNumbering={true}
            />
        </div>
    );
};
