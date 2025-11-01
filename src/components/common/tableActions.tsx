import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, type LucideIcon } from "lucide-react";
import type { TableAction } from "./tableTypes";
import { Separator } from "../ui/separator";

interface TableActionsProps<T> {
    row: T;
    actions: TableAction<T>[];
    icon?: LucideIcon;
}

export function TableActions<T>({ row, actions }: TableActionsProps<T>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => e.stopPropagation()}
                >
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                {actions.map((action, index) => (
                    <div key={index}>
                        <DropdownMenuItem
                            onClick={(e) => {
                                e.stopPropagation();
                                action.onClick(row);
                            }}
                            className={
                                action.variant === "destructive"
                                    ? "text-destructive focus:text-destructive"
                                    : ""
                            }
                        >
                            {action.icon && <span className="mr-2">{action.icon}</span>}
                            {action.label}
                        </DropdownMenuItem>

                        {/* Add a separator except after the last item */}
                        {index < actions.length - 1 && <Separator className="my-1" />}
                    </div>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
