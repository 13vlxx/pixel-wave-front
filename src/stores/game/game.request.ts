import { PixelWaveAxios } from "@/api/axios";
import { CreateAdviceDto, GameDto } from "./game.model";

export default {
  getGameDetails: (name: string) => PixelWaveAxios.get<GameDto>(`/games/${name}`).then((res) => res.data),

  checkIfFavorite: (gameId: string) => PixelWaveAxios.get(`/games/${gameId}/favorite`).then((res) => res.data),

  toggleFavorite: (gameId: string) => PixelWaveAxios.put(`/games/${gameId}/favorite`).then((res) => res.data),

  createAdvice: (createAdviceDto: CreateAdviceDto, gameId: string) => PixelWaveAxios.post(`/games/${gameId}/advice`, createAdviceDto).then((res) => res.data),

  updateAdvice: (createAdviceDto: CreateAdviceDto, gameId: string) => PixelWaveAxios.put(`/games/${gameId}/advice`, createAdviceDto).then((res) => res.data),
};
