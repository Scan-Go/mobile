import { useSession } from '@/lib/context/auth.context';
import { AuthState } from '@/lib/stores/auth.store';
import { Redirect, Stack } from 'expo-router';
import React from 'react';

export default function Layout() {
  const { authState } = useSession();

  if (authState === AuthState.None) {
    return <Redirect href="/sign-in" />;
  }

  return <Stack />;
}
