import { GetUserDto } from "@/stores/user/user.model";

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  pseudo: string;
  password: string;
}

export interface AuthenticatedResponseDto {
  user: GetUserDto;
  token: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  code: string;
  password: string;
}
