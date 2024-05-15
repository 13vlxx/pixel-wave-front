import { useUserStore } from "@stores/user/user.store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AuthenticatedResponseDto } from "./auth.model";

interface AuthState {
  token?: string;
}

interface AuthAction {
  login: (by: AuthenticatedResponseDto) => void;
  logout: () => void;
}

const getToken = () => JSON.parse(localStorage.getItem("pw-token") as string);

export const useAuthStore = create<AuthState & AuthAction>()(
  persist(
    (set) => ({
      token: getToken()?.state.token,
      login: (auth: AuthenticatedResponseDto) => {
        set({ token: auth.token });
        useUserStore.setState({ id: auth.user.id });
      },
      logout: () => {
        set({ token: undefined });
        useUserStore.setState({ id: undefined });
        window.location.replace("/");
      },
    }),
    {
      name: "pw-token",
      storage: createJSONStorage(() => localStorage),
      partialize: ({ token }) => ({ token }),
    }
  )
);
