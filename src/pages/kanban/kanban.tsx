import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample data structure
interface Task {
    id: string;
    title: string;
    priority: "high" | "medium" | "low";
    dateRange: string;
    description: string;
    subtasks: number;
    attachments: number;
    image?: string;
}

interface Column {
    id: string;
    title: string;
    color: string;
    tasks: Task[];
}

const columns: Column[] = [
    {
        id: "new",
        title: "New request",
        color: "bg-red-500",
        tasks: [
            {
                id: "1",
                title: "Hero section",
                priority: "high",
                dateRange: "20 May, 2023 - 21 May, 2023",
                description: "Use attached image and don't forget to stick with the brand voice. Make it elegant and don't overload rounded...",
                subtasks: 5,
                attachments: 3,
            },
            {
                id: "2",
                title: "Careers",
                priority: "medium",
                dateRange: "21 May, 2023 - 26 May, 2023",
                description: "Use attached image and don't forget to stick with the brand voice. Make it elegant and don't overload rounded...",
                subtasks: 5,
                attachments: 3,
            },
            {
                id: "3",
                title: "Knowledge Center",
                priority: "low",
                dateRange: "",
                description: "",
                subtasks: 0,
                attachments: 0,
                image: "placeholder",
            },
        ],
    },
    {
        id: "progress",
        title: "In Progress",
        color: "bg-blue-500",
        tasks: [
            {
                id: "4",
                title: "About us section",
                priority: "high",
                dateRange: "19 May, 2023 - 23 May, 2023",
                description: "Use attached image and don't forget to stick with the brand voice. Make it elegant and don't overload rounded...",
                subtasks: 5,
                attachments: 3,
            },
            {
                id: "5",
                title: "Legal Notice",
                priority: "medium",
                dateRange: "26 May, 2023 - 29 May, 2023",
                description: "Use attached image and don't forget to stick with the brand voice. Make it elegant and don't overload rounded...",
                subtasks: 5,
                attachments: 3,
                image: "placeholder",
            },
        ],
    },
    {
        id: "review",
        title: "Need Review",
        color: "bg-yellow-500",
        tasks: [
            {
                id: "6",
                title: "Discover section",
                priority: "high",
                dateRange: "19 May, 2023 - 20 May, 2023",
                description: "Use attached image and don't forget to stick with the brand voice. Make it elegant and don't overload rounded...",
                subtasks: 5,
                attachments: 3,
                image: "placeholder",
            },
            {
                id: "7",
                title: "Provider",
                priority: "low",
                dateRange: "22 May, 2023 - 24 May, 2023",
                description: "Use attached image and don't forget to stick with the brand voice. Make it elegant and don't overload rounded...",
                subtasks: 5,
                attachments: 3,
            },
        ],
    },
    {
        id: "done",
        title: "Done",
        color: "bg-green-500",
        tasks: [
            {
                id: "8",
                title: "Purchase, finance, service section",
                priority: "high",
                dateRange: "11 May, 2023 - 18 May, 2023",
                description: "Use attached image and don't forget to stick with the brand voice. Make it elegant and don't overload rounded...",
                subtasks: 5,
                attachments: 3,
            },
            {
                id: "9",
                title: "Terms Section",
                priority: "medium",
                dateRange: "21 May, 2023 - 26 May, 2023",
                description: "Use attached image and don't forget to stick with the brand voice. Make it elegant and don't overload rounded...",
                subtasks: 5,
                attachments: 3,
            },
        ],
    },
];

export const Board = () => {
    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "high":
                return "text-red-500";
            case "medium":
                return "text-yellow-500";
            case "low":
                return "text-blue-500";
            default:
                return "text-gray-500";
        }
    };

    return (
        <div className="flex gap-4 h-full overflow-x-auto pb-4">
            {columns.map((column) => (
                <div
                    key={column.id}
                    className="flex-shrink-0 w-80 flex flex-col"
                >
                    {/* Column Header */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${column.color}`} />
                            <h3 className="font-semibold text-sm">{column.title}</h3>
                        </div>
                        <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Plus className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Tasks */}
                    <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
                        {column.tasks.map((task) => (
                            <Card key={task.id} className="hover:shadow-md transition-shadow">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <Badge
                                                variant="secondary"
                                                className={`text-xs mb-2 ${getPriorityColor(task.priority)}`}
                                            >
                                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                                            </Badge>
                                            <CardTitle className="text-base font-semibold">
                                                {task.title}
                                            </CardTitle>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-6 w-6 -mt-1">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="pb-4">
                                    {task.image && (
                                        <div className="w-full h-24 bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-200 rounded-md mb-3 flex items-center justify-center">
                                            <div className="flex gap-2">
                                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                                    <div
                                                        key={i}
                                                        className={`w-6 h-6 rounded-full ${i === 5
                                                                ? "bg-yellow-400"
                                                                : i % 2 === 0
                                                                    ? "bg-purple-400"
                                                                    : "bg-black"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {task.dateRange && (
                                        <p className="text-xs text-muted-foreground mb-2">
                                            📅 {task.dateRange}
                                        </p>
                                    )}
                                    {task.description && (
                                        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                                            {task.description}
                                        </p>
                                    )}
                                    {(task.subtasks > 0 || task.attachments > 0) && (
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                            <span>📋 {task.subtasks} Subtasks</span>
                                            <span>📎 {task.attachments} Attachments</span>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};