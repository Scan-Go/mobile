import { zodResolver } from '@hookform/resolvers/zod';
import { useAlertDialog } from '@lib/hooks/useAlertDialog';
import { IRegisterUserForm } from '@lib/models/user.model';
import { authService } from '@lib/services/auth.service';
import { useToastController } from '@tamagui/toast';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Form, Input, Label, Spinner, Text, YStack } from 'tamagui';
import { z } from 'zod';

const schema = z
  .object({
    firstName: z.string().min(3, 'Minimum 3 karaktär.'),
    lastName: z.string().min(3, 'Minimum 3 karaktär.'),
    email: z.string().email('Ett giltigt e-mejl address.'),
    password_confirmation: z.string().min(5, 'Minimum 5 karaktär'),
    password: z.string().min(5, 'Minimum 5 karaktär.')
  })
  .superRefine(({ password_confirmation, password }, ctx) => {
    if (password_confirmation !== password) {
      ctx.addIssue({
        path: ['password_confirmation'],
        code: 'custom',
        message: 'The passwords did not match'
      });
    }
  });

type InputData = z.infer<typeof schema>;

function RegisterForm() {
  const toast = useToastController();
  const { showAlertDialog, dismissDialog } = useAlertDialog();
  const { show } = useToastController();

  const registerMutation = useMutation<void, void, IRegisterUserForm>({
    mutationFn: (data) => authService.signUp(data),
    onSuccess(data, variables, context) {
      show('Reg success', { toastType: 'success' });
      router.replace('/(auth)/verification');
    }
  });

  const { control, handleSubmit } = useForm<InputData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = useCallback(async (data: InputData) => {
    await registerMutation.mutateAsync({
      ...data
    });
  }, []);

  return (
    <>
      <YStack>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="firstName"
            render={({
              field: { onBlur, onChange, value },
              fieldState: { error },
              formState: { errors }
            }) => (
              <>
                <Label htmlFor="firstName">Namn</Label>
                <Input
                  id="firstName"
                  placeholder="Namn"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.firstName ? (
                  <Text color="red">{errors.firstName.message}</Text>
                ) : null}
              </>
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({
              field: { onBlur, onChange, value },
              fieldState: { error },
              formState: { errors }
            }) => (
              <>
                <Label htmlFor="lastName">Efternamn</Label>
                <Input
                  id="lastName"
                  placeholder="Efternamn"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.lastName ? (
                  <Text color="red">{errors.lastName.message}</Text>
                ) : null}
              </>
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({
              field: { onBlur, onChange, value },
              formState: { errors }
            }) => (
              <>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  keyboardType="email-address"
                  placeholder="Email"
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.email ? (
                  <Text color="red">{errors.email.message}</Text>
                ) : null}
              </>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({
              field: { onBlur, onChange, value },
              formState: { errors }
            }) => (
              <>
                <Label htmlFor="password">Lösenord</Label>
                <Input
                  id="password"
                  placeholder="Lösenord"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.password ? (
                  <Text color="red">{errors.password.message}</Text>
                ) : null}
              </>
            )}
          />
          <Controller
            control={control}
            name="password_confirmation"
            render={({
              field: { onBlur, onChange, value },
              formState: { errors }
            }) => (
              <>
                <Label htmlFor="password_confirmation">Lösenord (Igen) </Label>
                <Input
                  id="password_confirmation"
                  placeholder="Lösenord"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.password_confirmation?.message ? (
                  <Text color="red">
                    {errors.password_confirmation.message}
                  </Text>
                ) : null}
              </>
            )}
          />

          <YStack mt="$5" />
          <Form.Trigger
            asChild
            disabled={registerMutation.isPending}
          >
            <Button
              theme="active"
              onPress={handleSubmit(onSubmit)}
            >
              {registerMutation.isPending ? <Spinner /> : 'Registrera dig'}
            </Button>
          </Form.Trigger>
        </Form>
      </YStack>
    </>
  );
}

export default RegisterForm;
