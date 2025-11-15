import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface CommonDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    size?: "sm" | "md" | "lg";
    className?: string;
}

const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
};

export function CommonDialog({
    open,
    onOpenChange,
    title,
    children,
    footer,
    size = "sm",
    className = "",
}: CommonDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className={`${sizeClasses[size]} ${className} p-0 gap-0 rounded-xl  border border-gray-300 animate-in slide-in-from-top-8 duration-300 translate-y-[-45vh] overflow-hidden`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b bg-zinc-100 border-gray-300 ">
                    <h3 className="text-xs font-semibold text-gray-700 tracking-wide">
                        {title}
                    </h3>
                    <button
                        onClick={() => onOpenChange(false)}
                        className="w-5 h-5 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="px-4 py-4 bg-white max-h-[70vh] overflow-y-auto">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="px-4 py-2 border-t bg-zinc-100 border-gray-300  flex justify-end">
                        {footer}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}