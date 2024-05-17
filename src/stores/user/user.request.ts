import { PixelWaveAxios } from "@api/Axios";
import { GetUserProfileDto } from "./user.model";

export default {
  getProfile: () => PixelWaveAxios.get<GetUserProfileDto>(`/users/me`).then((res) => res.data),
};
