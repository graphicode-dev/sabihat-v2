import React from "react";
import { PenIcon, TrashIcon } from "./icons";
import {
    ViewCardProps,
    ViewCardSectionProps,
    ViewCardFieldProps,
    ViewCardButtonsProps,
} from "../../types/viewCard.types";

const ViewCardSection: React.FC<ViewCardSectionProps> = ({
    title,
    children,
}) => (
    <div className="mb-8 text-left">
        <h3 className="text-sm text-left font-medium text-primary-500 mb-2">
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
                                                !Array.isArray(value)
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

                            {Object.entries(data).map(([key, value], index) => {
                                // Skip non-array values which would be the regular fields
                                if (!Array.isArray(value)) return null;

                                return (
                                    <ViewCardSection key={index} title={key}>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {value.map((field, fieldIndex) => (
                                                <ViewCardField
                                                    key={fieldIndex}
                                                    label={field.label}
                                                    value={field.value}
                                                />
                                            ))}
                                        </div>
                                    </ViewCardSection>
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
                                        ([_, value]) => !Array.isArray(value)
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

                        {/* Section data */}
                        {Object.entries(data).map(([key, value], index) => {
                            // Skip non-array values which would be the regular fields
                            if (!Array.isArray(value)) return null;

                            return (
                                <ViewCardSection key={index} title={key}>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {value.map((field, fieldIndex) => (
                                            <ViewCardField
                                                key={fieldIndex}
                                                label={field.label}
                                                value={field.value}
                                            />
                                        ))}
                                    </div>
                                </ViewCardSection>
                            );
                        })}
                    </div>
                );
        }
    };

    return (
        <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-100">
            {renderContent()}
        </div>
    );
};

export { ViewCard, ViewCardField, ViewCardSection };
export default ViewCard;
