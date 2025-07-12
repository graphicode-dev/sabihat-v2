export * from "./user.types";
export * from "./api.types";
export * from "./notifications.types";
export * from "./toast.types";
export * from "./viewCard.types";

export interface PageData<T> {
    items: T[];
    hasMore: boolean;
    lastPage: number;
    currentPage: number;
    totalCount?: number;
    perPage?: number;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: {
        perPage: number;
        currentPage: number;
        lastPage: number;
        nextPageUrl: string | null;
        items: T[];
    };
}

export interface DataResponse<T> {
    success: boolean;
    message: string;
    data: T[];
}

export type Icon = {
    width?: number;
    height?: number;
    color?: string;
};

export type SideBar = {
    titleSection: {
        icon: string;
        title: string;
    };
    links: {
        title: string;
        path: string;
        component: React.ComponentType;
        subLinks?: {
            title: string;
            path: string;
            component: React.ComponentType;
        }[];
    }[];
};

export type TabLink = {
    icon: string;
    title: string;
    path: string;
    sideBar: SideBar;
};

export interface RowType {
    original: any;
}
