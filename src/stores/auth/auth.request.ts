import { PixelWaveAxios } from "@api/Axios";
import { AuthenticatedResponseDto, ForgotPasswordDto, LoginDto, RegisterDto } from "./auth.model";

export default {
  loginUser: (login: LoginDto) =>
    PixelWaveAxios.post<AuthenticatedResponseDto>("/auth/login", login).then((res) => res.data),
  registerUser: (register: RegisterDto) =>
    PixelWaveAxios.post<AuthenticatedResponseDto>("/auth/register", register).then(
      (res) => res.data
    ),
  sendRecoveryPasswordEmail: (forgotPasswordDto: ForgotPasswordDto) =>
    PixelWaveAxios.post("/auth/forgot-password", forgotPasswordDto).then((res) => res.data),
  resetPassword: (password: string, token: string) =>
    PixelWaveAxios.post("/auth/reset-password", { password, token }).then((res) => res.data),
};
