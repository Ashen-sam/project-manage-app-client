import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

// Types
export interface CalendarEvent {
    id: string;
    title: string;
    date: Date;
    time: string;
    color: string;
}

export interface CalendarProps {
    events?: CalendarEvent[];
    initialDate?: Date;
    onEventClick?: (event: CalendarEvent) => void;
    onAddEvent?: () => void;
    onDateChange?: (date: Date) => void;
    showSearch?: boolean;
    showAddButton?: boolean;
    showTodayButton?: boolean;
    className?: string;
    highlightToday?: boolean;
    maxEventsPerDay?: number;
}

// Reusable Calendar Component
export const CalendarCommon = ({
    events = [],
    initialDate = new Date(),
    onEventClick,
    onAddEvent,
    onDateChange,
    showSearch = true,
    showAddButton = true,
    showTodayButton = true,
    className = "",
    highlightToday = true,
    maxEventsPerDay = 3,
}: CalendarProps) => {
    const [currentDate, setCurrentDate] = useState(initialDate);

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month, 1).getDay();
    };

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const dayNames = ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const previousMonth = () => {
        const newDate = new Date(year, month - 1, 1);
        setCurrentDate(newDate);
        onDateChange?.(newDate);
    };

    const nextMonth = () => {
        const newDate = new Date(year, month + 1, 1);
        setCurrentDate(newDate);
        onDateChange?.(newDate);
    };

    const goToToday = () => {
        const today = new Date();
        setCurrentDate(today);
        onDateChange?.(today);
    };

    const getEventsForDay = (day: number, targetMonth: number, targetYear: number) => {
        return events.filter(
            (event) =>
                event.date.getFullYear() === targetYear &&
                event.date.getMonth() === targetMonth &&
                event.date.getDate() === day
        );
    };

    const isToday = (day: number, checkMonth: number, checkYear: number) => {
        if (!highlightToday) return false;
        const today = new Date();
        return (
            day === today.getDate() &&
            checkMonth === today.getMonth() &&
            checkYear === today.getFullYear()
        );
    };

    const renderCalendarDays = () => {
        const days = [];
        const totalCells = 35;

        const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

        const prevMonthDays = getDaysInMonth(new Date(year, month - 1, 1));
        const prevMonth = month === 0 ? 11 : month - 1;
        const prevYear = month === 0 ? year - 1 : year;

        for (let i = adjustedFirstDay - 1; i >= 0; i--) {
            const prevDay = prevMonthDays - i;
            const prevEvents = getEventsForDay(prevDay, prevMonth, prevYear);

            days.push(
                <div
                    key={`prev-${i}`}
                    className="min-h-[120px] border-r border-b p-3 bg-gray-50/50"
                >
                    <span className="text-sm text-gray-400 font-medium">{prevDay}</span>
                    <div className="mt-2 space-y-1">
                        {prevEvents.slice(0, maxEventsPerDay).map((event) => (
                            <div
                                key={event.id}
                                onClick={() => onEventClick?.(event)}
                                className="text-xs px-2 py-1 rounded border truncate opacity-60 cursor-pointer"
                            >
                                <span className={cn("font-medium", event.color)}>
                                    {event.title}
                                </span>
                                <span className="text-gray-500 ml-1">{event.time}</span>
                            </div>
                        ))}
                        {prevEvents.length > maxEventsPerDay && (
                            <div className="text-xs text-gray-400 px-2">
                                {prevEvents.length - maxEventsPerDay} more...
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayEvents = getEventsForDay(day, month, year);
            const isTodayDate = isToday(day, month, year);

            days.push(
                <div
                    key={day}
                    className={cn(
                        "min-h-[120px] border-r border-b p-3 hover:bg-slate-50 transition-colors relative",
                        isTodayDate && "bg-blue-50/30"
                    )}
                >
                    <span
                        className={cn(
                            "text-sm font-medium inline-flex items-center justify-center",
                            isTodayDate && "bg-blue-600 text-white rounded-full w-6 h-6"
                        )}
                    >
                        {day}
                    </span>
                    <div className="mt-2 space-y-1">
                        {dayEvents.slice(0, maxEventsPerDay).map((event) => (
                            <div
                                key={event.id}
                                onClick={() => onEventClick?.(event)}
                                className="text-xs px-2 py-1 rounded border truncate cursor-pointer hover:shadow-sm transition-shadow"
                            >
                                <span className={cn("font-medium", event.color)}>
                                    {event.title}
                                </span>
                                <span className="text-gray-500 ml-1">{event.time}</span>
                            </div>
                        ))}
                        {dayEvents.length > maxEventsPerDay && (
                            <div className="text-xs text-gray-500 px-2">
                                {dayEvents.length - maxEventsPerDay} more...
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        const remainingCells = totalCells - days.length;
        for (let day = 1; day <= remainingCells; day++) {
            days.push(
                <div
                    key={`next-${day}`}
                    className="min-h-[120px] border-r border-b p-3 bg-gray-50/50"
                >
                    <span className="text-sm text-gray-400 font-medium">{day}</span>
                </div>
            );
        }

        return days;
    };

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month, daysInMonth);

    return (
        <div className={cn("flex flex-col h-screen", className)}>
            <div className="border-b">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 mb-2">
                        <div className="flex flex-col items-center justify-center border text-primary rounded-sm px-3 py-2">
                            <span className="text-xl font-bold">
                                {new Date().getDate()}
                            </span>
                        </div>

                        <div>
                            <h1 className="text-xl font-semibold">
                                {monthNames[month]} {year}
                            </h1>
                            <p className="text-sm text-gray-500">
                                {monthNames[startDate.getMonth()]} {startDate.getDate()},{" "}
                                {startDate.getFullYear()} – {monthNames[endDate.getMonth()]}{" "}
                                {endDate.getDate()}, {endDate.getFullYear()}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {showSearch && (
                            <Button variant="outline" size="icon" className="h-9 w-9">
                                <Search className="h-4 w-4" />
                            </Button>
                        )}

                        <div className="flex items-center border rounded-lg">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 rounded-r-none"
                                onClick={previousMonth}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            {showTodayButton && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-9 px-4 rounded-none border-x"
                                    onClick={goToToday}
                                >
                                    Today
                                </Button>
                            )}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 rounded-l-none"
                                onClick={nextMonth}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>

                        {showAddButton && (
                            <Button size="sm" className="h-9" onClick={onAddEvent}>
                                <Plus strokeWidth={3} className="h-4 w-4" />
                                Event
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-auto">
                <div className="grid grid-cols-7 border-b sticky top-0 z-10 bg-white">
                    {dayNames.map((day) => (
                        <div
                            key={day}
                            className="text-left px-3 py-3 text-xs font-medium text-gray-600 border-r last:border-r-0"
                        >
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7">{renderCalendarDays()}</div>
            </div>
        </div>
    );
};