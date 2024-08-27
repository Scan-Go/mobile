import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type AuthStoreState = {
  isInitialized: boolean;
  user: User | undefined;
  isSignedIn: boolean;
  signingIn: boolean;
};

type Action = {
  updateUser: (state: Pick<AuthStoreState, 'isSignedIn' | 'user'>) => void;
  signOut: () => void;
};

export const useAuthStore = create<AuthStoreState & Action>()(
  persist(
    immer((set) => ({
      isInitialized: false,
      isSignedIn: false,
      user: undefined,
      signingIn: false,
      updateUser(state) {
        set((s) => {
          s.user = state.user;
          s.isSignedIn = state.isSignedIn;
        });
      },
      signOut() {
        set((s) => {
          s.user = undefined;
          s.isSignedIn = false;
          s.signingIn = false;
        });
      }
    })),
    {
      name: 'auth',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
