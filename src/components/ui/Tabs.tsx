import React, { ReactElement, useEffect, useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { selectUser } from "../../store/slices/auth/authSlice";
import { store } from "../../store";

// Define Tab Item Props
type TabItemProps<T extends string> = {
    label: string;
    value: T;
    buttonLabel?: string;
    buttonHref?: string;
    entity?: string | string[];
    role?: string | string[];
    children: React.ReactNode;
};

// Define Tabs Props
type TabsProps<T extends string> = {
    children: ReactElement<TabItemProps<T>>[];
    hideBorder?: boolean;
};

// Tabs Component
function Tabs<T extends string>({
    children,
    hideBorder = false,
}: TabsProps<T>) {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const user = selectUser(store.getState());

    // Filter tabs based on role and entity
    const filteredChildren = React.Children.toArray(children) as ReactElement<
        TabItemProps<T>
    >[];
    const visibleTabs = filteredChildren.filter((child) => {
        // Check role restrictions if present
        if (child.props.role) {
            const requiredRoles = Array.isArray(child.props.role)
                ? child.props.role
                : [child.props.role];

            if (!requiredRoles.includes(user?.role || "")) {
                return false; // Role doesn't match
            }
        }

        // Check entity restrictions if present
        if (child.props.entity) {
            // Admin users can see all entities
            if (user?.role === "admin") {
                return true; // Admin can see all tabs
            }

            // const requiredEntities = Array.isArray(child.props.entity)
            //     ? child.props.entity
            //     : [child.props.entity];

            // If user has no entity or entity doesn't match, hide tab
            // if (!requiredEntities.includes(user?.entityType || "")) {
            //     return false; // Entity doesn't match
            // }
        }

        return true; // All checks passed
    });

    // Get default tab from visible tabs or use empty string as fallback
    const firstVisibleTab =
        visibleTabs.length > 0 ? visibleTabs[0].props.value : ("" as T);
    const activeTabFromURL = searchParams.get("tab") as T | null;
    const [activeTab, setActiveTab] = useState<T>(
        activeTabFromURL || firstVisibleTab
    );

    // Ensure default tab is set in the URL when page loads
    useEffect(() => {
        if (!activeTabFromURL && visibleTabs.length > 0) {
            searchParams.set("tab", firstVisibleTab);
            navigate(`${location.pathname}?${searchParams.toString()}`);
        }
    }, [
        activeTabFromURL,
        firstVisibleTab,
        location.pathname,
        navigate,
        searchParams,
        visibleTabs.length,
    ]);

    // Update activeTab when URL changes and check permission
    useEffect(() => {
        if (activeTabFromURL) {
            // Check if the requested tab exists in visible tabs
            const tabExists = visibleTabs.some(
                (tab) => tab.props.value === activeTabFromURL
            );

            if (!tabExists) {
                // If tab doesn't exist in visible tabs, it means user doesn't have permission
                // We'll handle the redirect in the render method
            } else if (activeTabFromURL !== activeTab) {
                setActiveTab(activeTabFromURL);
            }
        }
    }, [activeTab, activeTabFromURL, visibleTabs]);

    // Function to update tab in URL
    const updateTab = (tab: T) => {
        searchParams.set("tab", tab);
        navigate(`${location.pathname}?${searchParams.toString()}`);
    };

    // Find the active tab
    const activeTabItem = visibleTabs.find(
        (child) => child.props.value === activeTab
    );

    // Check if user is trying to access a tab they don't have permission for via URL
    if (activeTabFromURL && visibleTabs.length > 0) {
        const requestedTabExists = visibleTabs.some(
            (tab) => tab.props.value === activeTabFromURL
        );

        // If the requested tab doesn't exist in visible tabs, redirect to unauthorized
        if (!requestedTabExists) {
            return <Navigate to="/unauthorized" replace />;
        }
    }

    return (
        <section
            className={`relative p-3 sm:p-5 antialiased flex-1 w-full ${
                hideBorder ? "" : "border-wrapper"
            }`}
        >
            {/* Tabs Navigation */}
            <nav
                className={`p-3 flex flex-col items-center md:items-start space-x-4 space-y-4 ${
                    !activeTabItem?.props?.buttonLabel &&
                    !activeTabItem?.props.buttonHref
                        ? ""
                        : "border-t border-gray-200"
                }`}
            >
                <div className="flex space-x-4">
                    {visibleTabs.length > 0 ? (
                        visibleTabs.map((child) => (
                            <button
                                key={child.props.value}
                                type="button"
                                className={`tab capitalize ${
                                    activeTab === child.props.value
                                        ? "tab-active"
                                        : "tab-inactive"
                                }`}
                                aria-current={
                                    activeTab === child.props.value
                                        ? "page"
                                        : undefined
                                }
                                onClick={() => {
                                    setActiveTab(child.props.value);
                                    updateTab(child.props.value);
                                }}
                            >
                                {child.props.label}
                            </button>
                        ))
                    ) : (
                        <div className="p-4 text-center text-gray-500">
                            No tabs available for your role or entity
                        </div>
                    )}
                </div>
            </nav>

            {/* Render Active Tab Content */}
            <div>{activeTabItem}</div>
        </section>
    );
}

// Define the Tabs.Item Component
Tabs.Item = function TabItem<T extends string>({ children }: TabItemProps<T>) {
    return <div>{children}</div>;
};

export default Tabs;
