import { FC } from "react";

interface TableAvatarProps {
    src?: string;
    initials: string;
    size?: "sm" | "md" | "lg";
}

export const TableAvatar: FC<TableAvatarProps> = ({
    src,
    initials,
    size = "sm",
}) => {
    const sizeClasses = {
        sm: "h-5 w-5 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
    };

    const sizeClass = sizeClasses[size];

    return (
        <div
            className={`relative inline-flex ${sizeClass} items-center justify-center rounded-full bg-green-100 text-green-800 font-medium overflow-hidden`}
        >
            {src ? (
                <img
                    src={src}
                    alt={initials}
                    className="h-full w-full object-cover"
                />
            ) : (
                <span>{initials}</span>
            )}
        </div>
    );
};
