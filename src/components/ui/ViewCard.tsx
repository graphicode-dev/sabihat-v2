import React, { useState } from "react";
import { PenIcon, TrashIcon } from "./icons";
import {
    ViewCardProps,
    ViewCardSectionProps,
    ViewCardFieldProps,
    ViewCardButtonsProps,
    ViewCardSectionData,
} from "../../types/viewCard.types";

const ViewCardSection: React.FC<ViewCardSectionProps> = ({
    title,
    children,
}) => (
    <div className="mb-8 text-left">
        <h3 className="text-sm text-left font-bold text-primary-500 mb-2">
            {title}
        </h3>
        {children}
    </div>
);

const ViewCardField: React.FC<ViewCardFieldProps> = ({ label, value }) => (
    <div className="mb-4 flex flex-col">
        <h4 className="text-sm text-dark-200 mb-1">{label}</h4>
        <p className="text-dark-500 font-medium">
            {value || "••••••••••••••••"}
        </p>
    </div>
);

const ViewCardButtons: React.FC<ViewCardButtonsProps> = ({
    ticketButton,
    onEdit,
    onDelete,
    onTicket,
}) => {
    return (
        <div className="flex gap-2">
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

const ViewCard: React.FC<ViewCardProps> = ({
    title,
    subtitle,
    variant = "default",
    image,
    data = {},
    buttons,
    ticketButton,
    onEdit,
    onDelete,
    onTicket,
}) => {
    // State to track if all content is shown or limited
    const [showAllContent, setShowAllContent] = useState(false);

    // Default number of sections to show initially
    const initialSectionsToShow = 2;

    // Get all section keys (keys that have objects with fields property)
    const sectionKeys = Object.entries(data)
        .filter(
            ([_, value]) =>
                typeof value === "object" && value !== null && "fields" in value
        )
        .map(([key]) => key);

    // Determine if we need a show more button
    const needsShowMore = sectionKeys.length > initialSectionsToShow;

    // Get the sections to display based on current state
    const visibleSectionKeys = showAllContent
        ? sectionKeys
        : sectionKeys.slice(0, initialSectionsToShow);
    // Render different layouts based on variant
    const renderContent = () => {
        switch (variant) {
            case "user":
                return (
                    <div className="flex flex-col gap-6">
                        {/* Buttons */}
                        <div className="flex justify-between items-center gap-2">
                            <h1 className="text-xl font-bold">View</h1>
                            {buttons && (
                                <ViewCardButtons
                                    ticketButton={ticketButton}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                    onTicket={onTicket}
                                />
                            )}
                        </div>

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
                        <div className="border-b border-dark-50 my-4" />

                        {/* User Details */}
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 md:mt-0">
                            {Object.entries(data).map(([key, value], index) => (
                                <ViewCardField
                                    key={index}
                                    label={key}
                                    value={value as string | number}
                                />
                            ))}
                        </div>
                    </div>
                );

            case "vessel":
                return (
                    <div className="flex flex-col gap-6">
                        {/* Buttons */}
                        <div className="flex justify-between items-center gap-2">
                            <h1 className="text-xl font-bold">View</h1>
                            {buttons && (
                                <ViewCardButtons
                                    ticketButton={ticketButton}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                    onTicket={onTicket}
                                />
                            )}
                        </div>

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
                        <div className="mt-6">
                            {/* Regular fields */}
                            <ViewCardSection>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {Object.entries(data)
                                        .filter(
                                            ([_, value]) =>
                                                typeof value !== "object" ||
                                                value === null ||
                                                !("fields" in value)
                                        )
                                        .map(([key, value], index) => (
                                            <ViewCardField
                                                key={index}
                                                label={key}
                                                value={value as string | number}
                                            />
                                        ))}
                                </div>
                            </ViewCardSection>

                            {/* Section data with fields */}
                            {Object.entries(data)
                                .filter(([key, value]) => {
                                    // Only process objects with fields property
                                    if (
                                        typeof value !== "object" ||
                                        value === null ||
                                        !("fields" in value)
                                    ) {
                                        return false;
                                    }

                                    const sectionData =
                                        value as ViewCardSectionData;

                                    // Skip if fields is not an array or is empty
                                    if (
                                        !Array.isArray(sectionData.fields) ||
                                        sectionData.fields.length === 0
                                    ) {
                                        return false;
                                    }

                                    // Only show sections that are in the visible keys list
                                    return visibleSectionKeys.includes(key);
                                })
                                .map(([key, value], index) => {
                                    // Safe to cast now
                                    const sectionData =
                                        value as ViewCardSectionData;

                                    return (
                                        <React.Fragment key={index}>
                                            {sectionData.mainTitle && (
                                                <h2 className="text-left text-2xl font-bold text-gray-900 mb-4">
                                                    {sectionData.mainTitle}
                                                </h2>
                                            )}
                                            <ViewCardSection
                                                title={sectionData.title || key}
                                            >
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    {sectionData.fields.map(
                                                        (field, fieldIndex) => (
                                                            <ViewCardField
                                                                key={fieldIndex}
                                                                label={
                                                                    field.label
                                                                }
                                                                value={
                                                                    field.value
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </ViewCardSection>
                                        </React.Fragment>
                                    );
                                })}
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="flex flex-col gap-6">
                        <div className="flex justify-between items-start">
                            <h1 className="text-xl font-bold text-gray-900">
                                {title}
                            </h1>

                            {buttons && (
                                <ViewCardButtons
                                    ticketButton={ticketButton}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                    onTicket={onTicket}
                                />
                            )}
                        </div>

                        {/* Regular fields */}
                        <ViewCardSection>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {Object.entries(data)
                                    .filter(
                                        ([_, value]) =>
                                            typeof value !== "object" ||
                                            value === null ||
                                            !("fields" in value)
                                    )
                                    .map(([key, value], index) => (
                                        <ViewCardField
                                            key={index}
                                            label={key}
                                            value={value as string | number}
                                        />
                                    ))}
                            </div>
                        </ViewCardSection>

                        {/* Section data with fields */}
                        {Object.entries(data)
                            .filter(([key, value]) => {
                                // Only process objects with fields property
                                if (
                                    typeof value !== "object" ||
                                    value === null ||
                                    !("fields" in value)
                                ) {
                                    return false;
                                }

                                const sectionData =
                                    value as ViewCardSectionData;

                                // Skip if fields is not an array or is empty
                                if (
                                    !Array.isArray(sectionData.fields) ||
                                    sectionData.fields.length === 0
                                ) {
                                    return false;
                                }

                                // Only show sections that are in the visible keys list
                                return visibleSectionKeys.includes(key);
                            })
                            .map(([key, value], index) => {
                                // Safe to cast now
                                const sectionData =
                                    value as ViewCardSectionData;

                                return (
                                    <React.Fragment key={index}>
                                        {sectionData.mainTitle && (
                                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                                {sectionData.mainTitle}
                                            </h2>
                                        )}
                                        <ViewCardSection
                                            title={sectionData.title || key}
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {sectionData.fields.map(
                                                    (field, fieldIndex) => (
                                                        <ViewCardField
                                                            key={fieldIndex}
                                                            label={field.label}
                                                            value={field.value}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </ViewCardSection>
                                    </React.Fragment>
                                );
                            })}
                    </div>
                );
        }
    };

    return (
        <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-100">
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
