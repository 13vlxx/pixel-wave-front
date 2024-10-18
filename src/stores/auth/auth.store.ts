import { useUserStore } from "@/stores/user/user.store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AuthenticatedResponseDto } from "./auth.model";

interface AuthState {
  token?: string;
  isModalOpen: boolean;
}

interface AuthAction {
  login: (by: AuthenticatedResponseDto) => void;
  logout: () => void;
  toggleModal: () => void;
}

const getToken = () => JSON.parse(localStorage.getItem("pw-token") as string);

export const useAuthStore = create<AuthState & AuthAction>()(
  persist(
    (set) => ({
      token: getToken()?.state.token,
      isModalOpen: false,
      login: (auth: AuthenticatedResponseDto) => {
        set({ token: auth.token, isModalOpen: false });
        useUserStore.setState({
          id: auth.user.id,
          profilePicture: auth.user.profilePicture,
        });
      },
      logout: () => {
        set({ token: undefined, isModalOpen: false });
        useUserStore.setState({ id: undefined, profilePicture: undefined });
        window.location.replace("/");
      },
      toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
    }),
    {
      name: "pw-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: ({ token, isModalOpen }) => ({ token, isModalOpen }),
    },
  ),
);
