import { PixelWaveAxios } from "@/api/axios";
import { HomepageDto } from "./home.model";

export default {
  getHomepage: () => PixelWaveAxios.get<HomepageDto>("/home").then((res) => res.data),
};
