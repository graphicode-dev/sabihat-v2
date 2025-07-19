export interface CompanyType {
    id?: number;
    name: string;
    country: {
        id: number;
        name: string;
        isoCode: string;
        createdAt: string;
        updatedAt: string;
    };
    city: string;
    street: string;
    taxId: string;
    companyLogo: string;
    createdAt: string;
    updatedAt: string;
}

export interface ContactUsType {
    id?: number;
    name: string;
    value: string;
    createdAt: string;
    updatedAt: string;
}

export interface AboutUsType {
    id?: number;
    name: string;
    value: string;
    createdAt: string;
    updatedAt: string;
}

export interface SettingType {
    currency: {
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
    };
}
