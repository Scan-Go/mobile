import { IUser } from '../models/auth.model';
import { AuthState, useAuthStore } from '../stores/auth.store';
import React from 'react';

interface IAuthContext {
  authState: AuthState;
  user: IUser;
}

const AuthContext = React.createContext<IAuthContext>(null);

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const authState = useAuthStore((state) => state.authState);
  const user = useAuthStore((state) => state.user);

  return (
    <AuthContext.Provider
      value={{
        authState,
        user
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
