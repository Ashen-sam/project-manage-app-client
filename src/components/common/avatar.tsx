
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
    name: string;
    image?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    className?: string;
    showRing?: boolean;
    status?: "online" | "offline" | "away" | "busy";
}

const sizeClasses = {
    xs: "h-6 w-6 text-xs",
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-base",
    lg: "h-12 w-12 text-lg",
    xl: "h-16 w-16 text-xl",
};

const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-yellow-500",
    busy: "bg-red-500",
};

export const UserAvatar = ({
    name,
    image,
    size = "md",
    className,
    showRing = false,
    status,
}: UserAvatarProps) => {
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const getAvatarColor = (name: string) => {
        const colors = [
            "bg-blue-500",
            "bg-green-500",
            "bg-purple-500",
            "bg-orange-500",
            "bg-pink-500",
            "bg-indigo-500",
            "bg-teal-500",
            "bg-cyan-500",
        ];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    return (
        <div className="relative inline-block">
            <Avatar
                className={cn(
                    sizeClasses[size],
                    showRing && "ring-2 ring-offset-2 ring-primary",
                    "transition-all duration-200 hover:scale-105",
                    className
                )}
            >
                {image && (
                    <AvatarImage
                        src={image}
                        alt={name}
                        className="object-cover"
                    />
                )}
                <AvatarFallback
                    className={cn(
                        "text-white font-medium",
                        getAvatarColor(name)
                    )}
                >
                    {getInitials(name)}
                </AvatarFallback>
            </Avatar>
            {status && (
                <span
                    className={cn(
                        "absolute bottom-0 right-0 block rounded-full ring-2 ring-white",
                        statusColors[status],
                        size === "xs" && "h-2 w-2",
                        size === "sm" && "h-2.5 w-2.5",
                        size === "md" && "h-3 w-3",
                        size === "lg" && "h-3.5 w-3.5",
                        size === "xl" && "h-4 w-4"
                    )}
                />
            )}
        </div>
    );
};