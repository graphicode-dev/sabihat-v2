export interface Commission {
    id: number;
    businessPartner: {
        id: number;
        businessPartnerId: number | null;
        name: string;
        phoneCode: string;
        phoneNumber: string;
        email: string;
        address: string;
        partnerId: number;
        layer: {
            id: number;
            name: string;
            parentId: number;
            createdAt: string;
            updatedAt: string;
        };
        status: string;
        createdAt: string;
        updatedAt: string;
    };
    partnersClassification: {
        id: number;
        nameClass: string;
        createdAt: string;
        updatedAt: string;
    };
    load: {
        id: number;
        loadName: string;
        loadType: {
            id: number;
            name: string;
            createdAt: string;
            updatedAt: string;
        };
        createdAt: string;
        updatedAt: string;
    };
    loadType: {
        id: number;
        name: string;
        createdAt: string;
        updatedAt: string;
    };
    cabin: {
        id: number;
        name: string;
        description: string;
        loadType: {
            id: number;
            name: string;
            createdAt: string;
            updatedAt: string;
        };
        createdAt: string;
        updatedAt: string;
    };
    portFrom: {
        id: number;
        name: string;
        abbreviationCode: string;
        country: {
            id: number;
            name: string;
            isoCode: string;
            createdAt: string;
            updatedAt: string;
        };
        createdAt: string;
        updatedAt: string;
    };
    portTo: {
        id: number;
        name: string;
        abbreviationCode: string;
        country: {
            id: number;
            name: string;
            isoCode: string;
            createdAt: string;
            updatedAt: string;
        };
        createdAt: string;
        updatedAt: string;
    };
    ticketType: string;
    visitType: string;
    commissionType: string;
    commissionValue: string;
    effectiveDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
}
