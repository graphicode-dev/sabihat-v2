export interface Tax {
    id: number;
    name: string;
    type: string;
    amountValue: string;
    taxBase: string;
    ledgerAccount: LedgerAccount;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export interface LedgerAccount {
    id: number;
    ledgerAccount: string;
    ledgerTypeId: number;
    createdAt: string;
    updatedAt: string;
}
