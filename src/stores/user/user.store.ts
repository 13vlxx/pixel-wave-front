import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
  id?: string;
}

interface UserActions {
  setUser: (id: string) => void;
}

export const useUserStore = create<UserState & UserActions>()(
  persist(
    (set) => ({
      id: undefined,
      setUser: (id: string) => set({ id }),
    }),
    {
      name: "pw-user-id",
      storage: createJSONStorage(() => localStorage),
      partialize: ({ id }) => ({ id }),
    }
  )
);
