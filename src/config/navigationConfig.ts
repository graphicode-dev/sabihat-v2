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

// #region Tax
const TaxPage = lazy(
    () => import("../pages/dashboard/system-management-administration/tax")
);
const TaxViewPage = lazy(
    () => import("../pages/dashboard/system-management-administration/tax/view")
);
const TaxAddPage = lazy(
    () => import("../pages/dashboard/system-management-administration/tax/add")
);
// #endregion Tax

// #region Contact Messages
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
// #endregion Contact Messages

// #region Currency
const CurrencyPage = lazy(
    () => import("../pages/dashboard/system-management-administration/currency")
);
const CurrencyViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/currency/view"
        )
);
const CurrencyAddPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/currency/add"
        )
);
// #endregion Currency

// #region Payment Methods
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
const PaymentMethodsAddPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/payment-methods/add"
        )
);
// #endregion Payment Methods

// #region Company Profile
const CompanyProfilePage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/company-profile"
        )
);
const CompanyEditPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/company-profile/edit/CompanyEdit"
        )
);
const SettingsEditPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/company-profile/edit/SettingsEdit"
        )
);
const ContactUsEditPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/company-profile/edit/ContactUsEdit"
        )
);
const AboutUsEditPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/company-profile/edit/AboutUsEdit"
        )
);
// #endregion Company Profile

// #region Partners Classification
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
const PartnersClassificationAddPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/partners-classification/add"
        )
);

// #endregion Partners Classification

// #region User Profiles
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
const UserProfilesAddPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/user-profiles/add"
        )
);
//  #endregion User Profiles

//  #region User Roles
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
//  #endregion User Roles

// #region Policies
const PoliciesPage = lazy(
    () => import("../pages/dashboard/system-management-administration/policies")
);
const PoliciesViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/policies/view"
        )
);
const PoliciesAddPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/policies/add"
        )
);
// #endregion Policies

// #region Terms & Conditions
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
const TermsConditionsAddPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/terms-conditions/add"
        )
);
// #endregion Terms & Conditions

// #region Load Types
const LoadTypesPage = lazy(
    () =>
        import("../pages/dashboard/system-management-administration/load-types")
);
const LoadTypesPassengerViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/load-types/view/view-passenger"
        )
);
const LoadTypesCargoViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/load-types/view/view-cargo"
        )
);
const LoadTypesVehicleViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/load-types/view/view-vehicle"
        )
);
const LoadTypesPassengerAddPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/load-types/add/add-passenger"
        )
);
const LoadTypesCargoAddPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/load-types/add/add-cargo"
        )
);
const LoadTypesVehicleAddPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/load-types/add/add-vehicle"
        )
);
// #endregion Load Types

// #region Ticket Rules
const TicketRulesPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/ticket-rules"
        )
);
const TicketRulesVoidViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/ticket-rules/view/view-void"
        )
);
const TicketRulesVoidAddPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/ticket-rules/add/add-void"
        )
);
const TicketRulesRefundViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/ticket-rules/view/view-refund"
        )
);
const TicketRulesRefundAddPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/ticket-rules/add/add-refund"
        )
);
const TicketRulesNoShowViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/ticket-rules/view/view-noShow"
        )
);
const TicketRulesNoShowAddPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/ticket-rules/add/add-noShow"
        )
);

const TicketRulesReissueViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/ticket-rules/view/view-reissue"
        )
);
const TicketRulesReissueAddPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/ticket-rules/add/add-reissue"
        )
);

// #endregion Ticket Rules

// #region Promotion
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
const PromotionAddPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/promotion/add"
        )
);
// #endregion Promotion

// #endregion System Management & Administration

// #region Ship & Trip Management

// #region Cabins
const CabinsPage = lazy(
    () => import("../pages/dashboard/ship-trip-management/cabins")
);
const CabinsViewPage = lazy(
    () => import("../pages/dashboard/ship-trip-management/cabins/view")
);
// #endregion Cabins

