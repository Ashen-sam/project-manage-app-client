
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AvatarGroupProps {
    members: Array<{
        id: string | number;
        name: string;
        image?: string;
    }>;
    max?: number;
    size?: "sm" | "md" | "lg";
    className?: string;
}

const sizeClasses = {
    sm: "h-6 w-6 text-xs",
    md: "h-8 w-8 text-sm",
    lg: "h-10 w-10 text-base",
};

export const AvatarGroup = ({
    members,
    max = 4,
    size = "md",
    className
}: AvatarGroupProps) => {
    const displayMembers = members.slice(0, max);
    const remainingCount = members.length - max;

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
            "bg-green-500",
            "bg-purple-500",
            "bg-orange-500",
            "bg-pink-500",
            "bg-indigo-500",
        ];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    return (
        <div className={cn("flex -space-x-2", className)}>
            {displayMembers.map((member, index) => (
                <Avatar
                    key={member.id}
                    className={cn(
                        sizeClasses[size],
                        "border-2 border-white ring-background",
                        "hover:z-10 hover:scale-110 transition-all duration-200 ease-out",
                        "animate-in fade-in slide-in-from-left-2"
                    )}
                    style={{
                        zIndex: index,
                        animationDelay: `${index * 50}ms`,
                        animationDuration: "300ms",
                        animationFillMode: "backwards"
                    }}
                >
                    {member.image && (
                        <AvatarImage
                            src={member.image}
                            alt={member.name}
                            className="object-cover h-full w-full"
                        />
                    )}
                    <AvatarFallback
                        className={cn("text-white text-[9px] font-medium", getAvatarColor(member.name))}
                    >
                        {getInitials(member.name)}
                    </AvatarFallback>
                </Avatar>
            ))}
            {remainingCount > 0 && (
                <Avatar
                    className={cn(
                        sizeClasses[size],
                        "border-2 border-white",
                        "hover:scale-110 transition-all duration-200",
                        "animate-in fade-in slide-in-from-left-2"
                    )}
                    style={{
                        zIndex: displayMembers.length,
                        animationDelay: `${displayMembers.length * 50}ms`,
                        animationDuration: "300ms",
                        animationFillMode: "backwards"
                    }}
                >
                    <AvatarFallback className="bg-primary text-white text-[10px] font-medium">
                        +{remainingCount}
                    </AvatarFallback>
                </Avatar>
            )}
        </div>
    );
};
