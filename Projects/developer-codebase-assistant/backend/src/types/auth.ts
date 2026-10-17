export interface Credentials {
  email: string;
  password: string;
}

export interface SafeUser {
  id: string;
  email: string;
}

export interface AuthenticatedUser {
  user: SafeUser;
  token: string;
}
