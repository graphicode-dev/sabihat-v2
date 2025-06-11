import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectUser } from "../store/slices/auth/authSlice";
import { useState } from "react";
import { logout } from "../store/slices/auth/authSlice";

function ProfileBox() {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const handleLogout = () => {
        setIsLoggingOut(true);
        dispatch(logout());
    };

    return (
        <div
            className="absolute top-10 right-0 z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow xl:rounded-xl"
            id="profile-dropdown"
        >
            <div className="p-3 border-b border-gray-200">
                <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-2 flex-shrink-0">
                        <span className="text-sm font-bold">
                            {user?.name?.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div className="min-w-0 flex-1 text-left">
                        <span className="block text-sm font-semibold text-gray-900 truncate">
                            {user?.name}
                        </span>
                        <span className="block text-xs text-gray-500 truncate">
                            {user?.email}
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-1">
                    <div className="flex items-center">
                        <div className="w-4 h-4 mr-2 flex-shrink-0 flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5 text-primary-500"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <span className="text-xs font-medium text-gray-700 truncate">
                            {user?.role
                                ? user.role
                                      .replace(/_/g, " ")
                                      .split(" ")
                                      .map(
                                          (word) =>
                                              word.charAt(0).toUpperCase() +
                                              word.slice(1)
                                      )
                                      .join(" ")
                                : "User"}
                        </span>
                    </div>
                </div>
            </div>
            <ul className="py-1 text-gray-700" aria-labelledby="dropdown">
                <li>
                    <button
                        type="button"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="block py-2 px-4 text-sm hover:bg-gray-100 w-full text-left"
                    >
                        {isLoggingOut ? "Signing out..." : "Sign out"}
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default ProfileBox;
