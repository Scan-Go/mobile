import useSession from '@lib/hooks/useSession';
import { Redirect, Stack } from 'expo-router';
import React from 'react';

export default function Layout() {
  const { isLoggedIn } = useSession();

  if (!isLoggedIn) {
    return <Redirect href="/sign-in" />;
  }

  return <Stack />;
}
