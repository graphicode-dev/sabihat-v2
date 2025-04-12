import {
    Administration,
    Ship,
    Sales,
    Cargo,
    Auditing,
    PartnersManagement,
    Boarding,
    PaymentProcessing,
    QuotaManagement,
    Security,
    Settings,
} from "../components/ui/icons";
import SystemManagementAdministration from "../pages/dashboard/system-management-administration/SystemManagementAdministration";
import PlaceholderPage from "../pages/PlaceholderPage";
import { TabLink } from "../types";

/**
 * Returns the application's navigation configuration including routes,
 * sidebar links, and associated components.
 *
 * This configuration is used to generate the main navigation and sidebar
 * throughout the application.
 */
export const navigationConfig: TabLink[] = [
    {
        icon: Administration,
        title: "System Management & Administration",
        path: "/system-management-administration",
        component: SystemManagementAdministration,
        sideBar: {
            titleSection: {
                icon: Administration,
                title: "System Management & Administration",
            },
            links: [
                {
                    title: "All",
                    path: "/system-management-administration",
                    component: SystemManagementAdministration,
                },
                {
                    title: "Companies",
                    path: "/system-management-administration/companies",
                    component: PlaceholderPage,
                },
                {
                    title: "Marine Agent",
                    path: "/system-management-administration/marine-agent",
                    component: PlaceholderPage,
                },
                {
                    title: "Commercial Agent",
                    path: "/system-management-administration/commercial-agent",
                    component: PlaceholderPage,
                },
                {
                    title: "Subagent",
                    path: "/system-management-administration/subagent",
                    component: PlaceholderPage,
                },
                {
                    title: "Create User Roles & Permissions",
                    path: "/system-management-administration/user-roles",
                    component: PlaceholderPage,
                },
                {
                    title: "Classification",
                    path: "/system-management-administration/classification",
                    component: PlaceholderPage,
                },
                {
                    title: "Employee",
                    path: "/system-management-administration/employee",
                    component: PlaceholderPage,
                },
            ],
        },
    },
    {
        icon: Ship,
        title: "Ship & Trip Management",
        path: "/ship-trip-management",
        component: PlaceholderPage,
        sideBar: {
            titleSection: {
                icon: Ship,
                title: "Ship & Trip Management",
            },
            links: [],
        },
    },
    {
        icon: Sales,
        title: "Sales & Bookings",
        path: "/sales-bookings",
        component: PlaceholderPage,
        sideBar: {
            titleSection: {
                icon: Sales,
                title: "Sales & Bookings",
            },
            links: [],
        },
    },
    {
        icon: Cargo,
        title: "Cargo & Vehicle Handling",
        path: "/cargo-vehicle-handling",
        component: PlaceholderPage,
        sideBar: {
            titleSection: {
                icon: Cargo,
                title: "Cargo & Vehicle Handling",
            },
            links: [],
        },
    },
    {
        icon: Auditing,
        title: "Financial Reporting & Auditing",
        path: "/financial-reporting-auditing",
        component: PlaceholderPage,
        sideBar: {
            titleSection: {
                icon: Auditing,
                title: "Financial Reporting & Auditing",
            },
            links: [],
        },
    },
    {
        icon: PartnersManagement,
        title: "Business Partners Management",
        path: "/business-partners-management",
        component: PlaceholderPage,
        sideBar: {
            titleSection: {
                icon: PartnersManagement,
                title: "Business Partners Management",
            },
            links: [],
        },
    },
    {
        icon: Boarding,
        title: "Check-in & Boarding",
        path: "/check-in-boarding",
        component: PlaceholderPage,
        sideBar: {
            titleSection: {
                icon: Boarding,
                title: "Check-in & Boarding",
            },
            links: [],
        },
    },
    {
        icon: PaymentProcessing,
        title: "Payment Processing & Financial Transactions",
        path: "/payment-processing-financial-transactions",
        component: PlaceholderPage,
        sideBar: {
            titleSection: {
                icon: PaymentProcessing,
                title: "Payment Processing & Financial Transactions",
            },
            links: [],
        },
    },
    {
        icon: QuotaManagement,
        title: "Quota Management",
        path: "/quota-management",
        component: PlaceholderPage,
        sideBar: {
            titleSection: {
                icon: QuotaManagement,
                title: "Quota Management",
            },
            links: [],
        },
    },
    {
        icon: Security,
        title: "Security & Compliance",
        path: "/security-compliance",
        component: PlaceholderPage,
        sideBar: {
            titleSection: {
                icon: Security,
                title: "Security & Compliance",
            },
            links: [],
        },
    },
    {
        icon: Settings,
        title: "Settings",
        path: "/settings",
        component: PlaceholderPage,
        sideBar: {
            titleSection: {
                icon: Settings,
                title: "Settings",
            },
            links: [],
        },
    },
];
