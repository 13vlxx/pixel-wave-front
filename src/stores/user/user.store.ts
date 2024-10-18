import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
  id?: string;
  profilePicture?: string | null;
}

interface UserActions {
  setUser: (id: string, profilePicture?: string) => void;
  setProfilePicture: (profilePicture: string) => void;
}

export const useUserStore = create<UserState & UserActions>()(
  persist(
    (set) => ({
      id: undefined,
      profilePicture: undefined,
      setUser: (id: string, profilePicture?: string) => set({ id, profilePicture }),
      setProfilePicture: (profilePicture: string) => set({ profilePicture }),
    }),
    {
      name: "pw-user",
      storage: createJSONStorage(() => localStorage),
      partialize: ({ id, profilePicture }) => ({ id, profilePicture }),
    },
  ),
);
