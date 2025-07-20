export interface MarkUp {
    id: number;
    businessPartner: BusinessPartner;
    partnersClassification: PartnersClassification;
    load: Load;
    loadType: LoadType;
    cabin: Cabin;
    portFrom: Port;
    portTo: Port;
    ticketType: string;
    visitType: string;
    markupDiscount: string;
    markupDiscountType: string;
    markupDiscountValue: string;
    effectiveDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
}

export interface BusinessPartner {
    id: number;
    businessPartnerId: number | null;
    name: string;
    phoneCode: string;
    phoneNumber: string;
    email: string;
    address: string;
    partnerId: number;
    layer: Layer;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface Layer {
    id: number;
    name: string;
    parentId: number | null;
    createdAt: string;
    updatedAt: string;
}

export interface PartnersClassification {
    id: number;
    nameClass: string;
    createdAt: string;
    updatedAt: string;
}

export interface Load {
    id: number;
    loadName: string;
    loadType: LoadType;
    createdAt: string;
    updatedAt: string;
}

export interface LoadType {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface Cabin {
    id: number;
    name: string;
    description: string;
    loadType: LoadType;
    createdAt: string;
    updatedAt: string;
}

export interface Port {
    id: number;
    name: string;
    abbreviationCode: string;
    country: Country;
    createdAt: string;
    updatedAt: string;
}

export interface Country {
    id: number;
    name: string;
    isoCode: string;
    createdAt: string;
    updatedAt: string;
}
