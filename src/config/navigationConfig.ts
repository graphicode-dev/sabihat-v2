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
const TaxEditPage = lazy(
    () => import("../pages/dashboard/system-management-administration/tax/edit")
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
const CurrencyEditPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/currency/edit"
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
const PaymentMethodsEditPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/payment-methods/edit"
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
const UserProfilesEditPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/user-profiles/edit"
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
const PoliciesEditPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/policies/edit"
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
const TermsConditionsEditPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/terms-conditions/edit"
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
const LoadTypesVehicleEditPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/load-types/edit/edit-vehicle"
        )
);
const LoadTypesPassengerEditPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/load-types/edit/edit-passenger"
        )
);
const LoadTypesCargoEditPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/load-types/edit/edit-cargo"
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
const TicketRulesVoidEditPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/ticket-rules/edit/edit-void"
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
const TicketRulesRefundEditPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/ticket-rules/edit/edit-refund"
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
const TicketRulesNoShowEditPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/ticket-rules/edit/edit-noShow"
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
const TicketRulesReissueEditPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/ticket-rules/edit/edit-reissue"
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
const PromotionEditPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/promotion/edit"
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
const ScheduleNewShipsAddPage = lazy(
    () =>
        import("../pages/dashboard/ship-trip-management/schedule-new-ships/add")
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

const BusinessPartnersCommissionsEditPage = lazy(
    () =>
        import(
            "../pages/dashboard/business-partners-management/commissions/edit"
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
const BusinessPartnersMarkupDiscountsEditPage = lazy(
    () =>
        import(
            "../pages/dashboard/business-partners-management/markup-discounts/edit"
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
const PriceListsB2BViewCreatePagePassengerPriceList = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/price-lists-B2B/view/create/PriceListsB2BPassengerCreate"
        )
);
const PriceListsB2BViewCreatePageCargoPriceList = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/price-lists-B2B/view/create/PriceListsB2BCargoCreate"
        )
);
const PriceListsB2BViewCreatePageVehiclePriceList = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/price-lists-B2B/view/create/PriceListsB2BVehicleCreate"
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
const PriceListsB2CViewCreatePagePassengerPriceList = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/price-lists-B2C/view/create/PriceListsB2CPassengerCreate"
        )
);
const PriceListsB2CViewCreatePageCargoPriceList = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/price-lists-B2C/view/create/PriceListsB2CCargoCreate"
        )
);
const PriceListsB2CViewCreatePageVehiclePriceList = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/price-lists-B2C/view/create/PriceListsB2CVehicleCreate"
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
const ExcessBaggagePriceB2BViewCreatePassengerPriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/excess-baggage-price-B2B/view/create/ExcessBaggagePriceB2BPassengerCreate"
        )
);
const ExcessBaggagePriceB2BViewCreateCargoPriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/excess-baggage-price-B2B/view/create/ExcessBaggagePriceB2BCargoCreate"
        )
);
const ExcessBaggagePriceB2BViewCreateVehiclePriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/excess-baggage-price-B2B/view/create/ExcessBaggagePriceB2BVehicleCreate"
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
const ExcessBaggagePriceB2CViewCreatePassengerPriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/excess-baggage-price-B2C/view/create/ExcessBaggagePriceB2CPassengerCreate"
        )
);
const ExcessBaggagePriceB2CViewCreateCargoPriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/excess-baggage-price-B2C/view/create/ExcessBaggagePriceB2CCargoCreate"
        )
);
const ExcessBaggagePriceB2CViewCreateVehiclePriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/excess-baggage-price-B2C/view/create/ExcessBaggagePriceB2CVehicleCreate"
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
const AllowedWeightViewCreatePassengerPriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/allowed-weight/view/create/AllowedWeightPassengerCreate"
        )
);
const AllowedWeightViewCreateCargoPriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/allowed-weight/view/create/AllowedWeightCargoCreate"
        )
);
const AllowedWeightViewCreateVehiclePriceListPage = lazy(
    () =>
        import(
            "../pages/dashboard/sales-bookings/allowed-weight/view/create/AllowedWeightVehicleCreate"
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
const ChartOfAccountAddPage = lazy(
    () =>
        import("../pages/dashboard/financial-transactions/chart-of-account/add")
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
const JournalEntriesAddPage = lazy(
    () =>
        import("../pages/dashboard/financial-transactions/journal-entries/add")
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
const PaymentReceiptsAddPage = lazy(
    () =>
        import("../pages/dashboard/financial-transactions/payment-receipts/add")
);
// #endregion Payment & Receipts

// #endregion Financial Transactions

// #region Check-in & Boarding
const PassengerCheckInPage = lazy(
    () => import("../pages/dashboard/check-in-boarding/passenger-check-in")
);
const PassengerCheckInAddPage = lazy(
    () => import("../pages/dashboard/check-in-boarding/passenger-check-in/add")
);
const PassengerCheckInVerificationPage = lazy(
    () =>
        import(
            "../pages/dashboard/check-in-boarding/passenger-check-in/verification"
        )
);
const PassengerCheckInVerificationViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/check-in-boarding/passenger-check-in/verification/view"
        )
);
const PassengerCheckInVerificationEditPage = lazy(
    () =>
        import(
            "../pages/dashboard/check-in-boarding/passenger-check-in/verification/edit"
        )
);
const PassengerCheckInPaymentInvoicePage = lazy(
    () =>
        import(
            "../pages/dashboard/check-in-boarding/passenger-check-in/payment/invoice"
        )
);
const PassengerCheckInPaymentSuccessBoardingPassPage = lazy(
    () =>
        import(
            "../pages/dashboard/check-in-boarding/passenger-check-in/payment/success/BoardingPass"
        )
);
const PassengerCheckInPaymentSuccessBaggagePage = lazy(
    () =>
        import(
            "../pages/dashboard/check-in-boarding/passenger-check-in/payment/success/Baggage"
        )
);

const VehicleCheckInPage = lazy(
    () => import("../pages/dashboard/check-in-boarding/vehicle-check-in")
);
const VehicleCheckInAddPage = lazy(
    () => import("../pages/dashboard/check-in-boarding/vehicle-check-in/add")
);
const VehicleCheckInVerificationPage = lazy(
    () =>
        import(
            "../pages/dashboard/check-in-boarding/vehicle-check-in/verification"
        )
);
const VehicleCheckInVerificationViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/check-in-boarding/vehicle-check-in/verification/view"
        )
);
const VehicleCheckInVerificationEditPage = lazy(
    () =>
        import(
            "../pages/dashboard/check-in-boarding/vehicle-check-in/verification/edit"
        )
);
const VehicleCheckInPaymentInvoicePage = lazy(
    () =>
        import(
            "../pages/dashboard/check-in-boarding/vehicle-check-in/payment/invoice"
        )
);
const VehicleCheckInPaymentSuccessBoardingPassPage = lazy(
    () =>
        import(
            "../pages/dashboard/check-in-boarding/vehicle-check-in/payment/success/BoardingPass"
        )
);
const VehicleCheckInPaymentSuccessBaggagePage = lazy(
    () =>
        import(
            "../pages/dashboard/check-in-boarding/vehicle-check-in/payment/success/Baggage"
        )
);

