import { create } from "zustand";
import { devtools } from "zustand/middleware";
interface GlobalState {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}
export const useGlobalStore = create<GlobalState>()(
  devtools(
    (set) => ({
      isLoggedIn: false,
      setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
    }),
    { name: "GlobalStore" }
  )
);
