import { HandleRequestError } from "@/_utils/handle-request-error";
import { useAuthStore } from "@/stores/auth/auth.store";
import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_PIXEL_WAVE_API_URL,
};

export const PixelWaveAxios = axios.create(config);

PixelWaveAxios.interceptors.request.use((config) => {
  if (useAuthStore.getState().token) config.headers.Authorization = `Bearer ${useAuthStore.getState().token}`;
  return config;
});

PixelWaveAxios.interceptors.response.use(undefined, (error) => {
  HandleRequestError(error);
  return Promise.reject(error);
});
