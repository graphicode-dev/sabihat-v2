import { ReactNode, useEffect, useState } from "react";
import SideBar from "../SideBar";
import Navbar from "../Navbar";
import { useAuth } from "../../context/useAuth";
import Loading from "../ui/Loading";

interface DashboardLayoutProps {
    children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const { isLoading } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        window.onscroll = () => setSidebarOpen(false);
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="antialiased">
            {/* Sidebar */}
            <SideBar
                isSidebarOpen={sidebarOpen}
                onToggleSidebar={toggleSidebar}
            />

            {/* Main content area */}
            <main className="md:ml-64 pt-[2vh] px-10 h-screen flex justify-center items-center ">
                <div className="w-[85vw] lg:w-[80vw] h-[80vh] antialiased flex flex-col justify-center items-center relative shadow-md sm:rounded-lg overflow-hidden">
                    {/* Navbar */}
                    <Navbar onToggleSidebar={toggleSidebar} />
                    {children}
                </div>
            </main>
        </div>
    );
};
