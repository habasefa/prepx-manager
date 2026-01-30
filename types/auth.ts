export interface LoginCredentials {
  username: string;
  password: string;
}

export interface InitialLoginResponse {
  detail: string;
  session_info: ConfirmationSessionInfo;
  confirmation_token: string;
}

export interface ConfirmationSessionInfo {
  session_id: number;
  confirmation_token: string;
}

export interface ConfirmLoginRequest {
  username: string;
  password: string;
  confirmation_token: string;
}

export interface FinalLoginResponse {
  user: UserData;
  token: AuthTokens;
}

export interface UserData {
  id: number;
  name: string;
  phone: string;
  user_type: string;
  grade: string;
  school: string | null;
  region: string | null;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}
