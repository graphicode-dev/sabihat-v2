import React from "react";
import HomeBg from "../assets/images/HomeBg.png";

function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div
            style={{
                backgroundImage: `url(${HomeBg})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
            }}
            className="w-full h-full"
        >
            <div className="min-h-screen flex items-center justify-center">
                {children}
            </div>
        </div>
    );
}

export default AuthLayout;
