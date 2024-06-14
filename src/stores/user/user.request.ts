import { PixelWaveAxios } from "@api/Axios";
import { GetMeDto, UpdateSettingsDto } from "./user.model";

export default {
  getMe: () => PixelWaveAxios.get<GetMeDto>(`/users/me`).then((res) => res.data),
  updateSettings: (update: UpdateSettingsDto) =>
    PixelWaveAxios.patch(`/users/settings`, update).then((res) => res.data),
};
