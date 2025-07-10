export interface User {
    id: number;
    name: string;
    phoneCode: string;
    phoneNumber: string;
    email: string;
    address: string;
    phoneVerifiedAt: string;
    businessPartnerId: string;
    isSalesman: boolean;
    avatar?: string; // Optional avatar URL
}
