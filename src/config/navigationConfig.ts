import { TabLink } from "../types";
import FeaturePlaceholder from "../pages/FeaturePlaceholder";
import React, { lazy } from "react";
import api from "./api";

// Types for API responses
export interface Feature {
    id: number;
    name: string;
    displayName: string;
    img: string;
    createdAt: string;
    updatedAt: string;
}

export interface Activity {
    id: number;
    name: string;
    displayName: string;
    feature: Feature;
    createdAt: string;
    updatedAt: string;
}

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
const CurrencyRateViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/currency/view/rate/view"
        )
);
const CurrencyRateAddPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/currency/view/rate/add"
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
const PartnersClassificationEditPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/partners-classification/edit"
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
const UserRolesAddPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/user-roles/add"
        )
);
const UserRolesEditPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/user-roles/edit"
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

// #region Reporting
const FinancePage = lazy(() => import("../pages/dashboard/reporting/finance"));
const TripsPage = lazy(() => import("../pages/dashboard/reporting/trips"));
// #endregion Reporting

// Component mapping registry - maps activity names to their respective components
const componentRegistry: Record<string, any> = {
    // System Management & Administration
    user_profiles: {
        main: UserProfilesPage,
        view: UserProfilesViewPage,
        add: UserProfilesAddPage,
        edit: UserProfilesEditPage,
    },
    create_roles_permissions: {
        main: UserRolesPage,
        view: UserRolesViewPage,
        add: UserRolesAddPage,
        edit: UserRolesEditPage,
    },
    company_profile: {
        main: CompanyProfilePage,
        edit: CompanyEditPage,
        // Additional edit components with custom keys
        edit_settings: SettingsEditPage,
        edit_contact: ContactUsEditPage,
        edit_about: AboutUsEditPage,
    },
    contact_messages: {
        main: ContactMessagesPage,
        view: ContactMessagesViewPage,
    },
    partners_classification: {
        main: PartnersClassificationPage,
        view: PartnersClassificationViewPage,
        edit: PartnersClassificationEditPage,
    },
    currency: {
        main: CurrencyPage,
        view: CurrencyViewPage,
        view_rate: CurrencyRateViewPage,
        add_rate: CurrencyRateAddPage,
        add: CurrencyAddPage,
        edit: CurrencyEditPage,
    },
    tax: {
        main: TaxPage,
        view: TaxViewPage,
        add: TaxAddPage,
        edit: TaxEditPage,
    },
    payment_methods: {
        main: PaymentMethodsPage,
        view: PaymentMethodsViewPage,
        add: PaymentMethodsAddPage,
        edit: PaymentMethodsEditPage,
    },
    policies: {
        main: PoliciesPage,
        view: PoliciesViewPage,
        add: PoliciesAddPage,
        edit: PoliciesEditPage,
    },
    terms_conditions: {
        main: TermsConditionsPage,
        view: TermsConditionsViewPage,
        add: TermsConditionsAddPage,
        edit: TermsConditionsEditPage,
    },
    load_types: {
        main: LoadTypesPage,
    },
    ticket_rules: {
        main: TicketRulesPage,
        view_void: TicketRulesVoidViewPage,
        view_refund: TicketRulesRefundViewPage,
        view_noShow: TicketRulesNoShowViewPage,
        view_reissue: TicketRulesReissueViewPage,
        add_void: TicketRulesVoidAddPage,
        add_refund: TicketRulesRefundAddPage,
        add_noShow: TicketRulesNoShowAddPage,
        add_reissue: TicketRulesReissueAddPage,
        edit_void: TicketRulesVoidEditPage,
        edit_refund: TicketRulesRefundEditPage,
        edit_noShow: TicketRulesNoShowEditPage,
        edit_reissue: TicketRulesReissueEditPage,
    },
    promotion: {
        main: PromotionPage,
        view: PromotionViewPage,
        add: PromotionAddPage,
        edit: PromotionEditPage,
    },

    // Ship Trip Management
    cabins: {
        main: CabinsPage,
        view: CabinsViewPage,
        // No add/edit pages for cabins based on directory structure
    },
    port: {
        main: PortPage,
        view: PortViewPage,
        add: PortAddPage,
        edit: PortEditPage,
    },
    schedule_new_ships: {
        main: ScheduleNewShipsPage,
        view: ScheduleNewShipsViewPage,
        add: ScheduleNewShipsAddPage,
        edit: ScheduleNewShipsEditPage,
    },
    schedule_new_trips: {
        main: ScheduleNewTripsPage,
        view: ScheduleNewTripsViewPage,
        edit: ScheduleNewTripsEditPage,
        // No add page for trips based on directory structure
    },
    schedule_new_trips_tickets: {
        main: ScheduleNewTripsTicketsPage,
        view: ScheduleNewTripsTicketsViewPage,
        edit: ScheduleNewTripsTicketsEditPage,
        // No add page for tickets based on directory structure
    },
};

