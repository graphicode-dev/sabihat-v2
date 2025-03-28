import { useAuth } from "../context/useAuth";
import { useState } from "react";

const Navbar = () => {
    const { user } = useAuth();
    const [notificationsCount] = useState(1);
    
    return (
        <nav className="bg-white py-3 px-8 flex justify-between items-center">
            {/* Left side - Greeting */}
            <div>
                <h1 className="text-xl font-medium">Hello, {user?.name || "there"}!</h1>
            </div>
            
            {/* Right side - Notifications and Profile */}
            <div className="flex items-center space-x-4">
                {/* Notifications */}
                <div className="relative">
                    <button className="p-1 relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        {notificationsCount > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                {notificationsCount}
                            </span>
                        )}
                    </button>
                </div>
                
                {/* Profile Avatar */}
                <div className="h-8 w-8 rounded-full bg-blue-500 overflow-hidden flex items-center justify-center">
                    {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
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
