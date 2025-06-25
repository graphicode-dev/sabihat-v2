import React, { useState } from "react";
import { PenIcon, TrashIcon } from "./icons";
import {
    ViewCardProps,
    ViewCardSectionProps,
    ViewCardFieldProps,
    ViewCardButtonsProps,
    ViewCardHeaderProps,
} from "../../types/viewCard.types";
import { useLocation, useNavigate } from "react-router-dom";
import { PaperclipIcon } from "lucide-react";

const ViewCardSection: React.FC<ViewCardSectionProps> = ({
    label,
    children,
}) => (
    <div className="mb-8 text-left">
        <h3 className="text-sm text-left font-bold text-primary-500 mb-2 capitalize">
            {label}
        </h3>
        {children}
    </div>
);

const ViewCardField: React.FC<ViewCardFieldProps> = ({
    label,
    value,
    type,
}) => (
    <div className="mb-4 flex flex-col">
        <h4 className="text-sm text-dark-200 mb-1 capitalize">{label}</h4>

        {type === "file" ? (
            <a
                href={value?.toString()}
                target="_blank"
                download={value?.toString()}
                className="flex items-center gap-2 cursor-pointer text-green-500 hover:text-green-600 transition-colors"
            >
                <PaperclipIcon className="h-5 w-5" />
                <span>{value}</span>
            </a>
        ) : (
            <p className="text-dark-500 font-medium max-w-full truncate break-words whitespace-pre-wrap">
                {value || "••••••••••••••••"}
            </p>
        )}
    </div>
);

const ViewCardButtons: React.FC<ViewCardButtonsProps> = ({
    ticketButton,
    customButtonLabel,
    onEdit,
    onDelete,
    onTicket,
    onCustomButton,
}) => {
    return (
        <div className="flex gap-2">
            {customButtonLabel && onCustomButton && (
                <button
                    type="button"
                    className="bg-primary-500 text-white px-4 py-3 rounded-full"
                    onClick={onCustomButton}
                >
                    {customButtonLabel}
                </button>
            )}
            {ticketButton && (
                <button
                    type="button"
                    className="bg-primary-500 text-white px-4 py-3 rounded-full"
                    onClick={onTicket}
                >
                    Tickets
                </button>
            )}
            <button
                type="button"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-dark-50 hover:border-primary-500 group transition-colors"
                onClick={onDelete}
            >
                <span className="sr-only">Delete</span>
                <span className="group-hover:hidden">
                    <TrashIcon
                        width={20}
                        height={20}
                        color="var(--color-dark-100)"
                    />
                </span>
                <span className="hidden group-hover:block">
                    <TrashIcon
                        width={20}
                        height={20}
                        color="var(--color-primary-500)"
                    />
                </span>
            </button>
            <button
                type="button"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-dark-50 hover:border-primary-500 group transition-colors"
                onClick={onEdit}
            >
                <span className="sr-only">Edit</span>
                <span className="group-hover:hidden">
                    <PenIcon
                        width={20}
                        height={20}
                        color="var(--color-dark-100)"
                    />
                </span>
                <span className="hidden group-hover:block">
                    <PenIcon
                        width={20}
                        height={20}
                        color="var(--color-primary-500)"
                    />
                </span>
            </button>
        </div>
    );
};

const ViewCardHeader: React.FC<ViewCardHeaderProps> = ({
    headerTitle = "View",
    hideHeaderTitle,
    buttons,
    ticketButton,
    onEdit,
    onDelete,
    onTicket,
    customButtonLabel,
    onCustomButton,
}) => {
    return (
        <div className="flex justify-between items-center gap-2">
            {!hideHeaderTitle && (
                <h1 className="text-xl font-bold">{headerTitle}</h1>
            )}
            {buttons && (
                <ViewCardButtons
                    ticketButton={ticketButton}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onTicket={onTicket}
                    customButtonLabel={customButtonLabel}
                    onCustomButton={onCustomButton}
                />
            )}
        </div>
    );
};

