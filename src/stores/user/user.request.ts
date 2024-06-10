import { PixelWaveAxios } from "@api/Axios";
import { GetUserProfileDto } from "./user.model";

export default {
  getMe: () => PixelWaveAxios.get<GetUserProfileDto>(`/users/me`).then((res) => res.data),
};
