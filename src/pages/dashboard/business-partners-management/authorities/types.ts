export interface Authority {
    id: number;
    name: string;
    phoneCode: string;
    phoneNumber: string;
    address: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export interface AuthorityContactInformation {
    id: number;
    name: string;
    title: string;
    phoneCode: string;
    phoneNumber: string;
    email: string;
    hotline: string;
    createdAt: string;
    updatedAt: string;
}

export interface AuthorityFormData {
    name: string;
    phoneCode: string;
    phoneNumber: string;
    email: string;
    address: string;
}

export interface AuthorityError {
    name: string;
    phoneCode: string;
    phoneNumber: string;
    email: string;
    address: string;
}

export interface AuthoritiesContactInformation {
    name: string;
    title: string;
    phoneCode: string;
    phoneNumber: string;
    email: string;
    hotline: string;
}

export interface AuthoritiesContactInformationError {
    name: string;
    title: string;
    phoneCode: string;
    phoneNumber: string;
    email: string;
    hotline: string;
}
