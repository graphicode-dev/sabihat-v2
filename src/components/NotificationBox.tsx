import { useEffect, useRef } from "react";
import { NotificationItem } from "../types";

interface NotificationBoxProps {
    onClose?: () => void;
    notifications: NotificationItem[];
}

function NotificationBox({ onClose, notifications }: NotificationBoxProps) {
    const notificationRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target as Node) &&
                onClose
            ) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div
            ref={notificationRef}
            className="w-full max-w-[400px] bg-white rounded-3xl shadow-md py-5 px-6 fixed top-15 right-10 z-50"
        >
            <div className="flex items-center mb-4">
                <h2 className="text-lg text-dark-200 font-bold m-0">
                    Notifications
                </h2>
                <div className="bg-green-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] ml-2">
                    {notifications.length}
                </div>
            </div>

            <div className="absolute top-0 right-0 w-8 h-8 border-t-3 border-r-3 border-green-500 rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-3 border-l-3 border-green-500 rounded-bl-3xl" />

            <div className="flex flex-col overflow-y-auto max-h-[400px] custom-scrollbar">
                {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                        <div
                            key={index}
                            className={`py-4 px-4 ${
                                index < notifications.length - 1
                                    ? "border-b border-dark-50"
                                    : ""
                            }`}
                        >
                            <div className="flex justify-between items-center mb-1">
                                <h3 className="text-xs text-dark-500 text-left max-w-[200px] truncate font-bold m-0">
                                    {notification.title}
                                </h3>
                                <span className="text-dark-200 text-[10px] font-normal">
                                    {notification.time}
                                </span>
                            </div>
                            <p className="text-dark-200 text-xs text-left m-0 pr-16 max-w-lg truncate">
                                {notification.message}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="text-dark-500 text-xs text-left m-0 pr-16 max-w-lg truncate">
                        No notifications
                    </div>
                )}
            </div>
        </div>
    );
}

export default NotificationBox;
