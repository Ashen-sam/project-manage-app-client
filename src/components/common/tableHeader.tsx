import { TableHead } from "@/components/ui/table";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import type { TableColumn, SortConfig } from "./tableTypes";

interface TableHeaderRowProps<T> {
    columns: TableColumn<T>[];
    sortConfig: SortConfig | null;
    onSort: (key: string) => void;
    hasActions: boolean;
}

export function TableHeaderRow<T>({
    columns,
    sortConfig,
    onSort,
    hasActions,
}: TableHeaderRowProps<T>) {
    const getSortIcon = (columnKey: string) => {
        if (sortConfig?.key !== columnKey) {
            return <ArrowUpDown className="ml-2 h-4 w-4" />;
        }
        return sortConfig.direction === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
        ) : (
            <ArrowDown className="ml-2 h-4 w-4" />
        );
    };

    return (
        <>
            {columns.map((column) => (
                <TableHead
                    key={column.key}
                    className={`
                        ${column.sortable ? "cursor-pointer select-none hover:bg-slate-100" : ""}
                        ${column.width || ""}
                    `}
                    onClick={() => column.sortable && onSort(column.key)}
                    style={column.width ? { width: column.width } : undefined}
                >
                    <div className="flex items-center">
                        <span>{column.header}</span>
                        {column.sortable && getSortIcon(column.key)}
                    </div>
                </TableHead>
            ))}
            {hasActions && (
                <TableHead className=" w-[100px]">Actions</TableHead>
            )}
        </>
    );
}