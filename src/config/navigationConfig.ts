import {
    Administration,
    Ship,
    Sales,
    Reporting,
    PartnersManagement,
    Boarding,
    PaymentProcessing,
    Security,
} from "../components/ui/icons";
import { TabLink } from "../types";
import PlaceholderPage from "../pages/PlaceholderPage";
import { lazy } from "react";

// #region System Management & Administration
const TaxPage = lazy(
    () => import("../pages/dashboard/system-management-administration/tax")
);
const TaxViewPage = lazy(
    () => import("../pages/dashboard/system-management-administration/tax/view")
);
const ContactMessagesPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/contact-messages"
        )
);
const ContactMessagesViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/contact-messages/view"
        )
);
const CurrencyPage = lazy(
    () => import("../pages/dashboard/system-management-administration/currency")
);
const CurrencyViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/currency/view"
        )
);
const PaymentMethodsPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/payment-methods"
        )
);
const PaymentMethodsViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/payment-methods/view"
        )
);
const CompanyProfilePage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/company-profile"
        )
);
const CompanyProfileViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/company-profile/view"
        )
);
const PartnersClassificationPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/partners-classification"
        )
);
const PartnersClassificationViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/partners-classification/view"
        )
);
const UserProfilesPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/user-profiles"
        )
);
const UserProfilesViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/user-profiles/view"
        )
);
const UserRolesPage = lazy(
    () =>
        import("../pages/dashboard/system-management-administration/user-roles")
);
const UserRolesViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/user-roles/view"
        )
);
const PoliciesPage = lazy(
    () => import("../pages/dashboard/system-management-administration/policies")
);
const PoliciesViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/policies/view"
        )
);
const TermsConditionsPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/terms-conditions"
        )
);
const TermsConditionsViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/terms-conditions/view"
        )
);
const LoadTypesPage = lazy(
    () =>
        import("../pages/dashboard/system-management-administration/load-types")
);
const LoadTypesViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/load-types/view"
        )
);
const TicketRulesPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/ticket-rules"
        )
);
const TicketRulesViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/ticket-rules/view"
        )
);
const PromotionPage = lazy(
    () =>
        import("../pages/dashboard/system-management-administration/promotion")
);
const PromotionViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/promotion/view"
        )
);
// #endregion System Management & Administration

// #region Ship & Trip Management
const CabinsPage = lazy(
    () => import("../pages/dashboard/ship-trip-management/cabins")
);
const CabinsViewPage = lazy(
    () => import("../pages/dashboard/ship-trip-management/cabins/view")
);
const PortPage = lazy(
    () => import("../pages/dashboard/ship-trip-management/port")
);
const PortViewPage = lazy(
    () => import("../pages/dashboard/ship-trip-management/port/view")
);
const ScheduleNewTripsPage = lazy(
    () => import("../pages/dashboard/ship-trip-management/schedule-new-trips")
);
const ScheduleNewTripsViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/ship-trip-management/schedule-new-trips/view"
        )
);
const ScheduleNewShipsPage = lazy(
    () => import("../pages/dashboard/ship-trip-management/schedule-new-ships")
);
const ScheduleNewShipsViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/ship-trip-management/schedule-new-ships/view"
        )
);
// #endregion Ship & Trip Management

