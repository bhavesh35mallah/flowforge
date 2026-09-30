export type UserStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "SUSPENDED";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  status: UserStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
  };
}

export interface LoginResponse {
  success: boolean;
  data: {
    user: User;
  };
}
