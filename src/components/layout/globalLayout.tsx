import { Outlet, useLocation, Link } from "react-router";
import { Sidebar, HeaderBar } from "../layout";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

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
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <HeaderBar />

                {/* Breadcrumb Navigation */}
                <div className="px-6 py-3 border-b bg-background">
                    <Breadcrumb>
                        <BreadcrumbList>
                            {/* Home breadcrumb */}
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link to="/" className="text-sm">
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
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            {isLast ? (
                                                <BreadcrumbPage className="text-sm font-medium">
                                                    {label}
                                                </BreadcrumbPage>
                                            ) : (
                                                <BreadcrumbLink asChild>
                                                    <Link to={routeTo} className="text-sm">
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

                <main className=" flex-1 overflow-auto py-2 px-3 ">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};