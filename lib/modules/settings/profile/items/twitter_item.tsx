import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@lib/components/button';
import AppSheet from '@lib/components/sheet';
import { QueryKeys } from '@lib/models/query_keys.model';
import {
  IUserPrivateSocialMediaAccounts,
  IUserWithPhoneAndSocial
} from '@lib/models/user.model';
import { queryClient } from '@lib/providers';
import { profileService } from '@lib/services/profile.service';
import { useAuthStore } from '@lib/store/auth.store';
import { ChevronRight, Twitter } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { produce } from 'immer';
import React, { useCallback, useEffect, useState } from 'react';
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

const twitterSchema = z.object({
  twitter: z.string()
});

type TwitterFormType = z.infer<typeof twitterSchema>;
type IUpdateTwitterMutationVars = IUserPrivateSocialMediaAccounts;

export default function TwitterItem() {
  const [open, setOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const { show: showToast } = useToastController();

  const { control, handleSubmit, setValue } = useForm<TwitterFormType>({
    resolver: zodResolver(twitterSchema)
  });

  const query = useQuery<IUserWithPhoneAndSocial>({
    queryKey: [QueryKeys.ProfileWithRelations, user?.id]
  });

  const mutation = useMutation<void, void, IUpdateTwitterMutationVars>({
    mutationKey: [QueryKeys.UserSocialMediaAccounts, user?.id],
    mutationFn: (variables) => {
      return profileService.updateSocialMediaAccounts(variables);
    },
    onSuccess(_, variables) {
      queryClient.setQueryData<IUserWithPhoneAndSocial>(
        [QueryKeys.ProfileWithRelations, user?.id],
        (v) => {
          if (v) {
            const updatedState = produce(v, (draft) => {
              if (draft.social_media_accounts) {
                draft.social_media_accounts.twitter = variables.twitter;
              }
            });

            return updatedState;
          }
        }
      );
    }
  });

  useEffect(() => {
    if (query.data?.social_media_accounts?.twitter) {
      setValue('twitter', query.data?.social_media_accounts.twitter);
    }
  }, [query]);

  const toggleOpen = useCallback(() => {
    setOpen((state) => !state);
  }, []);

  const onSubmit = useCallback(async (inputs: TwitterFormType) => {
    try {
      await mutation.mutateAsync({
        id: user!.id,
        twitter: inputs.twitter,
        updated_at: new Date().toISOString()
      });

      setOpen(false);
      showToast('Uppdaterat!', { toastType: 'success' });
    } catch (error) {
      showToast('Error', { toastType: 'error' });
    }
  }, []);

  return (
    <>
      <ListItem
        size="$5"
        onPressIn={toggleOpen}
        hoverTheme
        pressTheme
        icon={<Twitter />}
        alignItems="center"
        onPress={() => null}
        title="Twitter"
        iconAfter={ChevronRight}
      />

      <AppSheet
        isOpen={open}
        onOpenChange={toggleOpen}
        snapPointsAsPercent={[25]}
      >
        <Form
          onSubmit={handleSubmit(onSubmit)}
          gap="$5"
        >
          <Fieldset>
            <Controller
              control={control}
              name="twitter"
              render={({
                field: { onBlur, onChange, value },
                fieldState: { error }
              }) => (
                <>
                  <Label htmlFor="twitter_username">Användarnamn</Label>
                  <View gap="$3">
                    <Input
                      id="twitter_username"
                      placeholder="@"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                    {error && <Text color="$red10Dark">{error.message}</Text>}
                  </View>
                </>
              )}
            />
          </Fieldset>

          <Form.Trigger
            asChild
            disabled={mutation.isPending}
          >
            <Button theme="active">
              {mutation.isPending ? <Spinner /> : 'Spara'}
            </Button>
          </Form.Trigger>
        </Form>
      </AppSheet>
    </>
  );
}
