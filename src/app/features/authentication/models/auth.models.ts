export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  accessToken: string;
  refreshToken: string;
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  data: T;
  message: string;
  statusCode: number;
  errors: string[];
}

export interface LoginResponseData {
  userId: string;
  name: string;
  isAuthenticated: boolean;
  token: string;
  refreshToken: string;
  roles: string[];
  profilePicture: string;
}