import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
    Inbox,
    CheckSquare,
    Folder,
    Settings,
    ChevronDown,
} from "lucide-react";
import type { SidebarProps } from "./types";
import { Link } from "react-router-dom";

export const Sidebar = ({ className }: SidebarProps) => {
    return (
        <div
            className={cn(
                "flex flex-col border-r bg-slate-50 w-[220px]",
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

            <ScrollArea className="flex-1">
                {/* Top Navigation */}
                <div className="px-2 py-2 space-y-0.5">
                    <Link to="/">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start gap-2 h-8 px-2 text-sm font-normal"
                        >
                            <Inbox className="h-4 w-4" />
                            <span>Home</span>
                        </Button>
                    </Link>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start gap-2 h-8 px-2 text-sm font-normal"
                    >
                        <CheckSquare className="h-4 w-4" />
                        <span>My Tasks</span>
                    </Button>
                </div>

                <Separator className="my-2" />

                {/* Workspace Section */}
                <div className="px-2 py-2">
                    <div className="flex items-center gap-1 px-2 py-1">
                        <span className="text-xs font-semibold text-muted-foreground">Workspace</span>
                    </div>
                    <div className="mt-1 space-y-0.5">
                        <Link to="/projects">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start gap-2 h-8 px-2 text-sm font-normal"
                            >
                                <Folder className="h-4 w-4" />
                                <span>Projects</span>
                            </Button>
                        </Link>
                    </div>
                </div>

                <Separator className="my-2" />

                {/* Settings */}
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