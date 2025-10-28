import type { Column, SortConfig } from "@/components/common/tableTypes";
import { useState } from "react";

export function useTableSort<T>() {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const handleSort = (key: string) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        return {
          key,
          direction: current.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  const sortData = (data: T[], columns: Column<T>[]) => {
    if (!sortConfig) return data;

    const column = columns.find((col) => col.key === sortConfig.key);
    if (!column) return data;

    return [...data].sort((a, b) => {
      const aValue = column.accessor(a);
      const bValue = column.accessor(b);

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  return { sortConfig, handleSort, sortData };
}
