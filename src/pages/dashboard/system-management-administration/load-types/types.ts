export type Load = {
    id: number;
    loadName: string;
    loadTypeId: number;
    createdAt: string;
    updatedAt: string;
};

export type LoadType = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    loads: Load[];
};
