import { ReactNode } from "react";
import SideBar from "../SideBar";
import Navbar from "../Navbar";

interface DashboardLayoutProps {
    children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div className="min-h-screen w-full flex justify-center">
            {/* Sidebar */}
            <SideBar />

            {/* Main content area */}
            <div className="flex-1 ml-40 flex flex-col">
                {/* Navbar at the top */}
                <Navbar />

                {/* Page content */}
                <div className="p-8">{children}</div>
            </div>
        </div>
    );
};
