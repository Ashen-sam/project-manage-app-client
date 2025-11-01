// import { cn } from "@/lib/utils";
// import { useEffect, useState } from "react";

// interface CircularProgressProps {
//     value: number;
//     size?: "xs" | "sm" | "md" | "lg";
//     showLabel?: boolean;
//     className?: string;
// }

// const sizeConfig = {
//     xs: {
//         width: 32,
//         height: 32,
//         strokeWidth: 2.5,
//         fontSize: "text-[9px]",
//     },
//     sm: {
//         width: 40,
//         height: 40,
//         strokeWidth: 3,
//         fontSize: "text-[10px]",
//     },
//     md: {
//         width: 56,
//         height: 56,
//         strokeWidth: 4,
//         fontSize: "text-xs",
//     },
//     lg: {
//         width: 80,
//         height: 80,
//         strokeWidth: 5,
//         fontSize: "text-sm",
//     },
// };

// export const CircularProgress = ({
//     value,
//     size = "md",
//     showLabel = true,
//     className,
// }: CircularProgressProps) => {
//     const [animatedValue, setAnimatedValue] = useState(0);
//     const config = sizeConfig[size];
//     const radius = (config.width - config.strokeWidth) / 2;
//     const circumference = 2 * Math.PI * radius;
//     const offset = circumference - (animatedValue / 100) * circumference;

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setAnimatedValue(value);
//         }, 100);

//         return () => clearTimeout(timer);
//     }, [value]);

//     // Determine color based on progress value
//     const getColor = (val: number) => {
//         if (val >= 75) return "stroke-green-500";
//         if (val >= 50) return "stroke-blue-500";
//         if (val >= 25) return "stroke-yellow-500";
//         return "stroke-red-500";
//     };

//     return (
//         <div className={cn("relative inline-flex  items-center justify-center", className)}>
//             <svg
//                 width={config.width}
//                 height={config.height}
//                 className="transform -rotate-90"
//             >
//                 {/* Background circle */}
//                 <circle
//                     cx={config.width / 2}
//                     cy={config.height / 2}
//                     r={radius}
//                     className="stroke-muted/30"
//                     strokeWidth={config.strokeWidth}
//                     fill="none"
//                 />
//                 {/* Progress circle */}
//                 <circle
//                     cx={config.width / 2}
//                     cy={config.height / 2}
//                     r={radius}
//                     className={cn(
//                         "transition-all duration-700 ease-out",
//                         getColor(animatedValue)
//                     )}
//                     strokeWidth={config.strokeWidth}
//                     fill="none"
//                     strokeDasharray={circumference}
//                     strokeDashoffset={offset}
//                     strokeLinecap="round"
//                     style={{
//                         transition: "stroke-dashoffset 0.7s ease-out, stroke 0.3s ease-in-out"
//                     }}
//                 />
//             </svg>
//             {showLabel && (
//                 <div className="absolute inset-0  flex items-center justify-center">
//                     <span className={cn("font-semibold tabular-nums", config.fontSize)}>
//                         {Math.round(animatedValue)}%
//                     </span>
//                 </div>
//             )}
//         </div>
//     );
// };
import { useEffect, useState } from "react";

interface ProgressBarProps {
    value: number;
    size?: "xs" | "sm" | "md" | "lg";
    showLabel?: boolean;
    className?: string;
}

const sizeConfig = {
    xs: { height: 5, fontSize: "text-[10px]" },
    sm: { height: 8, fontSize: "text-xs" },
    md: { height: 10, fontSize: "text-sm" },
    lg: { height: 12, fontSize: "text-base" },
};

export const CircularProgress = ({
    value,
    size = "md",
    showLabel = true,
    className = "",
}: ProgressBarProps) => {
    const [animatedValue, setAnimatedValue] = useState(0);
    const config = sizeConfig[size];

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedValue(value);
        }, 100);
        return () => clearTimeout(timer);
    }, [value]);

    const getColor = (val: number) => {
        if (val >= 75) return "bg-emerald-500";
        if (val >= 50) return "bg-blue-500";
        if (val >= 25) return "bg-amber-500";
        return "bg-rose-500";
    };

    return (
        <div className={`w-full ${className}`}>
            {showLabel && (
                <div className="flex items-center justify-between mb-2">

                    <span className={`font-semibold text-gray-900 tabular-nums ${config.fontSize}`}>
                        {Math.round(animatedValue)}%
                    </span>
                </div>
            )}
            <div
                className="relative bg-gray-200 overflow-hidden"
                style={{ height: `${config.height}px`, borderRadius: `${config.height / 2}px` }}
            >
                <div
                    className={`h-full transition-all duration-700 ease-out ${getColor(animatedValue)}`}
                    style={{
                        width: `${animatedValue}%`,
                        borderRadius: `${config.height / 2}px`,
                    }}
                />
            </div>
        </div>
    );
};
