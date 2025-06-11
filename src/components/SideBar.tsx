import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { X } from "lucide-react";
import { navigationConfig } from "../config/navigationConfig";
import { SideBar as SideBarType } from "../types";
import { logout, refreshUserProfile } from "../store/slices/auth/authSlice";
import { useAppDispatch } from "../store/hooks";

type Props = {
    isSidebarOpen: boolean;
    onToggleSidebar: () => void;
};

const SideBar = ({ isSidebarOpen, onToggleSidebar }: Props) => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const location = useLocation();
    const profileRefreshedRef = useRef(false);
    const [currentSideBar, setCurrentSideBar] = useState<SideBarType | null>(
        null
    );

    // Refresh user profile when sidebar mounts, but only once
    useEffect(() => {
        if (!profileRefreshedRef.current) {
            dispatch(refreshUserProfile());
            profileRefreshedRef.current = true;
        }
    }, [dispatch]); // Only depend on dispatch, not refreshUserProfile

    const handleLogout = async () => {
        await dispatch(logout());
        navigate("/login");
    };

    // Check if a menu item is active
    const isActive = (path: string, index?: number) => {
        // For main routes (index 0), only consider them active if there's an exact match
        // This prevents the main route from being active when a sub-route is active
        if (index === 0) {
            return location.pathname === path;
        }

        // For other routes, check if current path matches or starts with the route path
        return (
            location.pathname === path ||
            location.pathname.startsWith(`${path}/`)
        );
    };

    useEffect(() => {
        // Find the link that matches the current path or is a parent path
        const foundLink = navigationConfig.find(
            (link) =>
                window.location.pathname === link.path ||
                (window.location.pathname !== "/" &&
                    window.location.pathname.startsWith(link.path + "/"))
        );

        setCurrentSideBar(foundLink?.sideBar || null);
    }, [location.pathname]);

    // Handle logo click to navigate to dashboard home
    const handleLogoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        // Force a reload to ensure the dashboard home page is displayed correctly
        window.location.href = "/";
    };

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
                <div
                    onClick={handleLogoClick}
                    className="bg-primary-500 text-white font-bold py-2 px-4 rounded-md cursor-pointer"
                >
                    Logo
                </div>
            </div>

            {/* System Management Section */}
            <div className="overflow-y-auto py-5 px-3 h-full bg-white ">
                <div className="flex items-center text-primary-500 font-medium mb-4">
                    {currentSideBar?.titleSection?.icon && (
                        <currentSideBar.titleSection.icon
                            color="#00a878 "
                            width={25}
                            height={25}
                        />
                    )}
                    <span className="ml-2">
                        {currentSideBar?.titleSection?.title || "Navigation"}
                    </span>
                </div>

                {/* Navigation Menu */}
                <nav>
                    <ul className="space-y-2">
                        {currentSideBar?.links.map((route, index) => (
                            <li key={route.path}>
                                <Link
                                    to={route.path}
                                    className={`flex items-center py-2 px-4 rounded-md hover:bg-primary-50  ${
                                        isActive(route.path, index)
                                            ? "bg-primary-50"
                                            : "text-gray-500 hover:text-gray-700"
                                    }`}
                                >
                                    <span
                                        className={`${
                                            isActive(route.path, index)
                                                ? "w-2 h-2 bg-primary-500"
                                                : "w-1 h-1 bg-gray-400"
                                        } rounded-full mr-2`}
                                    ></span>
                                    <span
                                        className={
                                            isActive(route.path, index)
                                                ? "font-bold"
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
            <div className="absolute bottom-10 left-0 justify-center p-4 w-full flex bg-white z-20">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center py-2 px-4 rounded-md text-red-600 hover:bg-red-50 transition-colors duration-200 font-medium"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default SideBar;
