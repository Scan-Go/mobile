import { yupResolver } from '@hookform/resolvers/yup';
import { Divider } from '@lib/components/Divider';
import { AppleIcon } from '@lib/components/icons/AppleIcon';
import { GoogleIcon } from '@lib/components/icons/GoogleIcon';
import auth from '@react-native-firebase/auth';
import { useToastController } from '@tamagui/toast';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform } from 'react-native';
import {
  Button,
  Input,
  Label,
  Spinner,
  Text,
  View,
  YStack,
  styled
} from 'tamagui';
import * as yup from 'yup';

const CustomInput = styled(Input, {
  borderRadius: '$10',
  borderWidth: 0,
  backgroundColor: '$backgroundFocus'
});

const CustomKeyboardAvoidingView = styled(KeyboardAvoidingView, {
  behavior: Platform.OS === 'ios' ? 'position' : 'position',
  gap: 10,
  display: 'flex',
  keyboardVerticalOffset: 100
});

const signInSchema = yup
  .object({
    email: yup
      .string()
      .email('Ett giltigt emejl behövs.')
      .required('Emejl kan inte vara tomt.'),
    password: yup
      .string()
      .min(6, 'Minimum 6 tecken.')
      .required('Lösenord kan inte vara tomt.')
  })
  .required();

export default function SignInView() {
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const toastController = useToastController();

  const onSubmit = useCallback(
    async (data: { email: string; password: string }) => {
      try {
        setIsLoggingIn(true);
        await auth().signInWithEmailAndPassword(data.email, data.password);

        toastController.show('Du har loggats in. Vi omdirigerar dig nu.', {
          toastType: 'success'
        });

        setTimeout(() => {
          router.replace('/home');
        }, 2000);
      } catch (error) {
        setIsLoggingIn(false);
        toastController.show(
          'Kunde inte logga in, du kanske har felaktiga inloggningsuppgifter?',
          { toastType: 'error' }
        );
      }
    },
    []
  );
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(signInSchema),
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onRegister = useCallback(async () => {
    setIsRegistering(true);
  }, []);

  return (
    <View
      p={20}
      flex={1}
    >
      <YStack gap="$5">
        <CustomKeyboardAvoidingView>
          <View
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            m="$10"
          >
            <Text fontFamily="$body">Scan & Go</Text>
          </View>

          <YStack gap="$3">
            <View gap="$3">
              <Label
                htmlFor="email"
                fontWeight="bold"
              >
                Email
              </Label>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <CustomInput
                      keyboardType="email-address"
                      placeholder="hello@gmail.com"
                      autoCapitalize="none"
                      onChangeText={onChange}
                      autoComplete="email"
                      autoCorrect={false}
                      onBlur={onBlur}
                      value={value}
                      borderColor={errors.email ? 'red' : undefined}
                      id="email"
                    />
                    {errors.email ? (
                      <Text color="red">{errors.email.message}</Text>
                    ) : null}
                  </>
                )}
              />
            </View>
            <View gap="$3">
              <Label htmlFor="password">Lösenord</Label>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <CustomInput
                      secureTextEntry
                      placeholder="min. 6 characters"
                      id="password"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      borderColor={errors.password ? 'red' : undefined}
                    />

                    {errors.password ? (
                      <Text color="red">{errors.password.message}</Text>
                    ) : null}
                  </>
                )}
              />
            </View>

            <Button
              variant="outlined"
              onPress={
                !isLoggingIn
                  ? handleSubmit((data) => onSubmit(data))
                  : undefined
              }
              icon={isLoggingIn ? <Spinner size="small" /> : undefined}
            >
              <Text>Logga in</Text>
            </Button>

            <Button
              onPress={!isRegistering ? handleSubmit(onRegister) : undefined}
              icon={isRegistering ? <Spinner size="small" /> : undefined}
            >
              <Text>Registrera dig</Text>
            </Button>
          </YStack>
        </CustomKeyboardAvoidingView>

        <Divider>or</Divider>

        <Button
          icon={<GoogleIcon />}
          borderWidth={1}
          borderColor="$gray7Light"
          borderRadius="$10"
        >
          Logga in med Google
        </Button>
        <Button
          icon={<AppleIcon />}
          borderWidth={1}
          borderColor="$gray7Light"
          borderRadius="$10"
        >
          Logga in med Google
        </Button>
      </YStack>
    </View>
  );
}
