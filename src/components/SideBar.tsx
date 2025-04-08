import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useRef, useEffect, useState } from "react";
import { X } from "lucide-react";
import { Links } from "../lib/LinksUtils";
import { SideBar as SideBarType } from "../types";

type Props = {
    isSidebarOpen: boolean;
    onToggleSidebar: () => void;
};

const SideBar = ({ isSidebarOpen, onToggleSidebar }: Props) => {
    const { logout, refreshUserProfile } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const profileRefreshedRef = useRef(false);
    const [currentSideBar, setCurrentSideBar] = useState<SideBarType | null>(
        null
    );

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

    useEffect(() => {
        console.log("Current pathname:", window.location.pathname);

        // Find the link that matches the current path or is a parent path
        const foundLink = Links.find(
            (link) =>
                window.location.pathname === link.path ||
                (window.location.pathname !== "/" &&
                    window.location.pathname.startsWith(link.path + "/"))
        );

        console.log(
            "Found link:",
            foundLink ? JSON.stringify(foundLink, null, 2) : "Not found"
        );
        setCurrentSideBar(foundLink?.sideBar || null);
    }, [location.pathname]);

    // Log currentSideBar whenever it changes
    useEffect(() => {
        console.log(JSON.stringify(currentSideBar, null, 2));
    }, [currentSideBar]);

    return (
        <div
            className={`fixed top-0 ${
                isSidebarOpen ? "left-[35%]" : "left-0"
            } z-40 w-64 h-screen pt-14 transition-all duration-300 ease-in-out -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 `}
        >
            {/* Close Sidebar button */}
            <button
                type="button"
                onClick={onToggleSidebar}
                className="absolute top-0 right-0 p-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100"
            >
                <X className="w-6 h-6" />
                <span className="sr-only">Toggle sidebar</span>
            </button>

            {/* Logo Section */}
            <div className="p-6 flex justify-center">
                <div className="bg-primary-500 text-white font-bold py-2 px-4 rounded-md">
                    Logo
                </div>
            </div>

            {/* System Management Section */}
            <div className="overflow-y-auto py-5 px-3 h-full bg-white ">
                <div className="flex items-center text-primary-500 font-medium mb-4">
                    {currentSideBar?.titleSection?.icon ? (
                        <currentSideBar.titleSection.icon
                            width={20}
                            height={20}
                        />
                    ) : (
                        <div className="w-5 h-5 bg-primary-500 rounded-full"></div>
                    )}
                    <span className="ml-2">
                        {currentSideBar?.titleSection?.title || "Navigation"}
                    </span>
                </div>

                {/* Navigation Menu */}
                <nav>
                    <ul className="space-y-2">
                        {currentSideBar?.links.map((route) => (
                            <li key={route.path}>
                                <Link
                                    to={route.path}
                                    className={`flex items-center py-2 px-4 rounded-md hover:bg-primary-50 ${
                                        route.path !== "/dashboard"
                                            ? "pl-8"
                                            : ""
                                    } ${
                                        route.path === "/dashboard"
                                            ? ` ${
                                                  isActive(route.path) &&
                                                  !location.pathname.includes(
                                                      "/dashboard/"
                                                  )
                                                      ? "bg-primary-50 text-primary-500"
                                                      : "hover:bg-gray-100"
                                              }`
                                            : isActive(route.path)
                                            ? "text-primary-500"
                                            : "text-gray-500 hover:text-gray-700"
                                    }`}
                                >
                                    <span
                                        className={`${
                                            route.path === "/dashboard"
                                                ? "w-2 h-2 bg-primary-500"
                                                : "w-1 h-1 bg-gray-400"
                                        } rounded-full mr-2`}
                                    ></span>
                                    <span
                                        className={
                                            route.path === "/dashboard"
                                                ? "font-medium"
                                                : ""
                                        }
                                    >
                                        {route.title}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Logout Button - Hidden at bottom if needed */}
            <div className="absolute bottom-10 left-0 justify-center p-4 space-x-4 w-full flex bg-white z-20">
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
