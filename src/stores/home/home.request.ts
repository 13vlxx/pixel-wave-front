import { PixelWaveAxios } from "@api/Axios";
import { LiteGameDto } from "./home.model";

export default {
  getHomepage: () => PixelWaveAxios.get<LiteGameDto[]>("/games").then((res) => res.data),
};
