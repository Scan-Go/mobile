import { Divider } from '@/lib/components/Divider';
import { AppleIcon } from '@/lib/components/icons/AppleIcon';
import { GoogleIcon } from '@/lib/components/icons/GoogleIcon';
import { LoginMutationInput } from '@/lib/gql/mutations/login.mutation';
import { supabase } from '@/lib/services/supabase';
import { useAuthStore } from '@/lib/stores/auth.store';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToastController } from '@tamagui/toast';
import { useAssets } from 'expo-asset';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform } from 'react-native';
import {
  Button,
  Image,
  Input,
  Label,
  Spinner,
  Text,
  View,
  XStack,
  YStack,
  styled
} from 'tamagui';
import * as yup from 'yup';

const CustomInput = styled(Input, {
  borderRadius: '$10'
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
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [assets] = useAssets([require('@/assets/logo.png')]);
  const toastController = useToastController();
  const updateUser = useAuthStore((store) => store.login);

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

  const onSubmit = useCallback(
    async (data: LoginMutationInput, showToasts = true) => {
      setIsLoggingIn(true);

      const response = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });

      if (response.error) {
        if (showToasts) {
          toastController.show(
            'Kunde inte logga in, du kanske har felaktiga inloggningsuppgifter?',
            { toastType: 'error' }
          );
        }

        setIsLoggingIn(false);
        return;
      }

      await updateUser(response.data.user);

      if (showToasts) {
        toastController.show('Du har loggats in. Vi omdirigerar dig nu.', {
          toastType: 'success'
        });
      }

      setIsLoggingIn(false);

      setTimeout(() => {
        router.replace('/home');
      }, 2000);
    },
    []
  );

  const onRegister = useCallback(async (data: LoginMutationInput) => {
    setIsRegistering(true);
    const response = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: null,
          last_name: null
        }
      }
    });

    if (response.error) {
      console.log(response.error);
      setIsRegistering(false);
      toastController.show(
        'Kunde inte registrera dig, du kanske har redan ett konto hos oss?',
        { toastType: 'error' }
      );

      return;
    }

    await onSubmit(data, false);

    setIsRegistering(false);
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
            {assets ? <Image source={assets[0]} /> : null}
            <Text
              fontWeight="bold"
              fontSize="$5"
            >
              Scan & Go
            </Text>
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

            <XStack justifyContent="space-around">
              <Button
                variant="outlined"
                onPress={!isLoggingIn && handleSubmit((data) => onSubmit(data))}
                icon={isLoggingIn && <Spinner size="small" />}
              >
                <Text>Logga in</Text>
              </Button>

              <Button
                bg="$primary"
                onPress={!isRegistering && handleSubmit(onRegister)}
                icon={isRegistering && <Spinner size="small" />}
              >
                <Text color="white">Registrera dig</Text>
              </Button>
            </XStack>
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
