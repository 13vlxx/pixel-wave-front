import { PixelWaveAxios } from "@/api/axios";
import { AuthenticatedResponseDto, ForgotPasswordDto, LoginDto, RegisterDto, ResetPasswordDto } from "./auth.model";

export default {
  loginUser: (login: LoginDto) => PixelWaveAxios.post<AuthenticatedResponseDto>("/auth/login", login).then((res) => res.data),
  registerUser: (register: RegisterDto) => PixelWaveAxios.post<AuthenticatedResponseDto>("/auth/register", register).then((res) => res.data),
  sendRecoveryPasswordEmail: (forgotPasswordDto: ForgotPasswordDto) => PixelWaveAxios.post("/auth/forgot-password", forgotPasswordDto),
  resetPassword: (resetPasswordDto: ResetPasswordDto) => PixelWaveAxios.post("/auth/reset-password", resetPasswordDto),
};
