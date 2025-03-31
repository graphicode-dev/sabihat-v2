import { ToastItem } from "./ToastItem";
import { ToastPosition } from "../../../types/toast.types";
import { useToast } from "../../../hooks/useToast";

// Position class mapping
const positionClasses: Record<ToastPosition, string> = {
    "top-right": "fixed top-4 right-4 flex flex-col gap-4 z-50",
    "top-left": "fixed top-4 left-4 flex flex-col gap-4 z-50",
    "bottom-right": "fixed bottom-4 right-4 flex flex-col gap-4 z-50",
    "bottom-left": "fixed bottom-4 left-4 flex flex-col gap-4 z-50",
    "top-center":
        "fixed top-4 left-1/2 -translate-x-1/2 flex flex-col gap-4 z-50",
    "bottom-center":
        "fixed bottom-4 left-1/2 -translate-x-1/2 flex flex-col gap-4 z-50",
};

export const ToastsList = () => {
    const { toasts, position, spacing } = useToast();

    // Group toasts by position
    const toastsByPosition: Record<ToastPosition, typeof toasts> = {
        "top-right": [],
        "top-left": [],
        "bottom-right": [],
        "bottom-left": [],
        "top-center": [],
        "bottom-center": [],
    };

    // Sort toasts into position groups
    toasts.forEach((toast) => {
        const toastPosition = toast.position || position;
        if (toastPosition) {
            toastsByPosition[toastPosition].push(toast);
        }
    });

    return (
        <>
            {Object.entries(toastsByPosition).map(([pos, positionToasts]) => {
                if (positionToasts.length === 0) return null;

                return (
                    <div
                        key={pos}
                        className={positionClasses[pos as ToastPosition]}
                        style={{ gap: `${spacing * 0.25}rem` }}
                    >
                        {positionToasts.map((toast) => (
                            <div
                                key={toast.id}
                                className="pointer-events-auto w-full"
                            >
                                <ToastItem
                                    id={toast.id}
                                    type={toast.type}
                                    title={toast.title}
                                    message={toast.message}
                                    duration={toast.duration}
                                    position={toast.position}
                                />
                            </div>
                        ))}
                    </div>
                );
            })}
        </>
    );
};
