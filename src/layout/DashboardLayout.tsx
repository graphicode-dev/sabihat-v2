import { ReactNode, useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";
import Loading from "../components/ui/Loading";
import DashboardHome from "../pages/dashboard/DashboardHome";
import { selectLoading } from "../store/slices/auth/authSlice";
import { useAppSelector } from "../store/hooks";

interface DashboardLayoutProps {
    children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const isLoading = useAppSelector(selectLoading);

    const [sidebarOpen, setSidebarOpen] = useState(false);

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

    if (isLoading) {
        return <Loading />;
    }

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
