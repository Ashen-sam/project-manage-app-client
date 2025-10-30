import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
    Calendar,
    CheckSquare,
    ChevronDown,
    Folder,
    Inbox,
    ListTodo,
    Settings,
    Target
} from "lucide-react";
import { Link } from "react-router-dom";
import type { SidebarProps } from "./types";
import { ModeToggle } from "../common/mode-toggle";

const topNavItems = [
    { to: "/", icon: Inbox, label: "Home" },
    { to: "/tasks", icon: CheckSquare, label: "My Tasks" }
];

const workspaceItems = [
    { to: "/projects", icon: Folder, label: "Projects" },
    { to: "/calendar", icon: Calendar, label: "Calendar" },
    { to: "/todo", icon: ListTodo, label: "Todo" },
    { to: "/goals", icon: Target, label: "Goals" }
];

export const Sidebar = ({ className }: SidebarProps) => {

    return (
        <div
            className={cn(
                "flex flex-col border-r  w-[200px]",
                className
            )}
        >
            {/* User Header */}
            <div className="flex items-center gap-2 px-3 py-3 border-b">
                <div className="flex items-center justify-center w-6 h-6 rounded bg-amber-500 text-white text-xs font-semibold">
                    AS
                </div>
                <span className="text-sm font-medium flex-1">ashen sam</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
            <ModeToggle />

            <ScrollArea className="flex-1">
                {/* Top Navigation */}
                <div className="px-2 py-2 space-y-0.5">
                    {topNavItems.map((item) => (
                        <Link key={item.to} to={item.to}>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start gap-2 h-8 px-2 text-sm font-normal"
                            >
                                <item.icon className="h-4 w-4" />
                                <span>{item.label}</span>
                            </Button>
                        </Link>
                    ))}
                </div>

                <Separator className="my-2" />

                <div className="px-2 py-2">
                    <div className="flex items-center gap-1 px-2 py-1">
                        <span className="text-xs font-semibold text-muted-foreground">Work Space</span>
                    </div>
                    <div className="mt-1 space-y-0.5">
                        {workspaceItems.map((item) => (
                            <Link key={item.to} to={item.to}>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-start gap-2 h-8 px-2 text-sm font-normal"
                                >
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.label}</span>
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>

                <Separator className="my-2" />

                <div className="px-2 py-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start gap-2 h-8 px-2 text-sm font-normal"
                    >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                    </Button>
                </div>
            </ScrollArea>
        </div>
    );
};