// #region Port
const PortPage = lazy(
    () => import("../pages/dashboard/ship-trip-management/port")
);
const PortViewPage = lazy(
    () => import("../pages/dashboard/ship-trip-management/port/view")
);
const PortAddPage = lazy(
    () => import("../pages/dashboard/ship-trip-management/port/add")
);
const PortEditPage = lazy(
    () => import("../pages/dashboard/ship-trip-management/port/edit")
);
// #endregion Port

// #region Schedule New Trips
const ScheduleNewTripsPage = lazy(
    () => import("../pages/dashboard/ship-trip-management/schedule-new-trips")
);
const ScheduleNewTripsViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/ship-trip-management/schedule-new-trips/view"
        )
);
const ScheduleNewTripsEditPage = lazy(
    () =>
        import(
            "../pages/dashboard/ship-trip-management/schedule-new-trips/edit"
        )
);
const ScheduleNewTripsTicketsPage = lazy(
    () =>
        import(
            "../pages/dashboard/ship-trip-management/schedule-new-trips/tickets"
        )
);
const ScheduleNewTripsTicketsViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/ship-trip-management/schedule-new-trips/tickets/view"
        )
);
const ScheduleNewTripsTicketsEditPage = lazy(
    () =>
        import(
            "../pages/dashboard/ship-trip-management/schedule-new-trips/tickets/edit"
        )
);
// #endregion Schedule New Trips

// #region Schedule New Ships
const ScheduleNewShipsPage = lazy(
    () => import("../pages/dashboard/ship-trip-management/schedule-new-ships")
);
const ScheduleNewShipsViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/ship-trip-management/schedule-new-ships/view"
        )
);
const ScheduleNewShipsEditPage = lazy(
    () =>
        import(
            "../pages/dashboard/ship-trip-management/schedule-new-ships/edit"
        )
);
// #endregion Schedule New Ships

// #endregion Ship & Trip Management

// #region Business Partners Management

// #region Partners
const BusinessPartnersPage = lazy(
    () => import("../pages/dashboard/business-partners-management/partners")
);
const BusinessPartnersViewPage = lazy(
    () =>
        import("../pages/dashboard/business-partners-management/partners/view")
);
const BusinessPartnersEditPage = lazy(
    () =>
        import("../pages/dashboard/business-partners-management/partners/edit")
);
const BusinessPartnersAddPage = lazy(
    () => import("../pages/dashboard/business-partners-management/partners/add")
);
// #endregion Partners

// #region Commissions
const BusinessPartnersCommissionsPage = lazy(
    () => import("../pages/dashboard/business-partners-management/commissions")
);
const BusinessPartnersCommissionsViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/business-partners-management/commissions/view"
        )
);
const BusinessPartnersCommissionsAddPage = lazy(
    () =>
        import(
            "../pages/dashboard/business-partners-management/commissions/add"
        )
);
// #endregion Commissions

// #region Markup & Discounts
const BusinessPartnersMarkupDiscountsPage = lazy(
    () =>
        import(
            "../pages/dashboard/business-partners-management/markup-discounts"
        )
);
const BusinessPartnersMarkupDiscountsViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/business-partners-management/markup-discounts/view"
        )
);
const BusinessPartnersMarkupDiscountsAddPage = lazy(
    () =>
        import(
            "../pages/dashboard/business-partners-management/markup-discounts/add"
        )
);
// #endregion Markup & Discounts

// #region Authorities
const BusinessPartnersAuthoritiesPage = lazy(
    () => import("../pages/dashboard/business-partners-management/authorities")
);
const BusinessPartnersAuthoritiesViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/business-partners-management/authorities/view"
        )
);
const BusinessPartnersAuthoritiesEditPage = lazy(
    () =>
        import(
            "../pages/dashboard/business-partners-management/authorities/edit"
        )
);
// #endregion Authorities

// #endregion Business Partners Management

// #region Sales & Bookings

