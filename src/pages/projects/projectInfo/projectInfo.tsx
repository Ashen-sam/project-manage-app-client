import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Outlet, useNavigate, useParams, useLocation } from "react-router-dom";
import { LayoutDashboard, CheckSquare, Calendar } from "lucide-react";

export const ProjectInfo = () => {
    const navigate = useNavigate();
    const { projectId } = useParams();
    const location = useLocation();

    // Determine active tab based on current route
    const getActiveTab = () => {
        const path = location.pathname;
        if (path.includes("/tasks")) return "tasks";
        if (path.includes("/calendar")) return "calendar";
        return "overview";
    };

    const handleTabChange = (value: string) => {
        switch (value) {
            case "overview":
                navigate(`/projects/${projectId}`);
                break;
            case "tasks":
                navigate(`/projects/${projectId}/tasks`);
                break;
            case "calendar":
                navigate(`/projects/${projectId}/calendar`);
                break;
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header Section */}
            <div className="border-b ">
                <div className="px-6">
                    <Tabs value={getActiveTab()} onValueChange={handleTabChange}>
                        <TabsList className="h-auto p-0 bg-transparent border-0 gap-1">
                            <TabsTrigger
                                value="overview"
                                className="rounded-none px-4 py-3 data-[state=active]:bg-transparent data-[state=active]:text-purple-700 data-[state=active]:border-b-2 data-[state=active]:border-purple-700 data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=inactive]:border-b-2 data-[state=inactive]:border-transparent hover:text-purple-700 transition-colors gap-2 border-0 shadow-none"
                            >
                                <LayoutDashboard className="h-4 w-4" />
                                <span className="text-sm font-medium">Overview</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="tasks"
                                className="rounded-none px-4 py-3 data-[state=active]:bg-transparent data-[state=active]:text-purple-700 data-[state=active]:border-b-2 data-[state=active]:border-purple-700 data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=inactive]:border-b-2 data-[state=inactive]:border-transparent hover:text-purple-700 transition-colors gap-2 border-0 shadow-none"
                            >
                                <CheckSquare className="h-4 w-4" />
                                <span className="text-sm font-medium">Tasks</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="calendar"
                                className="rounded-none px-4 py-3 data-[state=active]:bg-transparent data-[state=active]:text-purple-700 data-[state=active]:border-b-2 data-[state=active]:border-purple-700 data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=inactive]:border-b-2 data-[state=inactive]:border-transparent hover:text-purple-700 transition-colors gap-2 border-0 shadow-none"
                            >
                                <Calendar className="h-4 w-4" />
                                <span className="text-sm font-medium">Calendar</span>
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </div>

            {/* Content Section */}
            <div className="px-6 py-6">
                <Outlet />
            </div>
        </div>
    );
};