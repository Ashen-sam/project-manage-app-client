import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog";

interface CommonDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
    showCloseButton?: boolean;
    icon?: React.ComponentType<{ className?: string }>;
    className?: string;
}

const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-full",
};

export function CommonDialog({
    open,
    onOpenChange,
    title,
    description,
    children,
    footer,
    size = "md",
    icon: Icon,
    className = "",
}: CommonDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={`${sizeClasses[size]} ${className} p-0 gap-0`}>
                {/* Header Section */}
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {Icon && (
                            <div className="w-10 h-10 rounded-sm shadow-sm border  flex items-center justify-center">
                                <Icon className="w-5 h-5 text-primary" />
                            </div>
                        )}
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                {title}
                            </h2>
                            {description && (
                                <p className="text-sm text-gray-500 mt-0.5">
                                    {description}
                                </p>
                            )}
                        </div>
                    </div>


                </div>

                {/* Content Section */}
                <div className="px-6 py-5">
                    {children}
                </div>

                {/* Footer Section */}
                {footer && (
                    <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
                        {footer}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}