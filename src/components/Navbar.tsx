import { useEffect, useState } from "react";
import { Bell, Menu } from "lucide-react";
import DefaultUser from "../assets/images/default-user.png";
import NotificationBox from "./NotificationBox";
import { NotificationItem } from "../types/notifications.types";
import { notificationsData } from "../data/mockData";
import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/slices/auth/authSlice";
import ImgWithSpinner from "./ui/image";
import ProfileBox from "./ProfileBox";

type Props = {
    onToggleSidebar: () => void;
};

const Navbar = ({ onToggleSidebar }: Props) => {
    const user = useAppSelector(selectUser);

    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleNotifications = () => {
        setShowNotifications(!showNotifications);
        setIsProfileOpen(false);
    };

    useEffect(() => {
        setNotifications(notificationsData);
    }, []);

    const toggleProfileMenu = () => {
        setIsProfileOpen(!isProfileOpen);
        setShowNotifications(false);
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (
                !target.closest("#notification-dropdown") &&
                !target.closest("#notification-button") &&
                showNotifications
            ) {
                setShowNotifications(false);
            }

            if (
                !target.closest("#profile-dropdown") &&
                !target.closest("#user-menu-button") &&
                isProfileOpen
            ) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showNotifications, isProfileOpen]);

    return (
        <nav className="py-2.5 fixed w-[85vw] lg:w-[80vw] top-0  flex justify-between z-50">
            {/* Left side - Greeting */}
            <div className="flex justify-start items-center w-1/3">
                {/* Sidebar toggle button */}
                {window.location.pathname !== "/" && (
                    <button
                        type="button"
                        onClick={onToggleSidebar}
                        className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100"
                    >
                        <Menu className="w-6 h-6" />
                        <span className="sr-only">Toggle sidebar</span>
                    </button>
                )}
                <h1 className="text-xl font-medium">
                    Hello, {user?.name || "there"}!
                </h1>
            </div>

            {/* Right side - Notifications and Profile */}
            <div className="flex items-center space-x-4">
                {/* Notifications */}
                <div className="relative w-8 h-8 rounded-full bg-transparent border border-dark-50">
                    <button
                        id="notification-button"
                        type="button"
                        onClick={handleNotifications}
                        className="p-1 relative"
                    >
                        <Bell className="w-5 h-5 text-dark-200" />
                        {notifications.length > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-2 w-2 flex items-center justify-center" />
                        )}
                    </button>
                </div>

                {/* Profile Toggle Button */}
                <button
                    onClick={toggleProfileMenu}
                    type="button"
                    className="h-10 w-10 rounded-full overflow-hidden flex items-center justify-center"
                    id="user-menu-button"
                >
                    <span className="sr-only">Open user menu</span>
                    <ImgWithSpinner
                        src={(user?.image as string) || DefaultUser}
                        alt="user photo"
                        rounded
                    />
                </button>
            </div>

            {showNotifications && (
                <NotificationBox notifications={notifications} />
            )}

            {/* Dropdown profile */}
            {isProfileOpen && <ProfileBox />}
        </nav>
    );
};

export default Navbar;
