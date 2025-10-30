import { cn } from "@/lib/utils";
import {
    CheckCircle2,
    Clock,
    Loader2,
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
                className: "bg-purple-400 text-purple-700  border-purple-200",
                icon: Clock
            },
            "In Progress": {
                variant: "secondary" as const,
                className: "bg-blue-400 text-blue-700  border-blue-200",
                icon: Loader2
            },
            "Completed": {
                variant: "secondary" as const,
                className: "bg-green-400 text-green-700  border-green-200",
                icon: CheckCircle2
            },
            "On Hold": {
                variant: "secondary" as const,
                className: "bg-yellow-400 text-yellow-700  border-yellow-200",
                icon: PauseCircle
            },
            "Canceled": {
                variant: "secondary" as const,
                className: "bg-red-400 text-red-700  border-red-200",
                icon: XCircle
            }
        };

        return configs[status];
    };

    const config = getStatusConfig(status);
    const Icon = config.icon;

    return (
        <div className="flex ">
            <div className={` p-[2.5px] rounded-sm ${config.className} mr-2`}></div>
            <div
                className={cn(
                    " gap-1.5  rounded-sm min-w-20 text-xs bg-white",
                    className
                )}
            >
                {showIcon && <Icon className="h-3.5 w-3.5" />}
                <div className={`text-${config.className} font-semibold`}> {status}</div>
            </div>
        </div>
    );
};