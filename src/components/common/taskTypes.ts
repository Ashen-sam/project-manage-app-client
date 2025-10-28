export type TaskStatus = "Todo" | "In Progress" | "Done";
export type TaskPriority = "Low" | "Medium" | "High";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  dueDate: string;
  projectName: string;
}

export interface TaskTableProps {
  tasks: Task[];
  onUpdate?: (task: Task) => void;
  onDelete?: (taskId: number) => void;
  onAdd?: (task: Omit<Task, "id">) => void;
}
