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