// #region Price Lists B2B
const PriceListsB2BPage = lazy(
    () => import("../pages/dashboard/sales-bookings/price-lists-B2B")
);
const PriceListsB2BViewPagePassengerPriceList = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/price-lists-B2B/view/PriceListsB2BPassengerView"
        )
);
const PriceListsB2BViewPageCargoPriceList = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/price-lists-B2B/view/PriceListsB2BCargoView"
        )
);
const PriceListsB2BViewPageVehiclePriceList = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/price-lists-B2B/view/PriceListsB2BVehicleView"
        )
);
const PriceListsB2BEditPagePassengerPriceList = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/price-lists-B2B/edit/PriceListsB2BPassengerEdit"
        )
);
const PriceListsB2BEditPageCargoPriceList = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/price-lists-B2B/edit/PriceListsB2BCargoEdit"
        )
);
const PriceListsB2BEditPageVehiclePriceList = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/price-lists-B2B/edit/PriceListsB2BVehicleEdit"
        )
);
const PriceListsB2BAddPagePassengerPriceList = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/price-lists-B2B/add/PriceListsB2BPassengerAdd"
        )
);
const PriceListsB2BAddPageCargoPriceList = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/price-lists-B2B/add/PriceListsB2BCargoAdd"
        )
);
const PriceListsB2BAddPageVehiclePriceList = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/price-lists-B2B/add/PriceListsB2BVehicleAdd"
        )
);
// #endregion Price Lists B2B

// #region Price Lists B2C
const PriceListsB2CPage = lazy(
    () => import("../pages/dashboard/sales-bookings/price-lists-B2C")
);
const PriceListsB2CViewPagePassengerPriceList = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/price-lists-B2C/view/PriceListsB2CPassengerView"
        )
);
const PriceListsB2CViewPageCargoPriceList = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/price-lists-B2C/view/PriceListsB2CCargoView"
        )
);
const PriceListsB2CViewPageVehiclePriceList = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/price-lists-B2C/view/PriceListsB2CVehicleView"
        )
);
const PriceListsB2CEditPagePassengerPriceList = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/price-lists-B2C/edit/PriceListsB2CPassengerEdit"
        )
);
const PriceListsB2CEditPageCargoPriceList = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/price-lists-B2C/edit/PriceListsB2CCargoEdit"
        )
);
const PriceListsB2CEditPageVehiclePriceList = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/price-lists-B2C/edit/PriceListsB2CVehicleEdit"
        )
);
const PriceListsB2CAddPagePassengerPriceList = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/price-lists-B2C/add/PriceListsB2CPassengerAdd"
        )
);
const PriceListsB2CAddPageCargoPriceList = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/price-lists-B2C/add/PriceListsB2CCargoAdd"
        )
);
const PriceListsB2CAddPageVehiclePriceList = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/price-lists-B2C/add/PriceListsB2CVehicleAdd"
        )
);
// #endregion Price Lists B2C

// #region Excess baggage price B2B
const ExcessBaggagePriceB2BPage = lazy(
    () => import("../pages/dashboard/sales-bookings/excess-baggage-price-B2B")
);
const ExcessBaggagePriceB2BViewPassengerPriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/excess-baggage-price-B2B/view/ExcessBaggagePriceB2BPassengerView"
        )
);
const ExcessBaggagePriceB2BViewCargoPriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/excess-baggage-price-B2B/view/ExcessBaggagePriceB2BCargoView"
        )
);
const ExcessBaggagePriceB2BViewVehiclePriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/excess-baggage-price-B2B/view/ExcessBaggagePriceB2BVehicleView"
        )
);
const ExcessBaggagePriceB2BEditPassengerPriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/excess-baggage-price-B2B/edit/ExcessBaggagePriceB2BPassengerEdit"
        )
);
const ExcessBaggagePriceB2BEditCargoPriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/excess-baggage-price-B2B/edit/ExcessBaggagePriceB2BCargoEdit"
        )
);
const ExcessBaggagePriceB2BEditVehiclePriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/excess-baggage-price-B2B/edit/ExcessBaggagePriceB2BVehicleEdit"
        )
);
const ExcessBaggagePriceB2BAddPassengerPriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/excess-baggage-price-B2B/add/ExcessBaggagePriceB2BPassengerAdd"
        )
);
const ExcessBaggagePriceB2BAddCargoPriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/excess-baggage-price-B2B/add/ExcessBaggagePriceB2BCargoAdd"
        )
);
const ExcessBaggagePriceB2BAddVehiclePriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/excess-baggage-price-B2B/add/ExcessBaggagePriceB2BVehicleAdd"
        )
);
// #endregion Excess baggage price B2B

