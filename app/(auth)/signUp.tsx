import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '@lib/components/button';
import DividerWithText from '@lib/components/divider';
import Screen from '@lib/components/screen';
import RegisterForm from '@lib/modules/auth/register-form';
import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { H1, H6, ScrollView, View } from 'tamagui';

export default function SignUpPage() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Sign up'
    });
  }, []);

  return (
    <Screen gap="$3">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView>
          <H1>Registrera dig</H1>
          <H6 color="gray">Welcome back to the app</H6>

          <RegisterForm />

          <DividerWithText>eller forsätt med</DividerWithText>

          <View gap="$5">
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
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
