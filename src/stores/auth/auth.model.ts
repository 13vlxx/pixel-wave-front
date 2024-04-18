export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  pseudo: string;
  password: string;
  recieveEmails: boolean;
}

export interface AuthenticatedResponseDto {
  userId: string;
  token: string;
}