// #region Excess baggage price B2C
const ExcessBaggagePriceB2CPage = lazy(
    () => import("../pages/dashboard/sales-bookings/excess-baggage-price-B2C")
);
const ExcessBaggagePriceB2CViewPassengerPriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/excess-baggage-price-B2C/view/ExcessBaggagePriceB2CPassengerView"
        )
);
const ExcessBaggagePriceB2CViewCargoPriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/excess-baggage-price-B2C/view/ExcessBaggagePriceB2CCargoView"
        )
);
const ExcessBaggagePriceB2CViewVehiclePriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/excess-baggage-price-B2C/view/ExcessBaggagePriceB2CVehicleView"
        )
);
const ExcessBaggagePriceB2CEditPassengerPriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/excess-baggage-price-B2C/edit/ExcessBaggagePriceB2CPassengerEdit"
        )
);
const ExcessBaggagePriceB2CEditCargoPriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/excess-baggage-price-B2C/edit/ExcessBaggagePriceB2CCargoEdit"
        )
);
const ExcessBaggagePriceB2CEditVehiclePriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/excess-baggage-price-B2C/edit/ExcessBaggagePriceB2CVehicleEdit"
        )
);
const ExcessBaggagePriceB2CAddPassengerPriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/excess-baggage-price-B2C/add/ExcessBaggagePriceB2CPassengerAdd"
        )
);
const ExcessBaggagePriceB2CAddCargoPriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/excess-baggage-price-B2C/add/ExcessBaggagePriceB2CCargoAdd"
        )
);
const ExcessBaggagePriceB2CAddVehiclePriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/excess-baggage-price-B2C/add/ExcessBaggagePriceB2CVehicleAdd"
        )
);
// #endregion Excess baggage price B2C

// #region Allowed Weight
const AllowedWeightPage = lazy(
    () => import("../pages/dashboard/sales-bookings/allowed-weight")
);
const AllowedWeightViewPassengerPriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/allowed-weight/view/AllowedWeightPassengerView"
        )
);
const AllowedWeightViewCargoPriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/allowed-weight/view/AllowedWeightCargoView"
        )
);
const AllowedWeightViewVehiclePriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/allowed-weight/view/AllowedWeightVehicleView"
        )
);
const AllowedWeightEditPassengerPriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/allowed-weight/edit/AllowedWeightPassengerEdit"
        )
);
const AllowedWeightEditCargoPriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/allowed-weight/edit/AllowedWeightCargoEdit"
        )
);
const AllowedWeightEditVehiclePriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/allowed-weight/edit/AllowedWeightVehicleEdit"
        )
);
const AllowedWeightAddPassengerPriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/allowed-weight/add/AllowedWeightPassengerAdd"
        )
);
const AllowedWeightAddCargoPriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/allowed-weight/add/AllowedWeightCargoAdd"
        )
);
const AllowedWeightAddVehiclePriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/allowed-weight/add/AllowedWeightVehicleAdd"
        )
);
// #endregion Allowed Weight

// #region Tickets
const TicketsPage = lazy(
    () => import("../pages/dashboard/sales-bookings/tickets")
);
const TicketsCargoViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/tickets/view/TicketsCargoView"
        )
);
const TicketsPassengerViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/tickets/view/TicketsPassengerView"
        )
);
const TicketsVehicleViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/tickets/view/TicketsVehicleView"
        )
);
const TicketsCargoEditPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/tickets/edit/TicketsCargoEdit"
        )
);
const TicketsPassengerEditPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/tickets/edit/TicketsPassengerEdit"
        )
);
const TicketsVehicleEditPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/tickets/edit/TicketsVehicleEdit"
        )
);
// #endregion Tickets

// #region Ticket Excess Baggage
const TicketExcessBaggagePage = lazy(
    () => import("../pages/dashboard/sales-bookings/ticket-excess-baggage")
);
const TicketExcessBaggageViewPage = lazy(
    () => import("../pages/dashboard/sales-bookings/ticket-excess-baggage/view")
);
// #endregion Ticket Excess Baggage

// #endregion Sales & Bookings

