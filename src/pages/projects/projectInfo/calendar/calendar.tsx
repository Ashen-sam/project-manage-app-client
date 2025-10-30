import { CalendarCommon, type CalendarEvent } from "@/components/common/calendarCommon";

export const Calendar = () => {
    const mockEvents: CalendarEvent[] = [
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

    const handleEventClick = (event: CalendarEvent) => {
        alert(`Clicked: ${event.title} at ${event.time}`);
    };

    const handleAddEvent = () => {
        alert("Add event clicked!");
    };

    const handleDateChange = (date: Date) => {
        console.log("Date changed to:", date);
    };

    return (
        <CalendarCommon
            events={mockEvents}
            initialDate={new Date(2025, 0, 1)}
            onEventClick={handleEventClick}
            onAddEvent={handleAddEvent}
            onDateChange={handleDateChange}
            showSearch={true}
            showAddButton={true}
            showTodayButton={true}
            highlightToday={true}
            maxEventsPerDay={3}
        />
    );
};
