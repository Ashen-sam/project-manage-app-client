import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
    Clock,
    Loader2,
    CheckCircle2,
    PauseCircle,
    XCircle
} from "lucide-react";

export type ProjectStatus = "Planning" | "In Progress" | "Completed" | "On Hold" | "Canceled";

interface ProjectStatusCommonProps {
    status: ProjectStatus;
    className?: string;
    showIcon?: boolean;
}

export const ProjectStatusCommon = ({
    status,
    className,
    showIcon = true
}: ProjectStatusCommonProps) => {

    const getStatusConfig = (status: ProjectStatus) => {
        const configs = {
            "Planning": {
                variant: "secondary" as const,
                className: "bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200",
                icon: Clock
            },
            "In Progress": {
                variant: "default" as const,
                className: "bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200",
                icon: Loader2
            },
            "Completed": {
                variant: "default" as const,
                className: "bg-green-100 text-green-700 hover:bg-green-200 border-green-200",
                icon: CheckCircle2
            },
            "On Hold": {
                variant: "secondary" as const,
                className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200",
                icon: PauseCircle
            },
            "Canceled": {
                variant: "destructive" as const,
                className: "bg-red-100 text-red-700 hover:bg-red-200 border-red-200",
                icon: XCircle
            }
        };

        return configs[status];
    };

    const config = getStatusConfig(status);
    const Icon = config.icon;

    return (
        <Badge
            variant={config.variant}
            className={cn(
                "font-medium gap-1.5 border",
                config.className,
                className
            )}
        >
            {showIcon && <Icon className="h-3.5 w-3.5" />}
            {status}
        </Badge>
    );
};