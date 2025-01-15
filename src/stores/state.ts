/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserDataType } from "@/types/user";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
interface GlobalState {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  userData: UserDataType;
  setUserData: (userData: UserDataType) => void;
}
export const useGlobalStore = create<GlobalState>()(
  devtools(
    (set) => ({
      isLoggedIn: false,
      userData: {},
      setUserData: (userData: any) => set({ userData }),
      setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
    }),
    { name: "GlobalStore" }
  )
);
