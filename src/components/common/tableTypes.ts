// tableTypes.ts
export interface TableColumn<T> {
  key: string;
  header: string;
  accessor: (row: T) => React.ReactNode;
  sortable?: boolean;
  searchable?: boolean;
}

export interface TableAction<T> {
  label: string;
  onClick: (row: T) => void;
  icon?: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "ghost";
}

export interface CommonTableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: TableColumn<T>[];
  actions?: TableAction<T>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  className?: string;
  // Checkbox props
  selectable?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;
  rowKey?: keyof T; // Unique identifier for each row (e.g., 'id')
}
