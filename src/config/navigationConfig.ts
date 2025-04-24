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
import ClassificationPage from "../pages/dashboard/system-management-administration/classification";
import ClassificationViewPage from "../pages/dashboard/system-management-administration/classification/view";
import CommercialAgentPage from "../pages/dashboard/system-management-administration/commercial-agent";
import CommercialAgentViewPage from "../pages/dashboard/system-management-administration/commercial-agent/view";
import CompaniesPage from "../pages/dashboard/system-management-administration/companies";
import CompaniesViewPage from "../pages/dashboard/system-management-administration/companies/view";
import EmployeePage from "../pages/dashboard/system-management-administration/employee";
import EmployeeViewPage from "../pages/dashboard/system-management-administration/employee/view";
import MarineAgentPage from "../pages/dashboard/system-management-administration/marine-agent";
import MarineAgentViewPage from "../pages/dashboard/system-management-administration/marine-agent/view";
import SubagentPage from "../pages/dashboard/system-management-administration/subagent";
import SubagentViewPage from "../pages/dashboard/system-management-administration/subagent/view";
import SystemManagementAdministrationPage from "../pages/dashboard/system-management-administration/all";
import SysMgmtAdminViewPage from "../pages/dashboard/system-management-administration/all/view";
import UserRolesPage from "../pages/dashboard/system-management-administration/user-roles";
import UserRolesViewPage from "../pages/dashboard/system-management-administration/user-roles/view";

import { TabLink } from "../types";
import CabinsPage from "../pages/dashboard/ship-trip-management/cabins";
import CabinsViewPage from "../pages/dashboard/ship-trip-management/cabins/view";
import PortPage from "../pages/dashboard/ship-trip-management/port";
import PortViewPage from "../pages/dashboard/ship-trip-management/port/view";
import ScheduleNewTripsPage from "../pages/dashboard/ship-trip-management/schedule-new-trips";
import ScheduleNewTripsViewPage from "../pages/dashboard/ship-trip-management/schedule-new-trips/view";
import ScheduleNewShipsPage from "../pages/dashboard/ship-trip-management/schedule-new-ships";
import ScheduleNewShipsViewPage from "../pages/dashboard/ship-trip-management/schedule-new-ships/view";
import PlaceholderPage from "../pages/PlaceholderPage";

export const navigationConfig: TabLink[] = [
    {
        icon: Administration,
        title: "System Management & Administration",
        path: "/system-management-administration",
        sideBar: {
            titleSection: {
                icon: Administration,
                title: "System Management & Administration",
            },
            links: [
                {
                    title: "All",
                    path: "/system-management-administration/all",
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
        sideBar: {
            titleSection: {
                icon: Ship,
                title: "Ship & Trip Management",
            },
            links: [
                {
                    title: "Cabins",
                    path: "/ship-trip-management/cabins",
                    component: CabinsPage,
                    subLinks: [
                        {
                            title: "View",
                            path: "view/:id",
                            component: CabinsViewPage,
                        },
                    ],
                },
                {
                    title: "Port",
                    path: "/ship-trip-management/port",
                    component: PortPage,
                    subLinks: [
                        {
                            title: "View",
                            path: "view/:id",
                            component: PortViewPage,
                        },
                    ],
                },
                {
                    title: "Schedule New Ships",
                    path: "/ship-trip-management/schedule-new-ships",
                    component: ScheduleNewShipsPage,
                    subLinks: [
                        {
                            title: "View",
                            path: "view/:id",
                            component: ScheduleNewShipsViewPage,
                        },
                    ],
                },
                {
                    title: "Schedule New Trips",
                    path: "/ship-trip-management/schedule-new-trips",
                    component: ScheduleNewTripsPage,
                    subLinks: [
                        {
                            title: "View",
                            path: "view/:id",
                            component: ScheduleNewTripsViewPage,
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
        sideBar: {
            titleSection: {
                icon: Sales,
                title: "Sales & Bookings",
            },
            links: [
                {
                    title: "All",
                    path: "/sales-bookings/all",
                    component: PlaceholderPage,
                },
            ],
        },
    },
    {
        icon: Cargo,
        title: "Cargo & Vehicle Handling",
        path: "/cargo-vehicle-handling",
        sideBar: {
            titleSection: {
                icon: Cargo,
                title: "Cargo & Vehicle Handling",
            },
            links: [
                {
                    title: "All",
                    path: "/cargo-vehicle-handling/all",
                    component: PlaceholderPage,
                },
            ],
        },
    },
    {
        icon: Auditing,
        title: "Financial Reporting & Auditing",
        path: "/financial-reporting-auditing",
        sideBar: {
            titleSection: {
                icon: Auditing,
                title: "Financial Reporting & Auditing",
            },
            links: [
                {
                    title: "All",
                    path: "/financial-reporting-auditing/all",
                    component: PlaceholderPage,
                },
            ],
        },
    },
    {
        icon: PartnersManagement,
        title: "Business Partners Management",
        path: "/business-partners-management",
        sideBar: {
            titleSection: {
                icon: PartnersManagement,
                title: "Business Partners Management",
            },
            links: [
                {
                    title: "All",
                    path: "/business-partners-management/all",
                    component: PlaceholderPage,
                },
            ],
        },
    },
    {
        icon: Boarding,
        title: "Check-in & Boarding",
        path: "/check-in-boarding",
        sideBar: {
            titleSection: {
                icon: Boarding,
                title: "Check-in & Boarding",
            },
            links: [
                {
                    title: "All",
                    path: "/check-in-boarding/all",
                    component: PlaceholderPage,
                },
            ],
        },
    },
    {
        icon: PaymentProcessing,
        title: "Payment Processing & Financial Transactions",
        path: "/payment-processing-financial-transactions",
        sideBar: {
            titleSection: {
                icon: PaymentProcessing,
                title: "Payment Processing & Financial Transactions",
            },
            links: [
                {
                    title: "All",
                    path: "/payment-processing-financial-transactions/all",
                    component: PlaceholderPage,
                },
            ],
        },
    },
    {
        icon: QuotaManagement,
        title: "Quota Management",
        path: "/quota-management",
        sideBar: {
            titleSection: {
                icon: QuotaManagement,
                title: "Quota Management",
            },
            links: [
                {
                    title: "All",
                    path: "/quota-management/all",
                    component: PlaceholderPage,
                },
            ],
        },
    },
    {
        icon: Security,
        title: "Security & Compliance",
        path: "/security-compliance",
        sideBar: {
            titleSection: {
                icon: Security,
                title: "Security & Compliance",
            },
            links: [
                {
                    title: "All",
                    path: "/security-compliance/all",
                    component: PlaceholderPage,
                },
            ],
        },
    },
    {
        icon: Settings,
        title: "Settings",
        path: "/settings",
        sideBar: {
            titleSection: {
                icon: Settings,
                title: "Settings",
            },
            links: [
                {
                    title: "All",
                    path: "/settings/all",
                    component: PlaceholderPage,
                },
            ],
        },
    },
];
