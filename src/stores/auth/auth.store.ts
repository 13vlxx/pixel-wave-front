import { UserStore } from "@stores/user/user.store";
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

const getToken = () => JSON.parse(localStorage.getItem("token") as string);

export const useAuthStore = create<AuthState & AuthAction>()(
  persist(
    (set) => ({
      token: getToken()?.state.token,
      login: (auth: AuthenticatedResponseDto) => {
        set({ token: auth.token });
        UserStore.setState({ user: auth.user });
      },
      logout: () => {
        set({ token: undefined });
        UserStore.setState({ user: undefined });
        window.location.replace("/");
      },
    }),
    {
      name: "token",
      storage: createJSONStorage(() => localStorage),
      partialize: ({ token }) => ({ token }),
    }
  )
);
