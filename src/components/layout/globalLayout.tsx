import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment, useState, useRef, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { Sidebar } from "../layout";
import { GripVertical } from "lucide-react";

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

const STORAGE_KEY = "sidebar-container-width";
const DEFAULT_WIDTH = 1000;

export const GlobalLayout = () => {
    const location = useLocation();
    const [width, setWidth] = useState(() => {
        // Load saved width from localStorage on initial render
        const savedWidth = localStorage.getItem(STORAGE_KEY);
        return savedWidth ? parseInt(savedWidth, 10) : DEFAULT_WIDTH;
    });
    const containerRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef<{ side: 'left' | 'right' | null, startX: number, startWidth: number }>({
        side: null,
        startX: 0,
        startWidth: 0
    });

    // Generate breadcrumb items from current path
    const pathnames = location.pathname.split("/").filter((x) => x);

    const handleMouseDown = (e: React.MouseEvent, side: 'left' | 'right') => {
        e.preventDefault();
        isDraggingRef.current = {
            side,
            startX: e.clientX,
            startWidth: width
        };
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDraggingRef.current.side) return;

            const { side, startX, startWidth } = isDraggingRef.current;
            const deltaX = e.clientX - startX;

            let newWidth: number;
            if (side === 'right') {
                newWidth = startWidth + (deltaX * 2);
            } else {
                newWidth = startWidth - (deltaX * 2);
            }

            // Constrain width between 1000px and window width
            const maxWidth = window.innerWidth;
            newWidth = Math.max(1000, Math.min(maxWidth, newWidth));

            setWidth(newWidth);
        };

        const handleMouseUp = () => {
            isDraggingRef.current.side = null;
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [width]);

    // Save width to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, width.toString());
    }, [width]);

    return (
        <div className="flex h-screen justify-center">
            {/* Resizable Container */}
            <div
                ref={containerRef}
                className="relative flex border rounded-sm"
                style={{ width: `${width}px` }}
            >
                {/* Left Resize Handle */}
                <div
                    className="absolute left-0 top-0 bottom-0 w-1 cursor-ew-resize hover:bg-blue-500 transition-colors z-10 group"
                    onMouseDown={(e) => handleMouseDown(e, 'left')}
                >
                    <div className="absolute inset-y-0 -left-1 -right-1" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-500 rounded-sm p-1">
                        <GripVertical className="w-3 h-3 text-white" />
                    </div>
                </div>

                {/* Right Resize Handle */}
                <div
                    className="absolute right-0 top-0 bottom-0 w-1 cursor-ew-resize hover:bg-blue-500 transition-colors z-10 group"
                    onMouseDown={(e) => handleMouseDown(e, 'right')}
                >
                    <div className="absolute inset-y-0 -left-1 -right-1" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-500 rounded-sm p-1">
                        <GripVertical className="w-3 h-3 text-white" />
                    </div>
                </div>

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
                        <div className="p-4">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};