const CargoCheckInPage = lazy(
    () => import("../pages/dashboard/check-in-boarding/cargo-check-in")
);
const CargoCheckInAddPage = lazy(
    () => import("../pages/dashboard/check-in-boarding/cargo-check-in/add")
);
const CargoCheckInVerificationPage = lazy(
    () =>
        import(
            "../pages/dashboard/check-in-boarding/cargo-check-in/verification"
        )
);
const CargoCheckInVerificationViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/check-in-boarding/cargo-check-in/verification/view"
        )
);
const CargoCheckInVerificationEditPage = lazy(
    () =>
        import(
            "../pages/dashboard/check-in-boarding/cargo-check-in/verification/edit"
        )
);
const CargoCheckInPaymentInvoicePage = lazy(
    () =>
        import(
            "../pages/dashboard/check-in-boarding/cargo-check-in/payment/invoice"
        )
);
const CargoCheckInPaymentSuccessBoardingPassPage = lazy(
    () =>
        import(
            "../pages/dashboard/check-in-boarding/cargo-check-in/payment/success/BoardingPass"
        )
);
const CargoCheckInPaymentSuccessBaggagePage = lazy(
    () =>
        import(
            "../pages/dashboard/check-in-boarding/cargo-check-in/payment/success/Baggage"
        )
);