// #region Financial Transactions

// #region Chart Of Account
const ChartOfAccountPage = lazy(
    () => import("../pages/dashboard/financial-transactions/chart-of-account")
);
const ChartOfAccountViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/financial-transactions/chart-of-account/view"
        )
);
const ChartOfAccountEditPage = lazy(
    () =>
        import(
            "../pages/dashboard/financial-transactions/chart-of-account/edit"
        )
);
// #endregion Chart Of Account

// #region Journal Entries
const JournalEntriesPage = lazy(
    () => import("../pages/dashboard/financial-transactions/journal-entries")
);
const JournalEntriesViewPage = lazy(
    () =>
        import("../pages/dashboard/financial-transactions/journal-entries/view")
);
const JournalEntriesEditPage = lazy(
    () =>
        import("../pages/dashboard/financial-transactions/journal-entries/edit")
);
// #endregion Journal Entries

// #region Payment & Receipts
const PaymentReceiptsPage = lazy(
    () => import("../pages/dashboard/financial-transactions/payment-receipts")
);
const PaymentReceiptsViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/financial-transactions/payment-receipts/view"
        )
);
const PaymentReceiptsEditPage = lazy(
    () =>
        import(
            "../pages/dashboard/financial-transactions/payment-receipts/edit"
        )
);
// #endregion Payment & Receipts

// #endregion Financial Transactions

