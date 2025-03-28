import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useRef, useEffect } from "react";

interface RouteItem {
    path: string;
    name: string;
    icon?: React.ReactNode;
    isMain?: boolean;
}

const SideBar = () => {
    const { logout, refreshUserProfile } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const profileRefreshedRef = useRef(false);

    // Refresh user profile when sidebar mounts, but only once
    useEffect(() => {
        if (!profileRefreshedRef.current) {
            refreshUserProfile();
            profileRefreshedRef.current = true;
        }
    }, [refreshUserProfile]);

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    // Check if a menu item is active
    const isActive = (path: string) => {
        return (
            location.pathname === path ||
            location.pathname.startsWith(`${path}/`)
        );
    };

    const routes: RouteItem[] = [
        {
            path: "/dashboard",
            name: "All",
            isMain: true,
        },
        {
            path: "/dashboard/companies",
            name: "Companies",
        },
        {
            path: "/dashboard/marine-agent",
            name: "Marine Agent",
        },
        {
            path: "/dashboard/commercial-agent",
            name: "Commercial Agent",
        },
        {
            path: "/dashboard/subagent",
            name: "Subagent",
        },
        {
            path: "/dashboard/user-roles",
            name: "Create User Roles & Permissions",
        },
        {
            path: "/dashboard/classification",
            name: "Classification",
        },
        {
            path: "/dashboard/employee",
            name: "Employee",
        },
    ];

    return (
        <div className="fixed inset-y-0 left-0 w-64 bg-white text-gray-700 shadow-md">
            {/* Logo Section */}
            <div className="p-6 flex justify-center">
                <div className="bg-green-500 text-white font-bold py-2 px-4 rounded-md">
                    Logo
                </div>
            </div>

            {/* System Management Section */}
            <div className="px-6 py-4">
                <div className="flex items-center text-green-500 font-medium mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                    <span>System Management & Administration</span>
                </div>

                {/* Navigation Menu */}
                <nav>
                    <ul className="space-y-2">
                        {routes.map((route) => (
                            <li key={route.path}>
                                <Link
                                    to={route.path}
                                    className={`flex items-center py-2 px-4 rounded-md hover:bg-green-50 ${
                                        !route.isMain ? "pl-8" : ""
                                    } ${
                                        route.isMain
                                            ? ` ${
                                                  isActive(route.path) &&
                                                  !location.pathname.includes(
                                                      "/dashboard/"
                                                  )
                                                      ? "bg-green-50 text-green-500"
                                                      : "hover:bg-gray-100"
                                              }`
                                            : isActive(route.path)
                                            ? "text-green-500"
                                            : "text-gray-500 hover:text-gray-700"
                                    }`}
                                >
                                    <span
                                        className={`${
                                            route.isMain
                                                ? "w-2 h-2 bg-green-500"
                                                : "w-1 h-1 bg-gray-400"
                                        } rounded-full mr-2`}
                                    ></span>
                                    <span
                                        className={
                                            route.isMain ? "font-medium" : ""
                                        }
                                    >
                                        {route.name}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Logout Button - Hidden at bottom if needed */}
            <div className="absolute bottom-4 left-0 right-0 px-6 ">
                <button
                    onClick={handleLogout}
                    className="w-full text-left py-2 px-4 bg-red-100 hover:bg-red-200 rounded text-red-600"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default SideBar;
