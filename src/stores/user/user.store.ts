import { createStore } from "zustand";
import { GetUserDto } from "./user.model";

interface UserState {
  user?: GetUserDto;
}

interface UserActions {
  setUser: (user: GetUserDto) => void;
}

export const UserStore = createStore<UserState & UserActions>()((set) => ({
  user: undefined,
  setUser: (user: GetUserDto) => set({ user }),
}));
