import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ThemeState {
  theme: "light" | "dark";
}

interface ThemeActions {
  setTheme: (theme: "light" | "dark") => void;
}

export const useThemeStore = create<ThemeState & ThemeActions>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "pw-theme",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
