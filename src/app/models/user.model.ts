export interface User {
  email?: string;
  phoneNumber?: string;
  password: string;
  name?: string;
  organizationName?: string;
  organizationId?: string;
  designation?: string;
  birthDate?: Date;
  city?: string;
  pincode?: string;
}

export interface Organization {
  id: string;
  name: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
}
