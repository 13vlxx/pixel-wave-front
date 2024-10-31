/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PIXEL_WAVE_API_URL: string;
  readonly VITE_ENVIRONMENT: "dev" | "prod";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