export const navigationConfig: TabLink[] = [
    // #region System Management & Administration
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
                        {
                            title: "Add",
                            path: "/add",
                            component: UserProfilesAddPage,
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
                            title: "Edit",
                            path: "edit/profile",
                            component: CompanyEditPage,
                        },
                        {
                            title: "About Us",
                            path: "edit/about-us",
                            component: AboutUsEditPage,
                        },
                        {
                            title: "Contact Us",
                            path: "edit/contact-us",
                            component: ContactUsEditPage,
                        },
                        {
                            title: "Settings",
                            path: "edit/setting",
                            component: SettingsEditPage,
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
                        {
                            title: "View",
                            path: "/:id/add",
                            component: PartnersClassificationAddPage,
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
                        {
                            title: "Add",
                            path: "/add",
                            component: CurrencyAddPage,
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
                        {
                            title: "Add",
                            path: "/add",
                            component: TaxAddPage,
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
                        {
                            title: "Add",
                            path: "/add",
                            component: PaymentMethodsAddPage,
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
                        {
                            title: "Add",
                            path: "/add",
                            component: PoliciesAddPage,
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
                        {
                            title: "Add",
                            path: "/add",
                            component: TermsConditionsAddPage,
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
                            path: "/passenger/view/:id",
                            component: LoadTypesPassengerViewPage,
                        },
                        {
                            title: "View",
                            path: "/cargo/view/:id",
                            component: LoadTypesCargoViewPage,
                        },
                        {
                            title: "View",
                            path: "/vehicle/view/:id",
                            component: LoadTypesVehicleViewPage,
                        },
                        {
                            title: "Add",
                            path: "/passenger/add",
                            component: LoadTypesPassengerAddPage,
                        },
                        {
                            title: "Add",
                            path: "/cargo/add",
                            component: LoadTypesCargoAddPage,
                        },
                        {
                            title: "Add",
                            path: "/vehicle/add",
                            component: LoadTypesVehicleAddPage,
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
                            path: "void/view/:id",
                            component: TicketRulesVoidViewPage,
                        },
                        {
                            title: "Add",
                            path: "void/add",
                            component: TicketRulesVoidAddPage,
                        },
                        {
                            title: "View",
                            path: "refund/view/:id",
                            component: TicketRulesRefundViewPage,
                        },
                        {
                            title: "Add",
                            path: "refund/add",
                            component: TicketRulesRefundAddPage,
                        },
                        {
                            title: "View",
                            path: "no-show/view/:id",
                            component: TicketRulesNoShowViewPage,
                        },
                        {
                            title: "Add",
                            path: "no-show/add",
                            component: TicketRulesNoShowAddPage,
                        },
                        {
                            title: "View",
                            path: "reissue/view/:id",
                            component: TicketRulesReissueViewPage,
                        },
                        {
                            title: "Add",
                            path: "reissue/add",
                            component: TicketRulesReissueAddPage,
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
                        {
                            title: "Add",
                            path: "/add",
                            component: PromotionAddPage,
                        },
                    ],
                },
            ],
        },
    },
    // #endregion System Management & Administration

    // #region Ship & Trip Management
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
                        {
                            title: "Add",
                            path: "add",
                            component: PortAddPage,
                        },
                        {
                            title: "Edit",
                            path: "edit/:id",
                            component: PortEditPage,
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
                        {
                            title: "Edit",
                            path: "edit/:id",
                            component: ScheduleNewShipsEditPage,
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
                        {
                            title: "Edit",
                            path: "edit/:id",
                            component: ScheduleNewTripsEditPage,
                        },
                        {
                            title: "Tickets",
                            path: "tickets/:id",
                            component: ScheduleNewTripsTicketsPage,
                        },
                        {
                            title: "Tickets",
                            path: "tickets/:id/view/:ticketId",
                            component: ScheduleNewTripsTicketsViewPage,
                        },
                        {
                            title: "Tickets",
                            path: "tickets/:id/edit/:ticketId",
                            component: ScheduleNewTripsTicketsEditPage,
                        },
                    ],
                },
            ],
        },
    },
    // #endregion Ship & Trip Management

    // #region Sales & Bookings
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
                    title: "Price Lists B2B",
                    path: "/sales-bookings/price-lists-B2B",
                    component: PriceListsB2BPage,
                    subLinks: [
                        {
                            title: "Passenger Price List",
                            path: "/passenger/:id/view",
                            component: PriceListsB2BViewPagePassengerPriceList,
                        },
                        {
                            title: "Passenger Price List",
                            path: "/passenger/:id/edit",
                            component: PriceListsB2BEditPagePassengerPriceList,
                        },
                        {
                            title: "Passenger Price List",
                            path: "/passenger/:id/add",
                            component: PriceListsB2BAddPagePassengerPriceList,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/:id/view",
                            component: PriceListsB2BViewPageCargoPriceList,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/:id/edit",
                            component: PriceListsB2BEditPageCargoPriceList,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/:id/add",
                            component: PriceListsB2BAddPageCargoPriceList,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/:id/view",
                            component: PriceListsB2BViewPageVehiclePriceList,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/:id/edit",
                            component: PriceListsB2BEditPageVehiclePriceList,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/:id/add",
                            component: PriceListsB2BAddPageVehiclePriceList,
                        },
                    ],
                },
                {
                    title: "Price Lists B2C",
                    path: "/sales-bookings/price-lists-B2C",
                    component: PriceListsB2CPage,
                    subLinks: [
                        {
                            title: "Passenger Price List",
                            path: "/passenger/:id/view",
                            component: PriceListsB2CViewPagePassengerPriceList,
                        },
                        {
                            title: "Passenger Price List",
                            path: "/passenger/:id/edit",
                            component: PriceListsB2CEditPagePassengerPriceList,
                        },
                        {
                            title: "Passenger Price List",
                            path: "/passenger/:id/add",
                            component: PriceListsB2CAddPagePassengerPriceList,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/:id/view",
                            component: PriceListsB2CViewPageCargoPriceList,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/:id/edit",
                            component: PriceListsB2CEditPageCargoPriceList,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/:id/add",
                            component: PriceListsB2CAddPageCargoPriceList,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/:id/view",
                            component: PriceListsB2CViewPageVehiclePriceList,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/:id/edit",
                            component: PriceListsB2CEditPageVehiclePriceList,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/:id/add",
                            component: PriceListsB2CAddPageVehiclePriceList,
                        },
                    ],
                },
                {
                    title: "Excess baggage price B2B",
                    path: "/sales-bookings/excess-baggage-price-B2B",
                    component: ExcessBaggagePriceB2BPage,
                    subLinks: [
                        {
                            title: "Passenger Price List",
                            path: "/passenger/:id/view",
                            component:
                                ExcessBaggagePriceB2BViewPassengerPriceListPage,
                        },
                        {
                            title: "Passenger Price List",
                            path: "/passenger/:id/edit",
                            component:
                                ExcessBaggagePriceB2BEditPassengerPriceListPage,
                        },
                        {
                            title: "Passenger Price List",
                            path: "/passenger/:id/add",
                            component:
                                ExcessBaggagePriceB2BAddPassengerPriceListPage,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/:id/view",
                            component:
                                ExcessBaggagePriceB2BViewCargoPriceListPage,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/:id/edit",
                            component:
                                ExcessBaggagePriceB2BEditCargoPriceListPage,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/:id/add",
                            component:
                                ExcessBaggagePriceB2BAddCargoPriceListPage,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/:id/view",
                            component:
                                ExcessBaggagePriceB2BViewVehiclePriceListPage,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/:id/edit",
                            component:
                                ExcessBaggagePriceB2BEditVehiclePriceListPage,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/:id/add",
                            component:
                                ExcessBaggagePriceB2BAddVehiclePriceListPage,
                        },
                    ],
                },
                {
                    title: "Excess baggage price B2C",
                    path: "/sales-bookings/excess-baggage-price-B2C",
                    component: ExcessBaggagePriceB2CPage,
                    subLinks: [
                        {
                            title: "Passenger Price List",
                            path: "/passenger/:id/view",
                            component:
                                ExcessBaggagePriceB2CViewPassengerPriceListPage,
                        },
                        {
                            title: "Passenger Price List",
                            path: "/passenger/:id/edit",
                            component:
                                ExcessBaggagePriceB2CEditPassengerPriceListPage,
                        },
                        {
                            title: "Passenger Price List",
                            path: "/passenger/:id/add",
                            component:
                                ExcessBaggagePriceB2CAddPassengerPriceListPage,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/:id/view",
                            component:
                                ExcessBaggagePriceB2CViewCargoPriceListPage,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/:id/edit",
                            component:
                                ExcessBaggagePriceB2CEditCargoPriceListPage,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/:id/add",
                            component:
                                ExcessBaggagePriceB2CAddCargoPriceListPage,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/:id/view",
                            component:
                                ExcessBaggagePriceB2CViewVehiclePriceListPage,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/:id/edit",
                            component:
                                ExcessBaggagePriceB2CEditVehiclePriceListPage,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/:id/add",
                            component:
                                ExcessBaggagePriceB2CAddVehiclePriceListPage,
                        },
                    ],
                },
                {
                    title: "Allowed Weight",
                    path: "/sales-bookings/allowed-weight",
                    component: AllowedWeightPage,
                    subLinks: [
                        {
                            title: "Passenger Price List",
                            path: "/passenger/:id/view",
                            component: AllowedWeightViewPassengerPriceListPage,
                        },
                        {
                            title: "Passenger Price List",
                            path: "/passenger/:id/edit",
                            component: AllowedWeightEditPassengerPriceListPage,
                        },
                        {
                            title: "Passenger Price List",
                            path: "/passenger/:id/add",
                            component: AllowedWeightAddPassengerPriceListPage,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/:id/view",
                            component: AllowedWeightViewCargoPriceListPage,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/:id/edit",
                            component: AllowedWeightEditCargoPriceListPage,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/:id/add",
                            component: AllowedWeightAddCargoPriceListPage,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/:id/view",
                            component: AllowedWeightViewVehiclePriceListPage,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/:id/edit",
                            component: AllowedWeightEditVehiclePriceListPage,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/:id/add",
                            component: AllowedWeightAddVehiclePriceListPage,
                        },
                    ],
                },
                {
                    title: "Tickets",
                    path: "/sales-bookings/tickets",
                    component: TicketsPage,
                    subLinks: [
                        {
                            title: "Passenger",
                            path: "/passenger/:id/view",
                            component: TicketsPassengerViewPage,
                        },
                        {
                            title: "Cargo",
                            path: "/cargo/:id/view",
                            component: TicketsCargoViewPage,
                        },
                        {
                            title: "Vehicle",
                            path: "/vehicle/:id/view",
                            component: TicketsVehicleViewPage,
                        },
                        {
                            title: "Passenger",
                            path: "/passenger/:id/edit",
                            component: TicketsPassengerEditPage,
                        },
                        {
                            title: "Cargo",
                            path: "/cargo/:id/edit",
                            component: TicketsCargoEditPage,
                        },
                        {
                            title: "Vehicle",
                            path: "/vehicle/:id/edit",
                            component: TicketsVehicleEditPage,
                        },
                    ],
                },
                {
                    title: "Ticket Excess Baggage",
                    path: "/sales-bookings/ticket-excess-baggage",
                    component: TicketExcessBaggagePage,
                    subLinks: [
                        {
                            title: "View",
                            path: "view/:id",
                            component: TicketExcessBaggageViewPage,
                        },
                    ],
                },
            ],
        },
    },
    // #endregion Sales & Bookings

    // #region Security & Compliance
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
    // #endregion Security & Compliance

    // #region Business Partners Management
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
                    title: "Partners",
                    path: "/business-partners-management/partners",
                    component: BusinessPartnersPage,
                    subLinks: [
                        {
                            title: "View",
                            path: "view/:id",
                            component: BusinessPartnersViewPage,
                        },
                        {
                            title: "Edit",
                            path: "edit/:id",
                            component: BusinessPartnersEditPage,
                        },
                        {
                            title: "Add",
                            path: "/add",
                            component: BusinessPartnersAddPage,
                        },
                    ],
                },
                {
                    title: "Commissions",
                    path: "/business-partners-management/commissions",
                    component: BusinessPartnersCommissionsPage,
                    subLinks: [
                        {
                            title: "View",
                            path: "view/:id",
                            component: BusinessPartnersCommissionsViewPage,
                        },
                        {
                            title: "Add",
                            path: "/add",
                            component: BusinessPartnersCommissionsAddPage,
                        },
                    ],
                },
                {
                    title: "Markup & Discounts",
                    path: "/business-partners-management/markup-discounts",
                    component: BusinessPartnersMarkupDiscountsPage,
                    subLinks: [
                        {
                            title: "View",
                            path: "view/:id",
                            component: BusinessPartnersMarkupDiscountsViewPage,
                        },
                        {
                            title: "Add",
                            path: "/add",
                            component: BusinessPartnersMarkupDiscountsAddPage,
                        },
                    ],
                },
                {
                    title: "Authorities",
                    path: "/business-partners-management/authorities",
                    component: BusinessPartnersAuthoritiesPage,
                    subLinks: [
                        {
                            title: "View",
                            path: "view/:id",
                            component: BusinessPartnersAuthoritiesViewPage,
                        },
                        {
                            title: "Edit",
                            path: "/edit/:id",
                            component: BusinessPartnersAuthoritiesEditPage,
                        },
                    ],
                },
            ],
        },
    },
    // #endregion Business Partners Management

    // #region Check-in & Boarding
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
    // #endregion Check-in & Boarding

    // #region Financial Transactions
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
                    title: "Chart Of Account",
                    path: "/financial-transactions/chart-of-account",
                    component: ChartOfAccountPage,
                    subLinks: [
                        {
                            title: "View",
                            path: "view/:id",
                            component: ChartOfAccountViewPage,
                        },
                        {
                            title: "Edit",
                            path: "/edit/:id",
                            component: ChartOfAccountEditPage,
                        },
                    ],
                },
                {
                    title: "Journal Entries",
                    path: "/financial-transactions/journal-entries",
                    component: JournalEntriesPage,
                    subLinks: [
                        {
                            title: "View",
                            path: "view/:id",
                            component: JournalEntriesViewPage,
                        },
                        {
                            title: "Edit",
                            path: "/edit/:id",
                            component: JournalEntriesEditPage,
                        },
                    ],
                },
                {
                    title: "Payment & Receipts",
                    path: "/financial-transactions/payments",
                    component: PaymentReceiptsPage,
                    subLinks: [
                        {
                            title: "View",
                            path: "view/:id",
                            component: PaymentReceiptsViewPage,
                        },
                        {
                            title: "Edit",
                            path: "edit/:id",
                            component: PaymentReceiptsEditPage,
                        },
                    ],
                },
            ],
        },
    },
    // #endregion Financial Transactions

    // #region Reporting
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
    // #endregion Reporting
];
