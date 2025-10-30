import { cn } from "@/lib/utils";
import {
    AlertCircle,
    AlertTriangle,
    ArrowUp,
    Minus
} from "lucide-react";

export type ProjectPriority = "Low" | "Medium" | "High" | "Critical";

interface ProjectPriorityCommonProps {
    priority: ProjectPriority;
    className?: string;
    showIcon?: boolean;
}

export const ProjectPriorityCommon = ({
    priority,
    className,
    showIcon = true
}: ProjectPriorityCommonProps) => {

    const getPriorityConfig = (priority: ProjectPriority) => {
        const configs = {
            "Low": {
                variant: "secondary" as const,
                className: "bg-green-400 text-green-700  border-green-200",
                icon: Minus
            },
            "Medium": {
                variant: "secondary" as const,
                className: "bg-yellow-400 text-yellow-700  border-yellow-200",
                icon: AlertCircle
            },
            "High": {
                variant: "secondary" as const,
                className: "bg-red-400 text-red-700  border-red-200",
                icon: ArrowUp
            },
            "Critical": {
                variant: "secondary" as const,
                className: "bg-rose-900 text-rose-900  border-rose-900",
                icon: AlertTriangle
            }
        };

        return configs[priority];
    };

    const config = getPriorityConfig(priority);
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
                <div className={`text-${config.className} font-semibold`}> {priority}</div>

            </div>
        </div>
    );
};