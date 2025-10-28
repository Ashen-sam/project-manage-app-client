import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Event {
    id: string;
    title: string;
    date: Date;
    color: string;
}

const mockEvents: Event[] = [
    { id: "1", title: "Event name", date: new Date(2023, 6, 2), color: "bg-blue-500" },
    { id: "2", title: "Event name", date: new Date(2023, 6, 4), color: "bg-purple-500" },
    { id: "3", title: "Event name", date: new Date(2023, 6, 5), color: "bg-pink-500" },
    { id: "4", title: "Event name", date: new Date(2023, 6, 15), color: "bg-blue-500" },
    { id: "5", title: "Event name", date: new Date(2023, 6, 26), color: "bg-blue-500" },
    { id: "6", title: "Event name", date: new Date(2023, 6, 30), color: "bg-pink-500" },
];

export const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date(2023, 6, 1));
    const [view, setView] = useState<"week" | "month" | "year">("month");

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

    const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const previousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const getEventsForDay = (day: number) => {
        return mockEvents.filter(
            (event) =>
                event.date.getFullYear() === year &&
                event.date.getMonth() === month &&
                event.date.getDate() === day
        );
    };

    const renderCalendarDays = () => {
        const days = [];
        const totalCells = 35;

        // Previous month days
        const prevMonthDays = getDaysInMonth(new Date(year, month - 1, 1));
        for (let i = firstDay - 1; i >= 0; i--) {
            days.push(
                <div
                    key={`prev-${i}`}
                    className="min-h-[100px] border-r border-b p-2 bg-muted/20"
                >
                    <span className="text-sm text-muted-foreground">
                        {prevMonthDays - i}
                    </span>
                </div>
            );
        }

        // Current month days
        for (let day = 1; day <= daysInMonth; day++) {
            const events = getEventsForDay(day);
            days.push(
                <div
                    key={day}
                    className="min-h-[100px] border-r border-b p-2 hover:bg-muted/50 transition-colors"
                >
                    <span className="text-sm font-medium">{day}</span>
                    <div className="mt-1 space-y-1">
                        {events.map((event) => (
                            <div
                                key={event.id}
                                className={cn(
                                    "text-xs px-2 py-1 rounded text-white truncate cursor-pointer",
                                    event.color
                                )}
                            >
                                {event.title}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        // Next month days
        const remainingCells = totalCells - days.length;
        for (let day = 1; day <= remainingCells; day++) {
            days.push(
                <div
                    key={`next-${day}`}
                    className="min-h-[100px] border-r border-b p-2 bg-muted/20"
                >
                    <span className="text-sm text-muted-foreground">{day}</span>
                </div>
            );
        }

        return days;
    };

    return (
        <div className="flex flex-col h-full bg-background p-6">
            {/* Header */}
            <div className="mb-6">

                <div className="flex items-center justify-between">
                    {/* View Toggle */}
                    <div className="flex items-center gap-1 border rounded-md p-1">
                        <span className="text-sm text-muted-foreground mr-2 ml-2">
                            Calendar View
                        </span>
                        <Button
                            variant={view === "week" ? "secondary" : "ghost"}
                            size="sm"
                            className="h-7 px-3 text-xs"
                            onClick={() => setView("week")}
                        >
                            WEEK
                        </Button>
                        <Button
                            variant={view === "month" ? "secondary" : "ghost"}
                            size="sm"
                            className="h-7 px-3 text-xs"
                            onClick={() => setView("month")}
                        >
                            MONTH
                        </Button>
                        <Button
                            variant={view === "year" ? "secondary" : "ghost"}
                            size="sm"
                            className="h-7 px-3 text-xs"
                            onClick={() => setView("year")}
                        >
                            YEAR
                        </Button>
                    </div>

                    {/* Month Navigation */}
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={previousMonth}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-lg font-semibold min-w-[150px] text-center">
                            {monthNames[month]} {year}
                        </span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={nextMonth}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="flex-1 border rounded-lg overflow-hidden">
                {/* Day Headers */}
                <div className="grid grid-cols-7 bg-primary">
                    {dayNames.map((day) => (
                        <div
                            key={day}
                            className="text-center py-3 text-sm font-semibold text-primary-foreground border-r last:border-r-0"
                        >
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 bg-background">
                    {renderCalendarDays()}
                </div>
            </div>
        </div>
    );
};