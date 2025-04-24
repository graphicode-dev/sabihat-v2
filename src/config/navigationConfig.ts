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
import ClassificationPage from "../pages/dashboard/system-management-administration/sidePages/classification";
import ClassificationViewPage from "../pages/dashboard/system-management-administration/sidePages/classification/view";
import CommercialAgentPage from "../pages/dashboard/system-management-administration/sidePages/commercial-agent";
import CommercialAgentViewPage from "../pages/dashboard/system-management-administration/sidePages/commercial-agent/view";
import CompaniesPage from "../pages/dashboard/system-management-administration/sidePages/companies";
import CompaniesViewPage from "../pages/dashboard/system-management-administration/sidePages/companies/view";
import EmployeePage from "../pages/dashboard/system-management-administration/sidePages/employee";
import EmployeeViewPage from "../pages/dashboard/system-management-administration/sidePages/employee/view";
import MarineAgentPage from "../pages/dashboard/system-management-administration/sidePages/marine-agent";
import MarineAgentViewPage from "../pages/dashboard/system-management-administration/sidePages/marine-agent/view";
import SubagentPage from "../pages/dashboard/system-management-administration/sidePages/subagent";
import SubagentViewPage from "../pages/dashboard/system-management-administration/sidePages/subagent/view";
import SystemManagementAdministrationPage from "../pages/dashboard/system-management-administration";
import SysMgmtAdminViewPage from "../pages/dashboard/system-management-administration/view";
import UserRolesPage from "../pages/dashboard/system-management-administration/sidePages/user-roles";
import UserRolesViewPage from "../pages/dashboard/system-management-administration/sidePages/user-roles/view";
import PlaceholderPage from "../pages/PlaceholderPage";
import { TabLink } from "../types";
import ShipTripManagementPage from "../pages/ship-trip-management";
import ShipTripManagementViewPage from "../pages/ship-trip-management/view";

export const navigationConfig: TabLink[] = [
    {
        icon: Administration,
        title: "System Management & Administration",
        path: "/system-management-administration",
        component: SystemManagementAdministrationPage,
        sideBar: {
            titleSection: {
                icon: Administration,
                title: "System Management & Administration",
            },
            links: [
                {
                    title: "All",
                    path: "/system-management-administration",
                    component: SystemManagementAdministrationPage,
                    subLinks: [
                        {
                            title: "View",
                            path: "view/:id",
                            component: SysMgmtAdminViewPage,
                        },
                    ],
                },
                {
                    title: "Companies",
                    path: "/system-management-administration/companies",
                    component: CompaniesPage,
                    subLinks: [
                        {
                            title: "View",
                            path: "view/:id",
                            component: CompaniesViewPage,
                        },
                    ],
                },
                {
                    title: "Marine Agent",
                    path: "/system-management-administration/marine-agent",
                    component: MarineAgentPage,
                    subLinks: [
                        {
                            title: "View",
                            path: "view/:id",
                            component: MarineAgentViewPage,
                        },
                    ],
                },
                {
                    title: "Commercial Agent",
                    path: "/system-management-administration/commercial-agent",
                    component: CommercialAgentPage,
                    subLinks: [
                        {
                            title: "View",
                            path: "view/:id",
                            component: CommercialAgentViewPage,
                        },
                    ],
                },
                {
                    title: "Subagent",
                    path: "/system-management-administration/subagent",
                    component: SubagentPage,
                    subLinks: [
                        {
                            title: "View",
                            path: "view/:id",
                            component: SubagentViewPage,
                        },
                    ],
                },
                {
                    title: "Create User Roles & Permissions",
                    path: "/system-management-administration/user-roles",
                    component: UserRolesPage,
                    subLinks: [
                        {
                            title: "View",
                            path: "view/:id",
                            component: UserRolesViewPage,
                        },
                    ],
                },
                {
                    title: "Classification",
                    path: "/system-management-administration/classification",
                    component: ClassificationPage,
                    subLinks: [
                        {
                            title: "View",
                            path: "view/:id",
                            component: ClassificationViewPage,
                        },
                    ],
                },
                {
                    title: "Employee",
                    path: "/system-management-administration/employee",
                    component: EmployeePage,
                    subLinks: [
                        {
                            title: "View",
                            path: "view/:id",
                            component: EmployeeViewPage,
                        },
                    ],
                },
            ],
        },
    },
    {
        icon: Ship,
        title: "Ship & Trip Management",
        path: "/ship-trip-management",
        component: ShipTripManagementPage,
        sideBar: {
            titleSection: {
                icon: Ship,
                title: "Ship & Trip Management",
            },
            links: [
                {
                    title: "All",
                    path: "/ship-trip-management",
                    component: ShipTripManagementPage,
                    subLinks: [
                        {
                            title: "View",
                            path: "view/:id",
                            component: ShipTripManagementViewPage,
                        },
                    ],
                },
            ],
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
