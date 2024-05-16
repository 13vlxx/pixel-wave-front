import { PixelWaveAxios } from "@api/Axios";
import { CreateAdviceDto, GameDto } from "./game.model";

export default {
  getGameDetails: (name: string) =>
    PixelWaveAxios.get<GameDto>(`/games/${name}`).then((res) => res.data),

  createAdvice: (createAdviceDto: CreateAdviceDto, gameId: string) =>
    PixelWaveAxios.post(`/games/${gameId}/advice`, createAdviceDto).then((res) => res.data),
};
