import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import type { CommonTableProps } from "./tableTypes";
import { useTableSearch, useTableSort } from "@/hooks";
import { TableSearch } from "./tableSearch";
import { TableHeaderRow } from "./tableHeader";
import { TableActions } from "./tableActions";

export function CommonTable<T extends Record<string, unknown>>({
    data,
    columns,
    actions,
    searchable = false,
    searchPlaceholder = "Search...",
    emptyMessage = "No data available",
    onRowClick,
    className,
    selectable = false,
    onSelectionChange,
    rowKey = "id" as keyof T,
}: CommonTableProps<T>) {
    const { searchTerm, setSearchTerm, filterData } = useTableSearch<T>();
    const { sortConfig, handleSort, sortData } = useTableSort<T>();

    const [selectedRows, setSelectedRows] = useState<Set<unknown>>(new Set());

    const filteredData = searchable ? filterData(data, columns) : data;
    const sortedData = sortData(filteredData, columns);

    // Reset selection when data changes
    useEffect(() => {
        setSelectedRows(new Set());
    }, [data]);

    // Notify parent of selection changes
    useEffect(() => {
        if (onSelectionChange) {
            const selected = sortedData.filter((row) =>
                selectedRows.has(row[rowKey])
            );
            onSelectionChange(selected);
        }
    }, [selectedRows, sortedData, onSelectionChange, rowKey]);

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            const allKeys = new Set(sortedData.map((row) => row[rowKey]));
            setSelectedRows(allKeys);
        } else {
            setSelectedRows(new Set());
        }
    };

    const handleSelectRow = (rowId: unknown, checked: boolean) => {
        const newSelected = new Set(selectedRows);
        if (checked) {
            newSelected.add(rowId);
        } else {
            newSelected.delete(rowId);
        }
        setSelectedRows(newSelected);
    };

    const isAllSelected = sortedData.length > 0 &&
        sortedData.every((row) => selectedRows.has(row[rowKey]));

    const isSomeSelected = sortedData.some((row) =>
        selectedRows.has(row[rowKey])
    ) && !isAllSelected;

    return (
        <div className={`w-full space-y-4 ${className || ""}`}>
            {searchable && (
                <TableSearch
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder={searchPlaceholder}
                />
            )}

            <div className="w-full overflow-hidden border rounded-md">
                <Table className="w-full ">
                    <TableHeader className="text-slate-500 text-xs">
                        <TableRow>
                            {selectable && (
                                <TableCell className="w-12">
                                    <Checkbox
                                        checked={isAllSelected}
                                        onCheckedChange={handleSelectAll}
                                        aria-label="Select all"
                                        className={isSomeSelected ? "data-[state=checked]:bg-primary" : ""}
                                    />
                                </TableCell>
                            )}
                            <TableHeaderRow
                                columns={columns}
                                sortConfig={sortConfig}
                                onSort={handleSort}
                                hasActions={!!actions && actions.length > 0}
                            />
                        </TableRow>
                    </TableHeader>
                    <TableBody className="text-xs">
                        {sortedData.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={
                                        columns.length +
                                        (actions ? 1 : 0) +
                                        (selectable ? 1 : 0)
                                    }
                                    className="h-24 text-center text-muted-foreground"
                                >
                                    {emptyMessage}
                                </TableCell>
                            </TableRow>
                        ) : (
                            sortedData.map((row, index) => {
                                const rowId = row[rowKey];
                                const isSelected = selectedRows.has(rowId);

                                return (
                                    <TableRow
                                        key={index}
                                        className={`
                                            ${onRowClick ? "cursor-pointer hover:bg-muted/50" : ""}
                                            ${isSelected ? "bg-muted/30" : ""}
                                        `}
                                        onClick={(e) => {
                                            if (
                                                (e.target as HTMLElement).closest('[role="checkbox"]') ||
                                                (e.target as HTMLElement).closest('.table-actions')
                                            ) {
                                                return;
                                            }
                                            onRowClick?.(row);
                                        }}
                                    >
                                        {selectable && (
                                            <TableCell className="w-12">
                                                <Checkbox
                                                    checked={isSelected}
                                                    onCheckedChange={(checked) =>
                                                        handleSelectRow(rowId, checked as boolean)
                                                    }
                                                    aria-label={`Select row ${index + 1}`}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                            </TableCell>
                                        )}
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.key}
                                                className="max-w-[230px] truncate"
                                                title={String(column.accessor(row))}
                                            >
                                                {column.accessor(row)}
                                            </TableCell>
                                        ))}
                                        {actions && actions.length > 0 && (
                                            <TableCell>
                                                <div className="table-actions">
                                                    <TableActions row={row} actions={actions} />
                                                </div>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </div>

            {sortedData.length > 0 && (
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div>
                        Showing {sortedData.length} of {data.length} results
                    </div>
                    {selectable && selectedRows.size > 0 && (
                        <div className="font-medium text-primary">
                            {selectedRows.size} row{selectedRows.size !== 1 ? "s" : ""} selected
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}