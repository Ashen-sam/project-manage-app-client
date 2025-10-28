// Task.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ListTodo, Plus } from "lucide-react";
import { TaskTable } from "@/components/common/taskTable";

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
        <>
            {tasks.length === 0 ? (
                <div className="flex items-center justify-center min-h-[700px] bg-background">
                    <div className="flex flex-col items-center max-w-md text-center space-y-4 px-6">
                        <div className="mb-2">
                            <ListTodo className="h-20 w-20 text-muted-foreground stroke-[1.5]" />
                        </div>

                        <h2 className="text-2xl font-semibold tracking-tight">Tasks</h2>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Tasks are individual units of work that need to be completed. Create
                            tasks to track your team's progress and ensure nothing falls through
                            the cracks.
                        </p>

                        <div className="flex gap-3 pt-2">
                            <Button
                                className="gap-2 bg-purple-800 hover:bg-purple-700 text-white"
                                size="sm"
                                onClick={() => handleAddTask({
                                    title: "Sample Task",
                                    description: "This is a sample task",
                                    status: "Todo",
                                    priority: "Medium",
                                    assignee: "",
                                    dueDate: "",
                                    projectName: "",
                                })}
                            >
                                <Plus className="h-4 w-4" />
                                Create new task
                            </Button>
                            <Button variant="outline" size="sm">
                                Documentation
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="">


                    <TaskTable
                        tasks={tasks}
                        onAdd={handleAddTask}
                        onUpdate={handleUpdateTask}
                        onDelete={handleDeleteTask}
                    />
                </div>
            )}
        </>
    );
};