import { PixelWaveAxios } from "@/api/axios";

export default {
  checkIfAlreadyPostedAdvice: (gameId: string) => PixelWaveAxios.get(`/advices/${gameId}/check`).then((res) => res.data),
};
