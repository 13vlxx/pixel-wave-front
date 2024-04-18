/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PIXEL_WAVE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