export const toKebabCase = (str: string): string => {
    return str
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, "-")
        .toLowerCase();
};

// Function to properly format icon URLs
const formatIconUrl = (
    iconPath: string,
    baseURL: string,
    enableLogging: boolean = true
): string => {
    // If iconPath is empty or undefined, return empty string
    if (!iconPath) {
        return "";
    }

    // If the icon path is already a full URL, return it as is
    if (iconPath.startsWith("http://") || iconPath.startsWith("https://")) {
        if (enableLogging) {
            console.log("Icon is already a full URL:", iconPath);
        }
        return iconPath;
    }

    // If the icon path starts with a slash, append it to the base URL
    if (iconPath.startsWith("/")) {
        return `${baseURL}${iconPath}`;
    }

    // Otherwise, append the icon path to the base URL with a slash
    const fullUrl = `${baseURL}/${iconPath}`;
    if (enableLogging) {
        console.log("Formatted icon URL:", fullUrl);
    }
    return fullUrl;
};

export const getComponentForActivity = (
    activityName: string,
    type: string = "main"
) => {
    if (
        componentRegistry[activityName] &&
        componentRegistry[activityName][type]
    ) {
        return componentRegistry[activityName][type];
    }

    // Use a wrapper around FeaturePlaceholder for better UX
    // This creates a component that will show the activity name
    const DynamicFeaturePlaceholder = lazy(() =>
        Promise.resolve({
            default: (props: any) => {
                // When the component is rendered, it will receive props from React Router
                // We'll pass the activityName as a prop to FeaturePlaceholder
                return React.createElement(FeaturePlaceholder, {
                    ...props,
                    activityName: activityName,
                });
            },
        })
    );

    return DynamicFeaturePlaceholder;
};

// Define the sublink interface
interface Sublink {
    title: string;
    path: string;
    component: any;
}

export const generateStandardSublinks = (
    featureName: string,
    activityName: string
): Sublink[] => {
    // Using parameters in the function to avoid unused variable warnings
    console.debug(`Generating sublinks for ${featureName}/${activityName}`);

    const sublinks: Sublink[] = [];

    // Check if component registry has this activity
    if (componentRegistry[activityName]) {
        // Get all keys from the component registry for this activity
        const componentKeys = Object.keys(componentRegistry[activityName]);

        // Process each component key to generate appropriate sublinks
        componentKeys.forEach((key) => {
            // Skip the main component as it's not a sublink
            if (key === "main") return;

            // Handle standard keys (view, add, edit)
            if (key === "view") {
                sublinks.push({
                    title: "View",
                    path: `view/:id`,
                    component: getComponentForActivity(activityName, "view"),
                });
            } else if (key === "add") {
                sublinks.push({
                    title: "Add",
                    path: `add`,
                    component: getComponentForActivity(activityName, "add"),
                });
            } else if (key === "edit") {
                sublinks.push({
                    title: "Edit",
                    path: `edit/:id`,
                    component: getComponentForActivity(activityName, "edit"),
                });
            }
            // Handle custom keys with underscore pattern (e.g., view_passenger)
            else if (key.includes("_")) {
                const [action, subType] = key.split("_");
                const title = `${
                    action.charAt(0).toUpperCase() + action.slice(1)
                } ${subType.charAt(0).toUpperCase() + subType.slice(1)}`;

                // Create appropriate path based on action type
                let path;
                if (action === "view") {
                    path = `${subType}/view/:id`;
                } else if (action === "add") {
                    path = `${subType}/add`;
                } else if (action === "edit") {
                    path = `${subType}/edit/:id`;
                } else {
                    path = `${action}/${subType}`;
                }

                sublinks.push({
                    title,
                    path,
                    component: getComponentForActivity(activityName, key),
                });
            }
        });
    } else {
        // Fallback to standard sublinks if no registry entry exists
        return [
            {
                title: "View",
                path: `view/:id`,
                component: getComponentForActivity(activityName, "view"),
            },
            {
                title: "Add",
                path: `add`,
                component: getComponentForActivity(activityName, "add"),
            },
            {
                title: "Edit",
                path: `edit/:id`,
                component: getComponentForActivity(activityName, "edit"),
            },
        ];
    }

    return sublinks;
};

