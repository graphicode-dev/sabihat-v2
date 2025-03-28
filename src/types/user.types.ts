export interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  role: string;
  status: string | null;
  phoneVerifiedAt: string;
  currentBalance: string;
  avatar?: string; // Optional avatar URL
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    result: User;
  };
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: User;
}
