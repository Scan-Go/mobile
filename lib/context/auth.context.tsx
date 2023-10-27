import React from 'react';
import { AuthState, useAuthStore } from '../stores/auth.store';

interface IAuthContext {
  authState: AuthState;
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

  return (
    <AuthContext.Provider
      value={{
        authState
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
