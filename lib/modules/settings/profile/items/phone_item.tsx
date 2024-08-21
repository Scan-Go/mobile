import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@lib/components/button';
import AppDialog from '@lib/components/dialog';
import { QueryKeys } from '@lib/models/query_keys.model';
import {
  IUserPrivatePhone,
  IUserWithPhoneAndSocial
} from '@lib/models/user.model';
import { queryClient } from '@lib/providers';
import { profileService } from '@lib/services/profile.service';
import { useAuthStore } from '@lib/store/auth.store';
import { ChevronRight, Phone } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { produce } from 'immer';
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';
import React, { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Fieldset,
  Form,
  Input,
  Label,
  ListItem,
  Spinner,
  Text,
  View
} from 'tamagui';
import { z } from 'zod';

function s(s: string) {
  const selam = isValidPhoneNumber(s, 'SE');

  return selam;
}

const phoneSchema = z.object({
  phone: z
    .string()
    .refine(s)
    .transform((value) => parsePhoneNumber(value, 'SE').number.toString())
});

type PhoneFormType = z.infer<typeof phoneSchema>;
type IUpdatePhoneNumberMutation = Omit<IUserPrivatePhone, 'created_at'>;

export default function PhoneItem() {
  const user = useAuthStore((state) => state.user);
  const { show: showToast } = useToastController();

  const { control, handleSubmit, setValue, formState, getValues } =
    useForm<PhoneFormType>({
      resolver: zodResolver(phoneSchema)
    });

  const query = useQuery<IUserWithPhoneAndSocial>({
    queryKey: [QueryKeys.ProfileWithRelations, user?.id]
  });

  const mutation = useMutation<void, void, IUpdatePhoneNumberMutation>({
    mutationKey: [QueryKeys.UserSocialMediaAccounts, user?.id],
    mutationFn: (variables) => {
      return profileService.updatePhoneNumber(variables.id, variables.number);
    },
    onSuccess(_, variables) {
      queryClient.setQueryData<IUserWithPhoneAndSocial>(
        [QueryKeys.ProfileWithRelations, user?.id],
        (v) => {
          if (v) {
            const updatedState = produce(v, (draft) => {
              if (draft?.phone_numbers?.id) {
                draft.phone_numbers.id = variables.id;
                draft.phone_numbers.number = variables.number;
              }
            });

            return updatedState;
          }
        }
      );
    }
  });

  useEffect(() => {
    const phoneValue = getValues('phone');
    if (query.data?.phone_numbers?.number && !phoneValue) {
      setValue('phone', query.data?.phone_numbers?.number);
    }
  }, [query]);

  const onSubmit = useCallback(async (inputs: PhoneFormType) => {
    try {
      await mutation.mutateAsync({
        id: user!.id,
        number: inputs.phone
      });

      showToast('Uppdaterat!', { toastType: 'success' });
    } catch (error) {
      showToast('Error', { toastType: 'error' });
    }
  }, []);

  return (
    <>
      <AppDialog
        trigger={
          <ListItem
            size="$5"
            hoverTheme
            pressTheme
            icon={<Phone />}
            alignItems="center"
            onPress={() => null}
            title="Telefonnummer"
            iconAfter={ChevronRight}
          />
        }
        title="Telefonnummer"
        description="Bytt ditt telefonnummer"
        snapPointsAsPercent={[50, 75]}
      >
        <Form
          onSubmit={handleSubmit(onSubmit)}
          gap="$5"
        >
          <Fieldset>
            <Controller
              control={control}
              name="phone"
              render={({
                field: { onBlur, onChange, value },
                fieldState: { error }
              }) => (
                <>
                  <Label htmlFor="phone">Telefonnummer</Label>
                  <View gap="$3">
                    <Input
                      id="phone"
                      placeholder="0731231232"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      keyboardType="phone-pad"
                      textContentType="telephoneNumber"
                    />
                    {error && <Text color="$red10Dark">{error.message}</Text>}
                  </View>
                </>
              )}
            />
          </Fieldset>
          <Form.Trigger
            asChild
            disabled={!formState.isValid}
          >
            <Button>{mutation.isPending ? <Spinner /> : 'Spara'}</Button>
          </Form.Trigger>
        </Form>
      </AppDialog>
    </>
  );
}
