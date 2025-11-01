"use client";

import * as React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash } from "lucide-react";
import { ProjectStatusCommon, type StatusType } from "./ProjectStatusCommon";
import { ProjectPriorityCommon, type PriorityType } from "./projectPriorityCommon";

export interface Task {
    id: number;
    name: string;
    assignee?: string;
    status?: StatusType;
    dueDate?: string;
    priority?: PriorityType;
}

interface TaskTableProps {
    title?: string;
    initialTasks?: Task[];
    onChange?: (tasks: Task[]) => void;
    showNumbering?: boolean;
    columns?: {
        name?: boolean;
        assignee?: boolean;
        status?: boolean;
        dueDate?: boolean;
        priority?: boolean;
    };
    statusOptions?: string[];
    priorityOptions?: { value: string; label: string; emoji?: string }[];
}

export const TaskTable: React.FC<TaskTableProps> = ({
    title,
    initialTasks = [],
    onChange,
    showNumbering = true,
    columns = {
        name: true,
        assignee: true,
        status: true,
        dueDate: true,
        priority: true,
    },


}) => {
    const [tasks, setTasks] = React.useState<Task[]>(initialTasks);
    const newTaskRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
        setTasks(initialTasks);
    }, [initialTasks]);

    const handleAddTask = () => {
        const newTask: Task = {
            id: 1,
            name: "",
            assignee: "",
            status: "Expired",
            dueDate: "",
            priority: 'High',
        };
        const updated = [...tasks, newTask];
        setTasks(updated);
        onChange?.(updated);

        setTimeout(() => {
            newTaskRef.current?.focus();
        }, 50);
    };

    const handleDeleteTask = (id: number) => {
        const updated = tasks.filter((task) => task.id !== id);
        setTasks(updated);
        onChange?.(updated);
    };

    const handleEditTask = (id: number, key: keyof Task, value: string) => {
        const updated = tasks.map((task) =>
            task.id === id ? { ...task, [key]: value } : task
        );
        setTasks(updated);
        onChange?.(updated);
    };


    const columnCount =
        (showNumbering ? 1 : 0) +
        (columns.name ? 1 : 0) +
        (columns.assignee ? 1 : 0) +
        (columns.status ? 1 : 0) +
        (columns.dueDate ? 1 : 0) +
        (columns.priority ? 1 : 0) +
        1; // +1 for actions column

    return (
        <div className="w-full mx-auto bg-white">
            {title && (
                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                </div>
            )}
            <div className="border rounded-sm overflow-hidden">
                <Table className="   border border-border rounded-md overflow-hidden
    [&>thead>tr>th]:border [&>thead>tr>th]:border-border
    [&>tbody>tr>td]:border [&>tbody>tr>td]:border-border">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            {showNumbering && <TableHead className="w-10"></TableHead>}
                            {columns.name && (
                                <TableHead className="w-[35%]">Name</TableHead>
                            )}
                            {columns.assignee && (
                                <TableHead className="w-[20%]">Assignee</TableHead>
                            )}
                            {columns.status && (
                                <TableHead className="w-[15%]">Status</TableHead>
                            )}
                            {columns.dueDate && (
                                <TableHead className="w-[12%]">Due date</TableHead>
                            )}
                            {columns.priority && (
                                <TableHead className="w-[10%]">Priority</TableHead>
                            )}
                            <TableHead className="w-[60px] text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {tasks.map((task, index) => (
                            <TableRow key={task.id} className="hover:bg-gray-50">
                                {showNumbering && (
                                    <TableCell className="text-center text-gray-400">
                                        {index + 1}
                                    </TableCell>
                                )}
                                {columns.name && (
                                    <TableCell>
                                        <Input
                                            ref={
                                                index === tasks.length - 1
                                                    ? newTaskRef
                                                    : undefined
                                            }
                                            value={task.name}
                                            placeholder="Enter task name..."
                                            onChange={(e) =>
                                                handleEditTask(task.id, "name", e.target.value)
                                            }
                                            className="border-0 shadow-none focus-visible:ring-1"
                                        />
                                    </TableCell>
                                )}
                                {columns.assignee && (
                                    <TableCell>

                                        <Input
                                            value={task.assignee}
                                            placeholder="Assignee"
                                            onChange={(e) =>
                                                handleEditTask(
                                                    task.id,
                                                    "assignee",
                                                    e.target.value
                                                )
                                            }
                                            className="border-0 shadow-none focus-visible:ring-1"
                                        />
                                    </TableCell>
                                )}
                                {columns.status && (
                                    <TableCell>
                                        <ProjectStatusCommon status={task.status ?? "Expired"} />
                                    </TableCell>
                                )}
                                {columns.dueDate && (
                                    <TableCell>
                                        <Input
                                            type="text"
                                            value={task.dueDate}
                                            placeholder="Due date"
                                            onChange={(e) =>
                                                handleEditTask(
                                                    task.id,
                                                    "dueDate",
                                                    e.target.value
                                                )
                                            }
                                            className="border-0 shadow-none focus-visible:ring-1 text-sm"
                                        />
                                    </TableCell>
                                )}
                                {columns.priority && (
                                    <TableCell>
                                        <ProjectPriorityCommon priority={task.priority ?? 'High'} />
                                    </TableCell>
                                )}
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDeleteTask(task.id)}
                                        className="h-8 w-8 text-gray-400 hover:text-red-600"
                                    >
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}

                        {/* Add New Row Button */}
                        <TableRow className="hover:bg-gray-50">
                            <TableCell colSpan={columnCount} className="p-0">
                                <Button
                                    onClick={handleAddTask}
                                    variant="ghost"
                                    className="w-full justify-start text-gray-400 hover:text-gray-600 rounded-none h-12"
                                >
                                    <Plus className="h-4 w-4 mr-2" /> Add task
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
