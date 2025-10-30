import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { Sidebar } from "../layout";

// Define breadcrumb labels for your routes
const breadcrumbLabels: Record<string, string> = {
    "/": "Home",
    "/projects": "Projects",
    "/board": "Board",
    "/calendar": "Calendar",
    "/reports": "Reports",
    "/tasks": "Tasks",
    "/milestones": "Milestones",
    "/timeline": "Timeline",
    "/settings": "Settings",
};

export const GlobalLayout = () => {
    const location = useLocation();

    // Generate breadcrumb items from current path
    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
        <div className="flex h-screen justify-center bg-muted/30">
            {/* Centered Container */}
            <div className="flex w-full max-w-[1100px] border rounded-sm">
                <Sidebar />
                <div className="flex-1 flex flex-col bg-background">
                    {/* Breadcrumb Navigation */}
                    <div className="border-b bg-background">
                        <div className="px-8 py-4">
                            <Breadcrumb>
                                <BreadcrumbList className="flex items-center">
                                    {/* Home breadcrumb */}
                                    <BreadcrumbItem>
                                        <BreadcrumbLink asChild>
                                            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                                Home
                                            </Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>

                                    {/* Dynamic breadcrumbs based on current path */}
                                    {pathnames.map((pathname, index) => {
                                        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                                        const isLast = index === pathnames.length - 1;
                                        const label = breadcrumbLabels[routeTo] || pathname;

                                        return (
                                            <Fragment key={routeTo}>
                                                <BreadcrumbSeparator className="text-muted-foreground" />
                                                <BreadcrumbItem>
                                                    {isLast ? (
                                                        <BreadcrumbPage className="text-sm font-semibold text-foreground">
                                                            {label}
                                                        </BreadcrumbPage>
                                                    ) : (
                                                        <BreadcrumbLink asChild>
                                                            <Link to={routeTo} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                                                {label}
                                                            </Link>
                                                        </BreadcrumbLink>
                                                    )}
                                                </BreadcrumbItem>
                                            </Fragment>
                                        );
                                    })}
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </div>

                    <main className="flex-1 overflow-auto">
                        <div className=" p-4">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};