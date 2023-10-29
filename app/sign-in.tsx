import { Divider } from '@/lib/components/Divider';
import { AppleIcon } from '@/lib/components/icons/AppleIcon';
import { GoogleIcon } from '@/lib/components/icons/GoogleIcon';
import { useSession } from '@/lib/context/auth.context';
import {
  RegisterMutation,
  RegisterMutationInput,
  RegisterMutationOutput
} from '@/lib/gql/mutations/auth/register.mutation';
import {
  LoginMutation,
  LoginMutationInput,
  LoginMutationOutput
} from '@/lib/gql/mutations/login.mutation';
import { AuthState, useAuthStore } from '@/lib/stores/auth.store';
import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToastController } from '@tamagui/toast';
import { useAssets } from 'expo-asset';
import { Redirect, router } from 'expo-router';
import { useCallback } from 'react';
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
  YStack,
  styled
} from 'tamagui';
import * as yup from 'yup';

const CustomInput = styled(Input, {
  borderRadius: '$10',
  borderWidth: 0,
  bg: '$backgroundFocus'
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
  const [assets] = useAssets([require('@/assets/logo.png')]);
  const { authState } = useSession();
  const toastController = useToastController();
  const updateUser = useAuthStore((store) => store.login);
  const [loginMutation, loginData] = useMutation<
    { logIn: LoginMutationOutput },
    LoginMutationInput
  >(LoginMutation);
  const [registerMutation, registerData] = useMutation<
    RegisterMutationOutput,
    RegisterMutationInput
  >(RegisterMutation);
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
      loginMutation({
        variables: data
      })
        .then(async (response) => {
          await updateUser(response.data.logIn);

          if (showToasts) {
            toastController.show('Du har loggats in. Vi omdirigerar dig nu.', {
              toastType: 'success'
            });
          }

          setTimeout(() => {
            router.replace('/home');
          }, 2000);
        })
        .catch(() => {
          if (showToasts) {
            toastController.show(
              'Kunde inte logga in, du kanske har felaktiga inloggningsuppgifter?',
              { toastType: 'error' }
            );
          }
        });
    },
    []
  );

  const onRegister = useCallback(async (data: RegisterMutationInput) => {
    registerMutation({
      variables: data
    })
      .then(async () => {
        await onSubmit(data, false);
      })
      .catch((err) => {
        console.log(err);
        toastController.show(
          'Kunde inte registrera dig, du kanske har redan ett konto hos oss?',
          { toastType: 'error' }
        );
      });
  }, []);

  if (authState === AuthState.LoggedIn) {
    return <Redirect href="/home" />;
  }

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
                !loginData.loading && handleSubmit((data) => onSubmit(data))
              }
              icon={loginData.loading && <Spinner size="small" />}
            >
              <Text>Logga in</Text>
            </Button>

            <Button
              onPress={!registerData.loading && handleSubmit(onRegister)}
              icon={registerData.loading && <Spinner size="small" />}
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
