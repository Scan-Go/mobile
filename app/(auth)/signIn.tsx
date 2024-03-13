import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '@lib/components/button';
import DividerWithText from '@lib/components/divider';
import Screen from '@lib/components/screen';
import LoginForm from '@lib/modules/auth/login-form';
import { Link, useNavigation } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { H1, H6, View } from 'tamagui';

function LoginScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  return (
    <Screen
      gap="$3"
      justifyContent="space-evenly"
    >
      <H1>Login</H1>
      <H6 color="gray">Welcome back to the app</H6>
      <LoginForm />

      <DividerWithText>eller forsätt med</DividerWithText>

      <View gap="$4">
        <Button
          outlined
          icon={<MaterialCommunityIcons name="google" />}
        >
          Fortsätt med Google
        </Button>
        <Button
          outlined
          icon={<MaterialCommunityIcons name="apple" />}
        >
          Fortsätt med Apple
        </Button>
      </View>
      <DividerWithText>eller</DividerWithText>

      <Link
        href="/(auth)/signUp"
        asChild
      >
        <Button outlined>Skapa ett konto</Button>
      </Link>
    </Screen>
  );
}

export default LoginScreen;
