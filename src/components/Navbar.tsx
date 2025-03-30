import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { Bell, Menu } from "lucide-react";
import DefaultUser from "../assets/images/default-user.png";

type Props = {
    onToggleSidebar: () => void;
};

const Navbar = ({ onToggleSidebar }: Props) => {
    const { user } = useAuth();
    const [notificationsCount] = useState(1);

    return (
        <nav className=" md:px-20 lg:px-10 py-2.5 fixed w-[85vw] lg:w-[80vw] top-0  flex justify-between">
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
                <div className="relative w-8 h-8 rounded-full bg-transparent border border-dark-50">
                    <button className="p-1 relative">
                        <Bell className="w-5 h-5 text-dark-200" />
                        {notificationsCount > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-2 w-2 flex items-center justify-center" />
                        )}
                    </button>
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
                        <img
                            src={DefaultUser}
                            alt={"User"}
                            className="h-full w-full object-cover"
                        />
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
