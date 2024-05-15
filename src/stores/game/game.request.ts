import { PixelWaveAxios } from "@api/Axios";
import { GameDto } from "./game.model";

export default {
  getGameDetails: (name: string) =>
    PixelWaveAxios.get<GameDto>(`/games/${name}`).then((res) => res.data),
};
