export interface Currency {
    id: number;
    name: string;
    code: string;
    createdAt: string;
    updatedAt: string;
    lastRate: CurrencyRate;
}

export interface CurrencyRate {
    id: number;
    rate: string;
    currencyId: number;
    createdAt: string;
    updatedAt: string;
}
