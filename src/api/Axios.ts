import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_PIXEL_WAVE_API_URL,
};

export const PixelWaveAxios = axios.create(config);

PixelWaveAxios.interceptors.response.use(undefined, (error) => {
  if (error.response?.status === 401) {
    console.log("Unauthorized");
  }
  return Promise.reject(error);
});
