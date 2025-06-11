import React from "react";
import Loading from "./Loading";
import { selectUser } from "../../store/slices/auth/authSlice";
import { store } from "../../store";

type ImageWithSpinnerProps = {
    src: string;
    alt: string;
    className?: string;
    rounded?: boolean;
} & Omit<React.ComponentProps<"img">, "src" | "alt">;

export default function ImgWithSpinner({
    src,
    alt,
    className,
    rounded = false,
    ...props
}: ImageWithSpinnerProps) {
    const user = selectUser(store.getState());

    const loading = user === null;

    return (
        <div
            className={`relative p-1 overflow-hidden ${
                rounded ? "rounded-full" : ""
            }`}
        >
            {loading && (
                <div
                    className={`absolute inset-0 flex items-center justify-center bg-white/80 ${className}`}
                    style={{
                        width: `${props.width}px`,
                        height: `${props.height}px`,
                        borderRadius: "50%",
                    }}
                >
                    <Loading />
                </div>
            )}

            <img
                src={src}
                alt={alt}
                className={` ${loading ? "opacity-0" : "opacity-100"} ${
                    rounded ? "rounded-full" : ""
                } transition-opacity duration-500 w-full h-full`}
                style={{
                    width: `${props.width}px`,
                    height: `${props.height}px`,
                    borderRadius: "500%",
                }}
                {...props}
            />
        </div>
    );
}
