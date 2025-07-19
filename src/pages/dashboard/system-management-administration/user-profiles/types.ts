export type UserProfile = {
    id: number;
    name: string;
    email: string;
    phoneCode: string;
    phoneNumber: string;
    phoneVerifiedAt: null | string;
    address: string;
    image: string;
    businessPartnerId: number;
    isSalesman: 0 | 1;
    createdAt: string;
    updatedAt: string;
};
