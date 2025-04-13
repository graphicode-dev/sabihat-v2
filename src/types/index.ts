export * from "./user.types";
export * from "./api.types";
export * from "./notifications.types";
export * from "./toast.types";
export * from "./viewCard.types";

export type Icon = {
    width?: number;
    height?: number;
    color?: string;
};

export type SideBar = {
    titleSection: {
        icon: ({ width, height, color }: Icon) => React.JSX.Element;
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
    icon: ({ width, height }: Icon) => React.JSX.Element;
    title: string;
    path: string;
    component: React.ComponentType;
    sideBar: SideBar;
};
