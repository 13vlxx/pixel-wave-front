import { PixelWaveAxios } from "@api/Axios";

export default {
  checkIfAlreadyPostedAdvice: (gameId: string) =>
    PixelWaveAxios.get(`/advices/${gameId}/check`).then((res) => res.data),
};
