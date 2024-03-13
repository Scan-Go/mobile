import { IRegisterUserForm } from '@lib/models/user.model';
import { queryClient } from '@lib/providers';
import { AuthStoreState, useAuthStore } from '@lib/store/auth.store';
import { BaseService } from './base.service';

class AuthService extends BaseService {
  async logout() {
    await this.client.auth.signOut();
  }

  async signIn(email: string, password: string) {
    useAuthStore.setState((state) => ({ signingIn: !state.signingIn }));

    const data = await this.client.auth.signInWithPassword({
      email,
      password
    });

    useAuthStore.setState((state) => ({ signingIn: !state.signingIn }));
    return data;
  }
  async signUp(data: IRegisterUserForm) {
    const { error } = await this.client.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          firstName: data.firstName,
          lastName: data.lastName
        }
      }
    });

    if (error) {
      throw error;
    }
  }

  async sendVerificationEmail(email: string) {
    const returnUrl = process.env.PROD
      ? process.env.EXPO_PUBLIC_SUPABASE_URL
      : 'http://localhost:8100';

    const { error } = await this.client.auth.resend({
      email,
      type: 'signup',
      options: {
        emailRedirectTo: returnUrl
      }
    });

    if (error) {
      throw error;
    }
  }

  listenToAuthClient() {
    return this.client.auth.onAuthStateChange((state, session) => {
      const updateState: Partial<AuthStoreState> = {};

      switch (state) {
        case 'INITIAL_SESSION':
          updateState.isInitialized = true;

          if (session) {
            updateState.isSignedIn = true;
            updateState.user = session.user;
          }
          break;

        case 'SIGNED_IN':
          updateState.isSignedIn = true;
          updateState.user = session!.user;
          break;

        case 'SIGNED_OUT':
          updateState.isSignedIn = false;
          updateState.user = undefined;
          queryClient.clear();
          break;

        case 'USER_UPDATED':
          updateState.user = session!.user;
          break;
      }

      useAuthStore.setState((state) => ({ ...state, ...updateState }));
    });
  }
}

export const authService = new AuthService();
