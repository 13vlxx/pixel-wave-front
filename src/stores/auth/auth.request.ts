import { PixelWaveAxios } from "@api/Axios";
import { AuthenticatedResponseDto, LoginDto, RegisterDto } from "./auth.model";

export default {
  loginUser: (login: LoginDto) =>
    PixelWaveAxios.post<AuthenticatedResponseDto>("/auth/login", login).then((res) => res.data),
  registerUser: (register: RegisterDto) =>
    PixelWaveAxios.post<AuthenticatedResponseDto>("/auth/register", register).then(
      (res) => res.data
    ),
};
