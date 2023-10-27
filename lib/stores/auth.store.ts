import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export enum AuthState {
  LoggedIn = 1,
  None = 0
}

interface AuthStore {
  user?: User;
  authState: AuthState;
  login: (user: User) => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      authState: AuthState.None,
      login: async (user) => {
        set({
          user,
          authState: AuthState.LoggedIn
        });
      }
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
