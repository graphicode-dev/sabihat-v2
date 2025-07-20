export type Load = {
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

export type LoadType = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
};
