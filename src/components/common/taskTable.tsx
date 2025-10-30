// TaskTable.tsx
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Check, Plus, Trash2, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import type { Task, TaskPriority, TaskStatus, TaskTableProps } from './taskTypes';

export const TaskTable: React.FC<TaskTableProps> = ({
    tasks,
    onUpdate,
    onDelete,
    onAdd,
}) => {
    const [editingCell, setEditingCell] = useState<{ taskId: number; field: string } | null>(null);
    const [editValue, setEditValue] = useState<string>('');
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        status: 'Todo' as TaskStatus,
        priority: 'Medium' as TaskPriority,
        assignee: '',
        dueDate: '',
        projectName: '',
    });
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (editingCell && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [editingCell]);

    const handleCellClick = (taskId: number, field: string, currentValue: string) => {
        setEditingCell({ taskId, field });
        setEditValue(currentValue);
    };

    const handleCellBlur = (task: Task, field: string) => {
        if (editValue !== task[field as keyof Task]) {
            onUpdate?.({ ...task, [field]: editValue });
        }
        setEditingCell(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent, task: Task, field: string) => {
        if (e.key === 'Enter') {
            handleCellBlur(task, field);
        } else if (e.key === 'Escape') {
            setEditingCell(null);
        }
    };

    const handleStatusChange = (task: Task, newStatus: TaskStatus) => {
        onUpdate?.({ ...task, status: newStatus });
    };

    const handlePriorityChange = (task: Task, newPriority: TaskPriority) => {
        onUpdate?.({ ...task, priority: newPriority });
    };

    const handleAddTask = () => {
        if (newTask.title.trim()) {
            onAdd?.(newTask);
            setNewTask({
                title: '',
                description: '',
                status: 'Todo',
                priority: 'Medium',
                assignee: '',
                dueDate: '',
                projectName: '',
            });
            setIsAddingTask(false);
        }
    };

    const handleCancelAdd = () => {
        setNewTask({
            title: '',
            description: '',
            status: 'Todo',
            priority: 'Medium',
            assignee: '',
            dueDate: '',
            projectName: '',
        });
        setIsAddingTask(false);
    };



    const renderEditableCell = (task: Task, field: keyof Task) => {
        const isEditing = editingCell?.taskId === task.id && editingCell?.field === field;
        const value = task[field] as string;

        if (isEditing) {
            return (
                <Input
                    ref={inputRef}
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => handleCellBlur(task, field)}
                    onKeyDown={(e) => handleKeyDown(e, task, field)}
                    className="h-8 px-2"
                />
            );
        }

        return (
            <div
                onClick={() => handleCellClick(task.id, field, value)}
                className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded min-h-8 flex items-center"
            >
                {value || <span className="text-gray-400">Click to edit</span>}
            </div>
        );
    };

    return (
        <div className="w-full border rounded-sm overflow-hidden  ">
            <Table className="">
                <TableHeader className='border-l-7 border-l-purple-400' >
                    <TableRow className="bg-gray-50 hover:bg-gray-50 border-b-2">
                        <TableHead className="w-12">
                            <Checkbox
                                className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                            />
                        </TableHead>
                        <TableHead className="font-semibold">Task</TableHead>
                        <TableHead className="font-semibold">Update</TableHead>
                        <TableHead className="font-semibold w-32">Owner</TableHead>
                        <TableHead className="font-semibold w-40">Status</TableHead>
                        <TableHead className="font-semibold w-32">Priority</TableHead>
                        <TableHead className="font-semibold w-32">Due date</TableHead>
                        <TableHead className="w-12">

                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className='border-l-7 border-l-purple-600' >
                    {tasks.map((task) => {

                        return (
                            <TableRow key={task.id} className="hover:bg-gray-50 border-b">
                                <TableCell>
                                    <Checkbox
                                        checked={task.status === 'Done'}
                                        onCheckedChange={() => {
                                            handleStatusChange(task, task.status === 'Done' ? 'Todo' : 'Done');
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {renderEditableCell(task, 'title')}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {renderEditableCell(task, 'title')}

                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                                                <Avatar className="h-6 w-6">
                                                    <AvatarFallback className="bg-gray-800 text-white text-xs">
                                                        {task.assignee ? task.assignee.charAt(0).toUpperCase() : '?'}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-64 p-2">
                                            <Input
                                                value={task.assignee}
                                                onChange={(e) => onUpdate?.({ ...task, assignee: e.target.value })}
                                                placeholder="Enter assignee name"
                                                className="h-8"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                                <TableCell>
                                    <Select

                                        value={task.status}
                                        onValueChange={(value: TaskStatus) => handleStatusChange(task, value)}
                                    >
                                        <SelectTrigger
                                            size='sm'
                                            className={`h-2 border-0 text-xs p-1`}
                                        >
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent  >
                                            <SelectItem value="Todo">Todo</SelectItem>
                                            <SelectItem value="In Progress">Working on it</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={task.priority}
                                        onValueChange={(value: TaskPriority) => handlePriorityChange(task, value)}
                                    >
                                        <SelectTrigger className="h-2 border-0 text-xs p-1">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Low">Low</SelectItem>
                                            <SelectItem value="Medium">Medium</SelectItem>
                                            <SelectItem value="High">High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="h-5 border-0 hover:bg-gray-100 cursor-pointer justify-start text-left font-normal px-2"
                                            >
                                                <CalendarIcon className="mr-2 h-3 w-3" />
                                                {task.dueDate ? format(new Date(task.dueDate), "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={task.dueDate ? new Date(task.dueDate) : undefined}
                                                onSelect={(date) => {
                                                    onUpdate?.({ ...task, dueDate: date ? format(date, 'yyyy-MM-dd') : '' });
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>

                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8"
                                        onClick={() => onDelete?.(task.id)}
                                    >
                                        <Trash2 className="text-xs text-red-500 " />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}

                    {isAddingTask && (
                        <TableRow className="bg-blue-50 border-b-2 border-blue-200">
                            <TableCell>
                                <Checkbox disabled />
                            </TableCell>
                            <TableCell>
                                <Input
                                    value={newTask.title}
                                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                    placeholder="Task title"
                                    className="h-8"
                                    autoFocus
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleAddTask();
                                        if (e.key === 'Escape') handleCancelAdd();
                                    }}
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    value={newTask.assignee}
                                    onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                                    placeholder="Assignee"
                                    className="h-8"
                                />
                            </TableCell>
                            <TableCell>
                                <Select
                                    value={newTask.status}
                                    onValueChange={(value: TaskStatus) => setNewTask({ ...newTask, status: value })}
                                >
                                    <SelectTrigger className="h-8">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Todo">Todo</SelectItem>
                                        <SelectItem value="In Progress">Working on it</SelectItem>
                                        <SelectItem value="Done">Done</SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                            <TableCell>
                                <Select
                                    value={newTask.priority}
                                    onValueChange={(value: TaskPriority) => setNewTask({ ...newTask, priority: value })}
                                >
                                    <SelectTrigger className="h-8">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Low">Low</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="High">High</SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                            <TableCell>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="h-8 justify-start text-left font-normal"
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {newTask.dueDate ? format(new Date(newTask.dueDate), "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={newTask.dueDate ? new Date(newTask.dueDate) : undefined}
                                            onSelect={(date) => {
                                                setNewTask({ ...newTask, dueDate: date ? format(date, 'yyyy-MM-dd') : '' });
                                            }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </TableCell>

                            <TableCell>
                                <div className="flex gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={handleAddTask}
                                    >
                                        <Check className="h-4 w-4 text-green-600" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={handleCancelAdd}
                                    >
                                        <X className="h-4 w-4 text-red-600" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}

                    {!isAddingTask && (
                        <TableRow className="hover:bg-gray-50 border-0">
                            <TableCell colSpan={8} className="py-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsAddingTask(true)}
                                    className="text-gray-500 hover:text-gray-700 gap-2 w-full justify-start h-8"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add task
                                </Button>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};