// commonDialog.tsx
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import type { CommonDialogProps } from "./commonDialogTypes";

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
    showCloseButton = true,
    icon: Icon,
    className = "",
}: CommonDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={`${sizeClasses[size]} ${className} p-0 `}>
                {showCloseButton && (
                    <button
                        onClick={() => onOpenChange(false)}
                        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-50"
                        aria-label="Close"
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </button>
                )}

                <div className="px-6 py-2 border-b border-border">
                    <div className="flex items-center gap-2 font-semibold">

                        <div>
                            <div className="text-md font-semibold text-gray-700">
                                {title}
                            </div>
                            {/* <div>
                                {description && (
                                    <div className="text-xs text-gray-600">
                                        {description}
                                    </div>
                                )}
                            </div> */}
                        </div>
                    </div>

                </div>
                <div className="px-6 py-4  rounded-sm">{children}</div>

                {footer && (
                    <DialogFooter className="px-4 py-2 border-t border-border">
                        {footer}
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
}