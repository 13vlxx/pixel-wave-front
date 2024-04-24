import { PixelWaveAxios } from "@api/Axios";
import { HomepageDto } from "./home.model";

export default {
  getHomepage: () => PixelWaveAxios.get<HomepageDto>("/home").then((res) => res.data),
};
