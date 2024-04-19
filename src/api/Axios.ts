import { HandleRequestError } from "@utils/handle-request-error";
import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_PIXEL_WAVE_API_URL,
};

export const PixelWaveAxios = axios.create(config);

PixelWaveAxios.interceptors.response.use(undefined, (error) => {
  HandleRequestError(error);
  return Promise.reject(error);
});
