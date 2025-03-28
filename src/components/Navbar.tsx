import { useAuth } from "../context/useAuth";
import { useState } from "react";
import { Menu } from "lucide-react";

type Props = {
    onToggleSidebar: () => void;
};

const Navbar = ({ onToggleSidebar }: Props) => {
    const { user } = useAuth();
    const [notificationsCount] = useState(1);

    return (
        <nav className="px-4 py-2.5 fixed w-[85vw] lg:w-[80vw] top-0  flex justify-between">
            {/* Left side - Greeting */}
            <div className="flex justify-start items-center w-1/3">
                {/* Sidebar toggle button */}
                <button
                    type="button"
                    onClick={onToggleSidebar}
                    className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100"
                >
                    <Menu className="w-6 h-6" />
                    <span className="sr-only">Toggle sidebar</span>
                </button>
                <h1 className="text-xl font-medium">
                    Hello, {user?.name || "there"}!
                </h1>
            </div>

            {/* Right side - Notifications and Profile */}
            <div className="flex items-center space-x-4">
                {/* Notifications */}
                <div className="relative">
                    <button className="p-1 relative">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                        </svg>
                        {notificationsCount > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                {notificationsCount}
                            </span>
                        )}
                    </button>
                    2
                </div>

                {/* Profile Avatar */}
                <div className="h-8 w-8 rounded-full bg-blue-500 overflow-hidden flex items-center justify-center">
                    {user?.avatar ? (
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="text-white font-medium">
                            {user?.name?.charAt(0) || "U"}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
