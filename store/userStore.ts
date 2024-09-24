import { User } from "@/utils/interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: User | null;
  wallet: any | null;
  setUser: (user: User) => void;
  setUserWallet: (wallet: any) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      wallet: null,
      setUser: (user) => {
        console.log("Setting user in store:", user);
        set((state) => ({
          ...state,
          user,
        }));
        // 상태가 변경된 이후 불필요한 상태 조회와 로그를 최소화
      },
      setUserWallet: (wallet) => {
        console.log("Setting user wallet in store:", wallet);
        set((state) => ({ ...state, wallet }));
      },
      clearUser: () => {
        console.log("Clearing user and wallet from store");
        set({ user: null, wallet: null });
      },
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage,
    }
  )
);
