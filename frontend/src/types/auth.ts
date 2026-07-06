export interface TokenApiResponse {
  access_token: string;
  refresh_token: string;
  token_type: "bearer";
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface RegisterUserResponse {
  id: string;
  email: string;
}
