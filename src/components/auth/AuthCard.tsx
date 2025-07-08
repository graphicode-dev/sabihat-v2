import React from "react";

type CardHeaderProps = {
    title: string;
    subtitle: React.ReactNode;
};

type AuthCardProps = {
    children: React.ReactNode;
    title: string;
    subtitle: React.ReactNode;
};

const CardHeader = ({ title, subtitle }: CardHeaderProps) => {
    return (
        <>
            <h1 className="text-left capitalize">{title}</h1>
            <h1 className="text-left mb-10 text-primary-500 capitalize">{subtitle}</h1>
        </>
    );
};

function AuthCard({ children, title, subtitle }: AuthCardProps) {
    return (
        <div className="max-w-md w-full p-15 rounded-3xl shadow-lg bg-white">
            <CardHeader title={title} subtitle={subtitle} />
            {children}
        </div>
    );
}

export default AuthCard;