const BoardingPage = lazy(
    () => import("../pages/dashboard/check-in-boarding/boarding")
);
const BoardingViewPassengerPage = lazy(
    () => import("../pages/dashboard/check-in-boarding/boarding/view/passenger")
);
const BoardingViewCargoPage = lazy(
    () => import("../pages/dashboard/check-in-boarding/boarding/view/cargo")
);
const BoardingViewVehiclePage = lazy(
    () => import("../pages/dashboard/check-in-boarding/boarding/view/vehicle")
);
const BoardingEditPage = lazy(
    () => import("../pages/dashboard/check-in-boarding/boarding/edit")
);

// #endregion Check-in & Boarding

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
                        {
                            title: "Edit",
                            path: "/edit/:id",
                            component: UserProfilesEditPage,
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
                        {
                            title: "Edit",
                            path: "/edit/:id",
                            component: CurrencyEditPage,
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
                        {
                            title: "Edit",
                            path: "/edit/:id",
                            component: TaxEditPage,
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
                        {
                            title: "Edit",
                            path: "/edit/:id",
                            component: PaymentMethodsEditPage,
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
                        {
                            title: "Edit",
                            path: "/edit/:id",
                            component: PoliciesEditPage,
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
                        {
                            title: "Edit",
                            path: "/edit/:id",
                            component: TermsConditionsEditPage,
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
                        {
                            title: "Edit",
                            path: "/passenger/edit/:id",
                            component: LoadTypesPassengerEditPage,
                        },
                        {
                            title: "Edit",
                            path: "/cargo/edit/:id",
                            component: LoadTypesCargoEditPage,
                        },
                        {
                            title: "Edit",
                            path: "/vehicle/edit/:id",
                            component: LoadTypesVehicleEditPage,
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
                            title: "Edit",
                            path: "void/edit/:id",
                            component: TicketRulesVoidEditPage,
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
                            title: "Edit",
                            path: "refund/edit/:id",
                            component: TicketRulesRefundEditPage,
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
                            title: "Edit",
                            path: "no-show/edit/:id",
                            component: TicketRulesNoShowEditPage,
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
                        {
                            title: "Edit",
                            path: "reissue/edit/:id",
                            component: TicketRulesReissueEditPage,
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
                        {
                            title: "Edit",
                            path: "edit/:id",
                            component: PromotionEditPage,
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
                        {
                            title: "Add",
                            path: "add",
                            component: ScheduleNewShipsAddPage,
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
                            path: "/passenger/add",
                            component: PriceListsB2BAddPagePassengerPriceList,
                        },
                        {
                            title: "Passenger Price List",
                            path: "/passenger/:id/edit",
                            component: PriceListsB2BEditPagePassengerPriceList,
                        },
                        {
                            title: "Passenger Price List",
                            path: "/passenger/:id/create",
                            component:
                                PriceListsB2BViewCreatePagePassengerPriceList,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/:id/view",
                            component: PriceListsB2BViewPageCargoPriceList,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/add",
                            component: PriceListsB2BAddPageCargoPriceList,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/:id/edit",
                            component: PriceListsB2BEditPageCargoPriceList,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/:id/create",
                            component:
                                PriceListsB2BViewCreatePageCargoPriceList,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/:id/view",
                            component: PriceListsB2BViewPageVehiclePriceList,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/add",
                            component: PriceListsB2BAddPageVehiclePriceList,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/:id/edit",
                            component: PriceListsB2BEditPageVehiclePriceList,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/:id/create",
                            component:
                                PriceListsB2BViewCreatePageVehiclePriceList,
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
                            path: "/passenger/add",
                            component: PriceListsB2CAddPagePassengerPriceList,
                        },
                        {
                            title: "Passenger Price List",
                            path: "/passenger/:id/edit",
                            component: PriceListsB2CEditPagePassengerPriceList,
                        },
                        {
                            title: "Passenger Price List",
                            path: "/passenger/:id/create",
                            component:
                                PriceListsB2CViewCreatePagePassengerPriceList,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/:id/view",
                            component: PriceListsB2CViewPageCargoPriceList,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/add",
                            component: PriceListsB2CAddPageCargoPriceList,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/:id/edit",
                            component: PriceListsB2CEditPageCargoPriceList,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/:id/create",
                            component:
                                PriceListsB2CViewCreatePageCargoPriceList,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/:id/view",
                            component: PriceListsB2CViewPageVehiclePriceList,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/add",
                            component: PriceListsB2CAddPageVehiclePriceList,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/:id/edit",
                            component: PriceListsB2CEditPageVehiclePriceList,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/:id/create",
                            component:
                                PriceListsB2CViewCreatePageVehiclePriceList,
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
                            path: "/passenger/add",
                            component:
                                ExcessBaggagePriceB2BAddPassengerPriceListPage,
                        },
                        {
                            title: "Passenger Price List",
                            path: "/passenger/:id/edit",
                            component:
                                ExcessBaggagePriceB2BEditPassengerPriceListPage,
                        },
                        {
                            title: "Passenger Price List",
                            path: "/passenger/:id/create",
                            component:
                                ExcessBaggagePriceB2BViewCreatePassengerPriceListPage,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/:id/view",
                            component:
                                ExcessBaggagePriceB2BViewCargoPriceListPage,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/add",
                            component:
                                ExcessBaggagePriceB2BAddCargoPriceListPage,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/:id/edit",
                            component:
                                ExcessBaggagePriceB2BEditCargoPriceListPage,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/:id/create",
                            component:
                                ExcessBaggagePriceB2BViewCreateCargoPriceListPage,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/:id/view",
                            component:
                                ExcessBaggagePriceB2BViewVehiclePriceListPage,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/add",
                            component:
                                ExcessBaggagePriceB2BAddVehiclePriceListPage,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/:id/edit",
                            component:
                                ExcessBaggagePriceB2BEditVehiclePriceListPage,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/:id/create",
                            component:
                                ExcessBaggagePriceB2BViewCreateVehiclePriceListPage,
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
                            path: "/passenger/add",
                            component:
                                ExcessBaggagePriceB2CAddPassengerPriceListPage,
                        },
                        {
                            title: "Passenger Price List",
                            path: "/passenger/:id/edit",
                            component:
                                ExcessBaggagePriceB2CEditPassengerPriceListPage,
                        },
                        {
                            title: "Passenger Price List",
                            path: "/passenger/:id/create",
                            component:
                                ExcessBaggagePriceB2CViewCreatePassengerPriceListPage,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/:id/view",
                            component:
                                ExcessBaggagePriceB2CViewCargoPriceListPage,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/add",
                            component:
                                ExcessBaggagePriceB2CAddCargoPriceListPage,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/:id/edit",
                            component:
                                ExcessBaggagePriceB2CEditCargoPriceListPage,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/:id/create",
                            component:
                                ExcessBaggagePriceB2CViewCreateCargoPriceListPage,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/:id/view",
                            component:
                                ExcessBaggagePriceB2CViewVehiclePriceListPage,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/add",
                            component:
                                ExcessBaggagePriceB2CAddVehiclePriceListPage,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/:id/edit",
                            component:
                                ExcessBaggagePriceB2CEditVehiclePriceListPage,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/:id/create",
                            component:
                                ExcessBaggagePriceB2CViewCreateVehiclePriceListPage,
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
                            path: "/passenger/add",
                            component: AllowedWeightAddPassengerPriceListPage,
                        },
                        {
                            title: "Passenger Price List",
                            path: "/passenger/:id/edit",
                            component: AllowedWeightEditPassengerPriceListPage,
                        },
                        {
                            title: "Passenger Price List",
                            path: "/passenger/:id/create",
                            component: AllowedWeightViewCreatePassengerPriceListPage,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/:id/view",
                            component: AllowedWeightViewCargoPriceListPage,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/add",
                            component: AllowedWeightAddCargoPriceListPage,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/:id/edit",
                            component: AllowedWeightEditCargoPriceListPage,
                        },
                        {
                            title: "Cargo Price List",
                            path: "/cargo/:id/create",
                            component:
                                AllowedWeightViewCreateCargoPriceListPage,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/:id/view",
                            component: AllowedWeightViewVehiclePriceListPage,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/add",
                            component: AllowedWeightAddVehiclePriceListPage,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/:id/edit",
                            component: AllowedWeightEditVehiclePriceListPage,
                        },
                        {
                            title: "Vehicle Price List",
                            path: "/vehicle/:id/create",
                            component:
                                AllowedWeightViewCreateVehiclePriceListPage,
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
                        {
                            title: "Edit",
                            path: "edit/:id",
                            component: BusinessPartnersCommissionsEditPage,
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
                        {
                            title: "Edit",
                            path: "/edit/:id",
                            component: BusinessPartnersMarkupDiscountsEditPage,
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
                    title: "Passenger Check-In",
                    path: "/check-in-boarding/passenger-check-in",
                    component: PassengerCheckInPage,
                    subLinks: [
                        {
                            title: "Add",
                            path: "/add",
                            component: PassengerCheckInAddPage,
                        },
                        {
                            title: "Verification",
                            path: "/verification",
                            component: PassengerCheckInVerificationPage,
                        },
                        {
                            title: "View",
                            path: "/verification/view/:id",
                            component: PassengerCheckInVerificationViewPage,
                        },
                        {
                            title: "Edit",
                            path: "/verification/edit/:id",
                            component: PassengerCheckInVerificationEditPage,
                        },
                        {
                            title: "Invoice",
                            path: "/payment/invoice",
                            component: PassengerCheckInPaymentInvoicePage,
                        },
                        {
                            title: "Baggage",
                            path: "/payment/success/baggage",
                            component:
                                PassengerCheckInPaymentSuccessBaggagePage,
                        },
                        {
                            title: "Boarding Pass",
                            path: "/payment/success/boarding-pass",
                            component:
                                PassengerCheckInPaymentSuccessBoardingPassPage,
                        },
                    ],
                },
                {
                    title: "Cargo Check-In",
                    path: "/check-in-boarding/cargo-check-in",
                    component: CargoCheckInPage,
                    subLinks: [
                        {
                            title: "Add",
                            path: "/add",
                            component: CargoCheckInAddPage,
                        },
                        {
                            title: "Verification",
                            path: "/verification",
                            component: CargoCheckInVerificationPage,
                        },
                        {
                            title: "View",
                            path: "/verification/view/:id",
                            component: CargoCheckInVerificationViewPage,
                        },
                        {
                            title: "Edit",
                            path: "/verification/edit/:id",
                            component: CargoCheckInVerificationEditPage,
                        },
                        {
                            title: "Invoice",
                            path: "/payment/invoice",
                            component: CargoCheckInPaymentInvoicePage,
                        },
                        {
                            title: "Baggage",
                            path: "/payment/success/baggage",
                            component: CargoCheckInPaymentSuccessBaggagePage,
                        },
                        {
                            title: "Boarding Pass",
                            path: "/payment/success/boarding-pass",
                            component:
                                CargoCheckInPaymentSuccessBoardingPassPage,
                        },
                    ],
                },
                {
                    title: "Vehicle Check-In",
                    path: "/check-in-boarding/vehicle-check-in",
                    component: VehicleCheckInPage,
                    subLinks: [
                        {
                            title: "Add",
                            path: "/add",
                            component: VehicleCheckInAddPage,
                        },
                        {
                            title: "Verification",
                            path: "/verification",
                            component: VehicleCheckInVerificationPage,
                        },
                        {
                            title: "View",
                            path: "/verification/view/:id",
                            component: VehicleCheckInVerificationViewPage,
                        },
                        {
                            title: "Edit",
                            path: "/verification/edit/:id",
                            component: VehicleCheckInVerificationEditPage,
                        },
                        {
                            title: "Invoice",
                            path: "/payment/invoice",
                            component: VehicleCheckInPaymentInvoicePage,
                        },
                        {
                            title: "Baggage",
                            path: "/payment/success/baggage",
                            component: VehicleCheckInPaymentSuccessBaggagePage,
                        },
                        {
                            title: "Boarding Pass",
                            path: "/payment/success/boarding-pass",
                            component:
                                VehicleCheckInPaymentSuccessBoardingPassPage,
                        },
                    ],
                },
                {
                    title: "Boarding",
                    path: "/check-in-boarding/boarding",
                    component: BoardingPage,
                    subLinks: [
                        {
                            title: "View",
                            path: "passenger/view/:id",
                            component: BoardingViewPassengerPage,
                        },
                        {
                            title: "View",
                            path: "cargo/view/:id",
                            component: BoardingViewCargoPage,
                        },
                        {
                            title: "View",
                            path: "vehicle/view/:id",
                            component: BoardingViewVehiclePage,
                        },
                        {
                            title: "Edit",
                            path: "/edit/:id",
                            component: BoardingEditPage,
                        },
                    ],
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
                        {
                            title: "Add",
                            path: "/add",
                            component: ChartOfAccountAddPage,
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
                        {
                            title: "Add",
                            path: "/add",
                            component: JournalEntriesAddPage,
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
                        {
                            title: "Add",
                            path: "/add",
                            component: PaymentReceiptsAddPage,
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