export const navigationConfig: TabLink[] = [
    // System Management & Administration
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
                // User Profiles
                {
                    title: "User Profiles",
                    path: "/system-management-administration/user-profiles",
                    component: UserProfilesPage,
                    subLinks: [
                        {
                            title: "View",
                            path: "view/:id",
                            component: UserProfilesViewPage,
                        },
                    ],
                },

                // Create Roles & Permissions
                {
                    title: "Create Roles & Permissions",
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

                // Company Profile
                {
                    title: "Company Profile",
                    path: "/system-management-administration/company-profile",
                    component: CompanyProfilePage,
                    subLinks: [
                        {
                            title: "View",
                            path: "view/:id",
                            component: CompanyProfileViewPage,
                        },
                    ],
                },

                // Contact Messages
                {
                    title: "Contact Messages",
                    path: "/system-management-administration/contact-messages",
                    component: ContactMessagesPage,
                    subLinks: [
                        {
                            title: "View",
                            path: "view/:id",
                            component: ContactMessagesViewPage,
                        },
                    ],
                },

                // Partners Classification
                {
                    title: "Partners Classification",
                    path: "/system-management-administration/partners-classification",
                    component: PartnersClassificationPage,
                    subLinks: [
                        {
                            title: "View",
                            path: "view/:id",
                            component: PartnersClassificationViewPage,
                        },
                    ],
                },

                // Currency
                {
                    title: "Currency",
                    path: "/system-management-administration/currency",
                    component: CurrencyPage,
                    subLinks: [
                        {
                            title: "View",
                            path: "view/:id",
                            component: CurrencyViewPage,
                        },
                    ],
                },

                // Tax
                {
                    title: "Tax",
                    path: "/system-management-administration/tax",
                    component: TaxPage,
                    subLinks: [
                        {
                            title: "View",
                            path: "view/:id",
                            component: TaxViewPage,
                        },
                    ],
                },

                // Payment Methods
                {
                    title: "Payment Methods",
                    path: "/system-management-administration/payment-methods",
                    component: PaymentMethodsPage,
                    subLinks: [
                        {
                            title: "View",
                            path: "view/:id",
                            component: PaymentMethodsViewPage,
                        },
                    ],
                },

                // Policies
                {
                    title: "Policies",
                    path: "/system-management-administration/policies",
                    component: PoliciesPage,
                    subLinks: [
                        {
                            title: "View",
                            path: "view/:id",
                            component: PoliciesViewPage,
                        },
                    ],
                },

                // Terms & Conditions
                {
                    title: "Terms & Conditions",
                    path: "/system-management-administration/terms-conditions",
                    component: TermsConditionsPage,
                    subLinks: [
                        {
                            title: "View",
                            path: "view/:id",
                            component: TermsConditionsViewPage,
                        },
                    ],
                },

                // Load Types
                {
                    title: "Load Types",
                    path: "/system-management-administration/load-types",
                    component: LoadTypesPage,
                    subLinks: [
                        {
                            title: "View",
                            path: "view/:id",
                            component: LoadTypesViewPage,
                        },
                    ],
                },

                // Ticket Rules
                {
                    title: "Ticket Rules",
                    path: "/system-management-administration/ticket-rules",
                    component: TicketRulesPage,
                    subLinks: [
                        {
                            title: "View",
                            path: "view/:id",
                            component: TicketRulesViewPage,
                        },
                    ],
                },

                // Promotion
                {
                    title: "Promotion",
                    path: "/system-management-administration/promotion",
                    component: PromotionPage,
                    subLinks: [
                        {
                            title: "View",
                            path: "view/:id",
                            component: PromotionViewPage,
                        },
                    ],
                },
            ],
        },
    },

    // Ship & Trip Management
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

    // Sales & Bookings
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

    // Security & Compliance
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

    // Business Partners Management
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

    // Check-in & Boarding
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

    // Financial Transactions
    {
        icon: PaymentProcessing,
        title: "Financial Transactions",
        path: "/financial-transactions",
        sideBar: {
            titleSection: {
                icon: PaymentProcessing,
                title: "Financial Transactions",
            },
            links: [
                {
                    title: "All",
                    path: "/financial-transactions/all",
                    component: PlaceholderPage,
                },
            ],
        },
    },

    // Reporting
    {
        icon: Reporting,
        title: "Reporting",
        path: "/reporting",
        sideBar: {
            titleSection: {
                icon: Reporting,
                title: "Reporting",
            },
            links: [
                {
                    title: "All",
                    path: "/reporting/all",
                    component: PlaceholderPage,
                },
            ],
        },
    },
];
