import { Button } from "../ui/button";
import type { DialogFooterProps } from "./commonDialogTypes";

// CommonDialogFooter component for consistent footer buttons
export function CommonDialogFooter({
    onCancel,
    onConfirm,
    cancelText = "Cancel",
    confirmText = "Confirm",
    confirmVariant = "default",
    isLoading = false,
    showCancel = true,
    showConfirm = true,
}: DialogFooterProps) {
    return (
        <div className="flex justify-end gap-3">
            {showCancel && (
                <Button
                    className="text-xs"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isLoading}
                >
                    {cancelText}
                </Button>
            )}
            {showConfirm && (
                <Button
                    className="text-xs"
                    variant={confirmVariant}
                    onClick={onConfirm}
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : confirmText}
                </Button>
            )}
        </div>
    );
}