const fetchFeatures = async (): Promise<Feature[]> => {
    try {
        const response = await api.get("/public-operations/features");
        // Type assertion to handle the unknown type of response.data
        const responseData = response.data as {
            success: boolean;
            data: Feature[];
        };
        return responseData.success ? responseData.data : [];
    } catch (error) {
        console.error("Error fetching features:", error);
        return [];
    }
};

const fetchActivities = async (featureId: number): Promise<Activity[]> => {
    // Otherwise fetch from API
    try {
        const response = await api.get(
            `/public-operations/activities/${featureId}`
        );
        // Type assertion to handle the unknown type of response.data
        const responseData = response.data as {
            success: boolean;
            data: Activity[];
        };
        return responseData.success ? responseData.data : [];
    } catch (error) {
        console.error(
            `Error fetching activities for feature ${featureId}:`,
            error
        );
        return [];
    }
};

// Cache for navigation configuration
let navigationCache: {
    data: TabLink[] | null;
    timestamp: number;
    promise: Promise<TabLink[]> | null;
} = {
    data: null,
    timestamp: 0,
    promise: null,
};

// Cache expiration time in milliseconds (5 minutes)
const CACHE_EXPIRATION = 5 * 60 * 1000;

const buildDynamicNavigation = async (): Promise<TabLink[]> => {
    // If there's an ongoing request, return that promise to prevent duplicate requests
    if (navigationCache.promise) {
        return navigationCache.promise;
    }

    // Check if we have valid cached data
    const now = Date.now();
    if (
        navigationCache.data &&
        now - navigationCache.timestamp < CACHE_EXPIRATION
    ) {
        return navigationCache.data;
    }

    // Create a new promise for the data fetch
    navigationCache.promise = (async () => {
        try {
            // Fetch features from API
            let features = await fetchFeatures();

            // Check if ship_trip_management feature exists, if not add it from static data
            const shipTripFeatureExists = features.some(
                (f) => f.name === "ship_trip_management"
            );
            if (!shipTripFeatureExists) {
                features = [...features];
            }

            const navigationConfig: TabLink[] = [];
            // Get the base URL for icons
            const baseURL = import.meta.env.VITE_API_BASE_URL || "";

            for (const feature of features) {
                const activities = await fetchActivities(feature.id);
                const featureKebab = toKebabCase(feature.name);

                // Format the icon URL properly
                const iconUrl = feature.img
                    ? formatIconUrl(feature.img, baseURL, false) // Pass false to disable logging
                    : "";

                const featureLinks = activities.map((activity) => {
                    const activityKebab = toKebabCase(activity.name);
                    return {
                        title: activity.displayName,
                        path: `/${featureKebab}/${activityKebab}`,
                        component: getComponentForActivity(activity.name),
                        subLinks: generateStandardSublinks(
                            feature.name,
                            activity.name
                        ),
                    };
                });

                navigationConfig.push({
                    icon: iconUrl,
                    title: feature.displayName,
                    path: `/${featureKebab}`,
                    sideBar: {
                        titleSection: {
                            icon: iconUrl,
                            title: feature.displayName,
                        },
                        links: featureLinks,
                    },
                });
            }

            // Update cache with the new data
            navigationCache.data = navigationConfig;
            navigationCache.timestamp = Date.now();
            return navigationConfig;
        } catch (error) {
            console.error("Error building dynamic navigation:", error);
            return [];
        } finally {
            // Clear the promise reference when done
            navigationCache.promise = null;
        }
    })();

    return navigationCache.promise;
};

// Function to clear the navigation cache manually if needed
const clearNavigationCache = () => {
    navigationCache = {
        data: null,
        timestamp: 0,
        promise: null,
    };
};

export { buildDynamicNavigation, clearNavigationCache };
