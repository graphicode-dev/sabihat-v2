// ViewCard types

// Field item in a section
export interface ViewCardFieldItem {
    label: string;
    value: string | number | null | undefined;
}

// Type for section data (array of field items)
export type ViewCardSectionData = {
    title?: string;
    mainTitle?: string; // Optional main title that appears above the section
    fields: ViewCardFieldItem[];
};

// Generic data structure for ViewCard
export interface ViewCardData {
    [key: string]: string | number | ViewCardSectionData | undefined;
}

// Variant type
export type ViewCardVariant = "user" | "vessel" | "tabs" | "default";

// Props for the ViewCard component
export interface ViewCardProps {
    headerTitle?: string;
    title: string;
    subtitle?: string;
    variant?: ViewCardVariant;
    image?: string;
    data?: ViewCardData;
    buttons?: boolean;
    ticketButton?: boolean;
    hideBorder?: boolean;
    tabs?: ViewCardTabItem[];
    onEdit?: () => void;
    onDelete?: () => void;
    onTicket?: () => void;
}

// Props for the ViewCardSection component
export interface ViewCardSectionProps {
    title?: string;
    children: React.ReactNode;
}

// Props for the ViewCardField component
export interface ViewCardFieldProps {
    label: string;
    value?: string | number | null;
}

// Props for the ViewCardButtons component
export interface ViewCardButtonsProps {
    ticketButton?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
    onTicket?: () => void;
}

export interface ViewCardHeaderProps {
    title?: string;
    buttons?: boolean;
    ticketButton?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
    onTicket?: () => void;
}

export interface ViewCardTabItem {
    label: string;
    value: string;
    buttonLabel?: string;
    buttonHref?: string;
    entity?: string | string[];
    role?: string | string[];
    children: React.ReactNode;
    buttons?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
    onTicket?: () => void;
}
