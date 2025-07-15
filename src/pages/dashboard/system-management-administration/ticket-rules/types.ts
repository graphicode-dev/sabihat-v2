export interface TicketRule {
    id: number;
    ticketStatusId: number;
    ruleName: string;
    timing: string;
    departureTolerance: string;
    penaltyType: string;
    penaltyValue: string;
    penaltyBaseAmount: string;
    taxRefund: number;
    createdAt: string;
    updatedAt: string;
}

export interface TicketStatus {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    ticketRules: TicketRule[];
}
