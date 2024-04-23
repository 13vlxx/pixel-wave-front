import { PixelWaveAxios } from "@api/Axios";
import { HomepageDto } from "./home.model";

export default {
  getHomepage: () => PixelWaveAxios.get<HomepageDto>("/games").then((res) => res.data),
};
