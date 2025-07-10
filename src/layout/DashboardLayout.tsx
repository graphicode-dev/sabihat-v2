import { ReactNode, useEffect, useState, useCallback } from "react";
import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";
import Loading from "../components/ui/Loading";
import DashboardHome from "../pages/dashboard/DashboardHome";
import { selectLoading, setLoading } from "../store/slices/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { TabLink } from "../types";
import { buildDynamicNavigation } from "../config/navigationConfig";

interface DashboardLayoutProps {
    children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectLoading);

    // Use useCallback to memoize the setIsLoading function
    const setIsLoading = useCallback(
        (isLoading: boolean) => {
            // Dispatch the action immediately without waiting for the promise
            dispatch(setLoading(isLoading));
            console.log("Loading state set to:", isLoading);
        },
        [dispatch]
    ); // Include dispatch as a dependency

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [navigationLinks, setNavigationLinks] = useState<TabLink[]>([]);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            // Check if screen is large (typically desktop/laptop)
            const isLargeScreen = window.innerWidth >= 1024; // 1024px is a common breakpoint for desktop

            if (isLargeScreen) {
                setSidebarOpen(true);
            } else {
                setSidebarOpen(false);
            }
        };

        // Set initial state based on screen size
        handleResize();

        // Add event listener for window resize
        window.addEventListener("resize", handleResize);

        // Clean up event listener on component unmount
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Fetch navigation data when component mounts
    useEffect(() => {
        let isMounted = true; // Flag to prevent state updates after unmount

        const fetchNavigation = async () => {
            setIsLoading(true);
            try {
                const navConfig = await buildDynamicNavigation();
                // Only update state if component is still mounted
                if (isMounted) {
                    setNavigationLinks(navConfig);
                    console.log("Navigation links loaded:", navConfig.length);
                }
            } catch (error) {
                console.error("Failed to load navigation:", error);
                if (isMounted) {
                    setNavigationLinks([]);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchNavigation();

        // Cleanup function to prevent state updates after unmount
        return () => {
            isMounted = false;
        };
    }, [setIsLoading]); // setIsLoading is memoized with useCallback

    if (isLoading) return <Loading />;

    return (
        <div className="antialiased">
            {/* Sidebar */}
            {!window.location.pathname.startsWith("/login") &&
            window.location.pathname === "/" ? (
                <>
                    {/* Main content area */}
                    <main className="w-screen h-screen antialiased flex flex-col justify-center items-center relative overflow-hidden">
                        {/* Navbar */}
                        <Navbar onToggleSidebar={toggleSidebar} />
                        <DashboardHome />
                    </main>
                </>
            ) : (
                <div className="flex justify-between items-start">
                    <SideBar
                        navigationLinks={navigationLinks}
                        isSidebarOpen={sidebarOpen}
                        onToggleSidebar={toggleSidebar}
                    />
                    {/* Main content area */}
                    <main className="w-full mx-auto pt-[2vh] px-10 h-screen flex justify-center items-center ">
                        <div className="w-full h-full antialiased flex flex-col justify-center items-center relative overflow-hidden">
                            {/* Navbar */}
                            <Navbar onToggleSidebar={toggleSidebar} />
                            {children}
                        </div>
                    </main>
                </div>
            )}
        </div>
    );
};
