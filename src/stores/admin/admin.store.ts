import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { GetAdminDataDto } from "./admin.model";

interface AdminState {
  data: GetAdminDataDto | null;
  isLoading: boolean;
}

interface AdminActions {
  setData: (data: GetAdminDataDto) => void;
  toggleLoadingState: () => void;
}

export const useAdminStore = create<AdminState & AdminActions>()(
  persist(
    (set) => ({
      data: null,
      isLoading: false,
      setData: (data: GetAdminDataDto) => set({ data }),
      toggleLoadingState: () => set((state) => ({ isLoading: !state.isLoading })),
    }),
    {
      name: "pw-admin",
      storage: createJSONStorage(() => localStorage),
      partialize: ({ data }) => ({ data }),
    },
  ),
);
