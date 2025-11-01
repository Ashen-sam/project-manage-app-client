import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface LinearProgressProps {
    value: number;
    size?: "xs" | "sm" | "md" | "lg";
    showLabel?: boolean;
    className?: string;
    variant?: "default" | "gradient";
}

const sizeConfig = {
    xs: {
        height: "h-1.5",
        fontSize: "text-[9px]",
        padding: "px-1.5",
    },
    sm: {
        height: "h-2",
        fontSize: "text-[10px]",
        padding: "px-2",
    },
    md: {
        height: "h-3",
        fontSize: "text-xs",
        padding: "px-2.5",
    },
    lg: {
        height: "h-4",
        fontSize: "text-sm",
        padding: "px-3",
    },
};

export const LinearProgress = ({
    value,
    size = "md",
    showLabel = true,
    className,
    variant = "default",
}: LinearProgressProps) => {
    const [animatedValue, setAnimatedValue] = useState(0);
    const config = sizeConfig[size];

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedValue(value);
        }, 100);

        return () => clearTimeout(timer);
    }, [value]);

    // Determine color based on progress value
    const getColor = (val: number) => {
        if (val >= 75) return "bg-green-500";
        if (val >= 50) return "bg-blue-500";
        if (val >= 25) return "bg-yellow-500";
        return "bg-red-500";
    };

    const getGradientColor = (val: number) => {
        if (val >= 75) return "from-green-400 to-green-600";
        if (val >= 50) return "from-blue-400 to-blue-600";
        if (val >= 25) return "from-yellow-400 to-yellow-600";
        return "from-red-400 to-red-600";
    };

    return (
        <div className={cn("w-full space-y-1", className)}>
            <div className={cn("relative w-full bg-muted/30 rounded-full overflow-hidden", config.height)}>
                <div
                    className={cn(
                        "h-full rounded-full transition-all duration-700 ease-out relative",
                        variant === "gradient"
                            ? `bg-gradient-to-r ${getGradientColor(animatedValue)}`
                            : getColor(animatedValue)
                    )}
                    style={{
                        width: `${animatedValue}%`,
                        transition: "width 0.7s ease-out, background 0.3s ease-in-out"
                    }}
                >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
                        style={{
                            backgroundSize: "200% 100%",
                            animation: "shimmer 2s infinite"
                        }}
                    />
                </div>
                {showLabel && size !== "xs" && (
                    <div className={cn(
                        "absolute inset-0 flex items-center justify-end",
                        config.padding
                    )}>
                        <span className={cn(
                            "font-semibold tabular-nums text-white drop-shadow-sm",
                            config.fontSize
                        )}>
                            {Math.round(animatedValue)}%
                        </span>
                    </div>
                )}
            </div>
            {showLabel && size === "xs" && (
                <div className="flex justify-end">
                    <span className={cn("font-semibold tabular-nums text-muted-foreground", config.fontSize)}>
                        {Math.round(animatedValue)}%
                    </span>
                </div>
            )}
        </div>
    );
}