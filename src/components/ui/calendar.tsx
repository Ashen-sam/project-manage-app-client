import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  color: string;
}

const mockEvents: Event[] = [
  { id: "1", title: "One-on-one wi...", date: new Date(2025, 0, 2), time: "10:00 AM", color: "text-red-600" },
  { id: "2", title: "All-hands meeti...", date: new Date(2025, 0, 2), time: "4:00 PM", color: "text-purple-700" },
  { id: "3", title: "Dinner with C...", date: new Date(2025, 0, 2), time: "6:30 PM", color: "text-green-600" },
  { id: "4", title: "Friday standup", date: new Date(2025, 0, 3), time: "9:00 AM", color: "text-blue-600" },
  { id: "5", title: "House inspec...", date: new Date(2025, 0, 4), time: "10:30 AM", color: "text-orange-600" },
  { id: "6", title: "Morning standup", date: new Date(2025, 0, 1), time: "9:00 AM", color: "text-gray-600" },
  { id: "7", title: "Coffee with Alex", date: new Date(2025, 0, 1), time: "11:00 AM", color: "text-blue-600" },
  { id: "8", title: "Marketing afte...", date: new Date(2025, 0, 1), time: "2:30 PM", color: "text-purple-600" },
  { id: "9", title: "Morning standup", date: new Date(2024, 11, 30), time: "9:00 AM", color: "text-gray-600" },
  { id: "10", title: "Monday standup", date: new Date(2025, 0, 6), time: "9:00 AM", color: "text-gray-600" },
  { id: "11", title: "One-on-one wi...", date: new Date(2025, 0, 7), time: "9:00 AM", color: "text-red-600" },
  { id: "12", title: "Content planni...", date: new Date(2025, 0, 6), time: "11:00 AM", color: "text-blue-600" },

];

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1));

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

    // Adjust firstDay to make Monday the first day (0 = Sunday in JS, we want Monday = 0)
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

    // Previous month days
    const prevMonthDays = getDaysInMonth(new Date(year, month - 1, 1));
    for (let i = adjustedFirstDay - 1; i >= 0; i--) {
      const prevDay = prevMonthDays - i;
      const prevEvents = mockEvents.filter(
        (event) =>
          event.date.getFullYear() === (month === 0 ? year - 1 : year) &&
          event.date.getMonth() === (month === 0 ? 11 : month - 1) &&
          event.date.getDate() === prevDay
      );

      days.push(
        <div
          key={`prev-${i}`}
          className="min-h-[120px] border-r border-b p-3 bg-gray-50/50"
        >
          <span className="text-sm text-gray-400 font-medium">{prevDay}</span>
          <div className="mt-2 space-y-1">
            {prevEvents.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className="text-xs px-2 py-1 rounded bg-white border truncate opacity-60"
              >
                <span className={cn("font-medium", event.color)}>
                  {event.title}
                </span>
                <span className="text-gray-500 ml-1">{event.time}</span>
              </div>
            ))}
            {prevEvents.length > 3 && (
              <div className="text-xs text-gray-400 px-2">
                {prevEvents.length - 3} more...
              </div>
            )}
          </div>
        </div>
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const events = getEventsForDay(day);
      const isToday = day === 10 && month === 0 && year === 2025;

      days.push(
        <div
          key={day}
          className={cn(
            "min-h-[120px] border-r border-b p-3 bg-white hover:bg-gray-50 transition-colors relative",
            isToday && "bg-blue-50/30"
          )}
        >
          <span className={cn(
            "text-sm font-medium inline-flex items-center justify-center",
            isToday && "bg-blue-600 text-white rounded-full w-6 h-6"
          )}>
            {day}
          </span>
          <div className="mt-2 space-y-1">
            {events.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className="text-xs px-2 py-1 rounded bg-white border truncate cursor-pointer hover:shadow-sm transition-shadow"
              >
                <span className={cn("font-medium", event.color)}>
                  {event.title}
                </span>
                <span className="text-gray-500 ml-1">{event.time}</span>
              </div>
            ))}
            {events.length > 3 && (
              <div className="text-xs text-gray-500 px-2">
                {events.length - 3} more...
              </div>
            )}
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
    <div className="flex flex-col bg-white">
      {/* Header */}
      <div className=" ">
        <div className="flex items-center justify-between">
          {/* Left side - Date info */}
          <div className="flex items-center gap-6 mb-2">
            <div className="flex flex-col items-center justify-center bg-white border rounded-sm px-3 py-2">
              <span className="text-xl font-bold text-purple-700">10</span>
            </div>

            <div>
              <h1 className="text-xl font-semibold">
                {monthNames[month]} {year}
              </h1>
              <p className="text-sm text-gray-500">
                {monthNames[startDate.getMonth()]} {startDate.getDate()}, {startDate.getFullYear()} – {monthNames[endDate.getMonth()]} {endDate.getDate()}, {endDate.getFullYear()}
              </p>
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Search className="h-4 w-4" />
            </Button>

            <div className="flex items-center border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-r-none"
                onClick={previousMonth}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 px-4 rounded-none border-x"
              >
                Today
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-l-none"
                onClick={nextMonth}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>


            <Button size={'sm'} className="h-9 text-sm" >
              <Plus className="h-4 w-4" />
              Event
            </Button>
          </div>
        </div>
      </div >

      {/* Calendar Grid */}
      < div className="flex-1 overflow-auto border rounded-sm" >
        {/* Day Headers */}
        <div className="grid grid-cols-7 border-b bg-white sticky top-0 z-10" >
          {
            dayNames.map((day) => (
              <div
                key={day}
                className="text-left px-3 py-3 text-xs font-medium text-gray-600 border-r last:border-r-0"
              >
                {day}
              </div>
            ))
          }
        </div >

        {/* Calendar Days */}
        < div className="grid grid-cols-7" >
          {renderCalendarDays()}
        </div >
      </div >
    </div >
  );
}