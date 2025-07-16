export interface Partner {
    id: number;
    businessPartnerId: number | null;
    name: string;
    phoneCode: string | null;
    phoneNumber: string | null;
    title: string | null;
    hotline: string | null;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export interface PartnerUser {
    id: number;
    name: string;
    email: string;
    phoneCode: string;
    phoneNumber: string;
    phoneVerifiedAt: string;
    address: string;
    image: string;
    businessPartnerId: number;
    isSalesman: number;
    createdAt: string;
    updatedAt: string;
}

export interface PartnersMaster {
    name: string;
    phoneCode: string;
    phoneNumber: string;
    email: string;
    address: string;
    layerId: string;
    image: File | null;
}
export interface PartnersMasterError {
    name: string;
    phoneCode: string;
    phoneNumber: string;
    email: string;
    address: string;
    layerId: string;
    image: string;
}

export interface QuotaManagement {
    limitAmount: string;
    ticketQuota: string;
}

export interface ContactInformation {
    name: string;
    title: string;
    phoneCode: string;
    phoneNumber: string;
    email: string;
    hotline: string;
}
