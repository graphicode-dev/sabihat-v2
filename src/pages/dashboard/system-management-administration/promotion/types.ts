export interface Promotion {
    id: string;
    name: string;
    type: "fixed" | "percentage";
    value: string;
    fromDate: string;
    toDate: string;
    createdAt: string;
    updatedAt: string;
}
