import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, CheckSquare, LayoutDashboard } from "lucide-react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

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
            <div className="border-b">
                <div className="">
                    <Tabs value={getActiveTab()} onValueChange={handleTabChange}>
                        <TabsList className="h-auto p-0 bg-transparent border-0 gap-1">
                            <TabsTrigger
                                value="overview"
                                className="rounded-none  px-4 py-3 dark:data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=inactive]:border-b-2 data-[state=inactive]:border-transparent hover:text-primary transition-colors gap-2 border-0 shadow-none"
                            >
                                <LayoutDashboard className="h-4 w-4" />
                                <span className="text-sm font-medium">Overview</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="tasks"
                                className="rounded-none dark:data-[state=active]:border-primary px-4 py-3 data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=inactive]:border-b-2 data-[state=inactive]:border-transparent hover:text-primary transition-colors gap-2 border-0 shadow-none"
                            >
                                <CheckSquare className="h-4 w-4" />
                                <span className="text-sm font-medium">Tasks</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="calendar"
                                className="rounded-none dark:data-[state=active]:border-primary px-4 py-3 data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=inactive]:border-b-2 data-[state=inactive]:border-transparent hover:text-primary transition-colors gap-2 border-0 shadow-none"
                            >
                                <Calendar className="h-4 w-4" />
                                <span className="text-sm font-medium">Calendar</span>
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </div>

            {/* Content Section */}
            <div className=" py-3">
                <Outlet />
            </div>
        </div>
    );
};