import { PixelWaveAxios } from "@api/Axios";
import { GetMeDto, GetUserProfileDto, UpdateSettingsDto } from "./user.model";

export default {
  getMe: () => PixelWaveAxios.get<GetMeDto>(`/users/me`).then((res) => res.data),
  getUserById: (id: string) =>
    PixelWaveAxios.get<GetUserProfileDto>(`/users/${id}`).then((res) => res.data),
  updateSettings: (update: UpdateSettingsDto) =>
    PixelWaveAxios.patch(`/users/profile`, update).then((res) => res.data),
};
