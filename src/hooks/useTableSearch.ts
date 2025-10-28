import type { Column } from "@/components/common/tableTypes";
import { useState } from "react";

export function useTableSearch<T>() {
  const [searchTerm, setSearchTerm] = useState("");

  const filterData = (data: T[], columns: Column<T>[]) => {
    if (!searchTerm) return data;

    return data.filter((row) =>
      columns.some((column) => {
        const value = column.accessor(row);
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  };

  return { searchTerm, setSearchTerm, filterData };
}