const ViewCard: React.FC<ViewCardProps> = ({
    headerTitle = "View",
    hideHeaderTitle = false,
    title = "View",
    subtitle,
    variant = "default",
    image,
    data,
    buttons,
    ticketButton,
    hideBorder = false,
    tabs = [],
    gridCols = 3,
    onEdit,
    onDelete,
    onTicket,
    customButtonLabel,
    onCustomButton,
}) => {
    // State to track if all content is shown or limited
    const [showAllContent, setShowAllContent] = useState(false);

    // Default number of sections to show initially
    const initialSectionsToShow = 2;

    // Get rows for the Show More/Less feature
    const allRows = data?.rows || [];

    // Determine if we need a show more button
    const needsShowMore = allRows.length > initialSectionsToShow;

    // Get the rows to display based on current state
    const visibleRows = showAllContent
        ? allRows
        : allRows.slice(0, initialSectionsToShow);

    // For tabs variant - handle tab navigation
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    // Get active tab from URL or use first tab
    const activeTabFromURL = searchParams.get("tab");
    const firstTabValue = tabs.length > 0 ? tabs[0].value : "";
    const [activeTab, setActiveTab] = useState(
        activeTabFromURL || firstTabValue
    );

    // Function to update tab in URL
    const updateTab = (tab: string) => {
        searchParams.set("tab", tab);
        navigate(`${location.pathname}?${searchParams.toString()}`);
    };

    // Find the active tab content
    const activeTabItem = tabs.find((tab) => tab.value === activeTab);

    const getGridCols = () => {
        switch (gridCols) {
            case 1:
                return "grid-cols-1";

            case 2:
                return "grid-cols-2";

            case 3:
                return "grid-cols-3";

            case 4:
                return "grid-cols-4";

            case 5:
                return "grid-cols-5";

            default:
                return "grid-cols-3";
        }
    };

    const getColSpan = (key: number) => {
        switch (key) {
            case 1:
                return "md:col-span-1";

            case 2:
                return "md:col-span-2";

            case 3:
                return "md:col-span-3";

            case 4:
                return "md:col-span-4";

            case 5:
                return "md:col-span-5";

            default:
                return "md:col-span-1";
        }
    };

    // Render different layouts based on variant
    const renderContent = () => {
        switch (variant) {
            case "user":
                return (
                    <div className="flex flex-col gap-6">
                        {/* Header */}
                        <ViewCardHeader
                            headerTitle={headerTitle}
                            hideHeaderTitle={hideHeaderTitle}
                            buttons={buttons}
                            ticketButton={ticketButton}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onTicket={onTicket}
                            customButtonLabel={customButtonLabel}
                            onCustomButton={onCustomButton}
                        />

                        {/* User Avatar and Basic Info */}
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full overflow-hidden">
                                    <img
                                        src={
                                            image || "/images/default-user.png"
                                        }
                                        alt={title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            <div className="text-center md:text-left">
                                <h1>{title}</h1>
                                <p className="font-bold text-primary-500">
                                    {subtitle}
                                </p>
                            </div>
                        </div>

                        {/* Separator */}
                        <div className="separator" />

                        {/* User Details */}
                        <div
                            className={`flex-1 grid grid-cols-1 md:${getGridCols()} gap-6 mt-6 md:mt-0`}
                        >
                            {data?.rows.map((row, index) =>
                                row.fields?.map((field) => (
                                    <ViewCardField
                                        key={index}
                                        label={field.label}
                                        value={field.value}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                );

            case "vessel":
                return (
                    <div className="flex flex-col gap-6">
                        {/* Header */}
                        <ViewCardHeader
                            headerTitle={headerTitle}
                            hideHeaderTitle={hideHeaderTitle}
                            buttons={buttons}
                            ticketButton={ticketButton}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onTicket={onTicket}
                            customButtonLabel={customButtonLabel}
                            onCustomButton={onCustomButton}
                        />

                        {/* User Avatar and Basic Info */}
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <div className="relative">
                                <div className="w-50 h-28 rounded-4xl overflow-hidden">
                                    <img
                                        src={
                                            image || "/images/default-ship.png"
                                        }
                                        alt={title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            <div className="text-center md:text-left">
                                <h1>{title}</h1>
                                <p className="font-bold text-primary-500">
                                    {subtitle}
                                </p>
                            </div>
                        </div>

                        {/* Separator */}
                        <div className="border-b border-dark-50 my-4" />

                        {/* Sections */}
                        {visibleRows.length > 0 && (
                            <div className="mt-6">
                                {visibleRows.map((row, index) => (
                                    <React.Fragment key={index}>
                                        {row.mainTitle && (
                                            <h2 className="text-left text-2xl font-bold text-gray-900 mb-4">
                                                {row.mainTitle}
                                            </h2>
                                        )}

                                        <ViewCardSection label={row.title}>
                                            {row.customRender ? (
                                                row.customRender()
                                            ) : (
                                                <div
                                                    className={`grid grid-cols-1 md:${getGridCols()} gap-4`}
                                                >
                                                    {row.fields?.map(
                                                        (field, fieldIndex) => (
                                                            <div
                                                                key={fieldIndex}
                                                                className={`${
                                                                    field.colSpan
                                                                        ? getColSpan(
                                                                              field.colSpan
                                                                          )
                                                                        : ""
                                                                }`}
                                                            >
                                                                <ViewCardField
                                                                    label={
                                                                        field.label
                                                                    }
                                                                    value={
                                                                        field.value
                                                                    }
                                                                    type={
                                                                        field.type
                                                                    }
                                                                />
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </ViewCardSection>
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                    </div>
                );

            case "tabs":
                return (
                    <div className="flex flex-col">
                        {/* Header with tab-specific buttons */}
                        {activeTabItem ? (
                            <ViewCardHeader
                                headerTitle={headerTitle}
                                hideHeaderTitle={hideHeaderTitle}
                                buttons={activeTabItem.buttons || buttons}
                                ticketButton={
                                    activeTabItem.onTicket ? true : ticketButton
                                }
                                onEdit={activeTabItem.onEdit || onEdit}
                                onDelete={activeTabItem.onDelete || onDelete}
                                onTicket={activeTabItem.onTicket || onTicket}
                                customButtonLabel={
                                    activeTabItem.customButtonLabel
                                }
                                onCustomButton={activeTabItem.onCustomButton}
                            />
                        ) : (
                            <ViewCardHeader
                                headerTitle={headerTitle}
                                hideHeaderTitle={hideHeaderTitle}
                                buttons={buttons}
                                ticketButton={ticketButton}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                onTicket={onTicket}
                                customButtonLabel={customButtonLabel}
                                onCustomButton={onCustomButton}
                            />
                        )}

                        {/* Tabs Navigation */}
                        {tabs.length > 0 && (
                            <>
                                <div className="flex border-b border-gray-200 mb-6">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.value}
                                            type="button"
                                            className={`px-4 py-2 text-sm font-medium ${
                                                activeTab === tab.value
                                                    ? "text-primary-500 border-b-2 border-primary-500"
                                                    : "text-gray-500 hover:text-primary-400 hover:border-b hover:border-primary-300"
                                            }`}
                                            onClick={() => {
                                                setActiveTab(tab.value);
                                                updateTab(tab.value);
                                            }}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Render active tab content */}
                                <div className="pt-2">
                                    {activeTabItem && activeTabItem.children}
                                </div>
                            </>
                        )}
                    </div>
                );

            default:
                return (
                    <div className="flex flex-col overflow-hidden">
                        <ViewCardHeader
                            headerTitle={headerTitle}
                            hideHeaderTitle={hideHeaderTitle}
                            buttons={buttons}
                            ticketButton={ticketButton}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onTicket={onTicket}
                            customButtonLabel={customButtonLabel}
                            onCustomButton={onCustomButton}
                        />

                        {/* Sections */}
                        {visibleRows.length > 0 && (
                            <div className="mt-6">
                                {visibleRows.map((row, index) => (
                                    <React.Fragment key={index}>
                                        {row.mainTitle && (
                                            <h2 className="text-left text-2xl font-bold text-gray-900 mb-4">
                                                {row.mainTitle}
                                            </h2>
                                        )}

                                        <ViewCardSection label={row.title}>
                                            {row.customRender ? (
                                                row.customRender()
                                            ) : (
                                                <div
                                                    className={`grid grid-cols-1 md:${getGridCols()} gap-4`}
                                                >
                                                    {row.fields?.map(
                                                        (field, fieldIndex) => (
                                                            <div
                                                                key={fieldIndex}
                                                                className={`${
                                                                    field.colSpan
                                                                        ? getColSpan(
                                                                              field.colSpan
                                                                          )
                                                                        : ""
                                                                }`}
                                                            >
                                                                <ViewCardField
                                                                    label={
                                                                        field.label
                                                                    }
                                                                    value={
                                                                        field.value
                                                                    }
                                                                    type={
                                                                        field.type
                                                                    }
                                                                />
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </ViewCardSection>
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                    </div>
                );
        }
    };

    return (
        <div className={`bg-white p-6 ${!hideBorder ? "border-wrapper" : ""}`}>
            {renderContent()}

            {/* Global Show More button */}
            {needsShowMore && (
                <div className="flex justify-center bg-dark-50 py-3 mt-6">
                    <button
                        onClick={() => setShowAllContent(!showAllContent)}
                        className="text-primary-500 font-medium flex items-center gap-1 hover:text-primary-600 transition-colors"
                    >
                        {showAllContent ? "Show Less" : "Show More"}
                        <svg
                            className={`w-4 h-4 transition-transform ${
                                showAllContent ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export { ViewCard, ViewCardField, ViewCardSection };
export default ViewCard;
