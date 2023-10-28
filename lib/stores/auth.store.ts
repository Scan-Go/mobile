import { LoginMutationOutput } from '../gql/mutations/login.mutation';
import { IUser } from '../models/auth.model';
import { authStorage } from '../storage/auth.storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export enum AuthState {
  LoggedIn = 1,
  None = 0
}

interface AuthStore {
  user?: IUser;
  authState: AuthState;
  login: (user: LoginMutationOutput) => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      authState: AuthState.None,
      login: async (user) => {
        await authStorage.saveToken(user.access_token, user.refresh_token);

        set({
          user: user.user,
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
