export interface Currency {
    id: number;
    name: string;
    code: string;
    createdAt: string;
    updatedAt: string;
    lastRate: {
        id: number;
        rate: string;
        currencyId: number;
        createdAt: string;
        updatedAt: string;
    };
}

export interface BusinessPartner {
    id: number;
    name: string;
    phone: string;
    email: string;
    address: string;
    layer: {
        id: number;
        name: string;
        parentId: number | null;
        createdAt: string;
        updatedAt: string;
    };
    partnerId: number | null;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface PaymentMethod {
    id: number;
    name: string;
    accountType: string;
    currency: Currency;
    accountNumber: string;
    note: string;
    status: boolean;
    businessPartner: BusinessPartner;
    createdAt: string;
    updatedAt: string;
}
