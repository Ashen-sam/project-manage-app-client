import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import type { TableAction } from "./tableTypes";

interface TableActionsProps<T> {
    row: T;
    actions: TableAction<T>[];
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
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {actions.map((action, index) => (
                    <DropdownMenuItem
                        key={index}
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
                        {action.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}