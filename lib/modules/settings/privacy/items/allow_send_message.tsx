import Switch from '@lib/components/switch';
import { QueryKeys } from '@lib/models/query_keys.model';
import { IUserWithPhoneAndSocial } from '@lib/models/user.model';
import { profileService } from '@lib/services/profile.service';
import { useAuthStore } from '@lib/store/auth.store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Suspense, useCallback } from 'react';
import { ListItem, Spinner, Text } from 'tamagui';

interface IMutationVariables {
  userUid: string;
  checked: boolean;
}

export default function PrivacyAllowSendMessages() {
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [QueryKeys.ProfileWithRelations, user?.id],
    networkMode: 'offlineFirst',
    queryFn: async () => {
      const profile = await profileService.fetchProfile(user!.id);

      return profile;
    }
  });

  const updateShowMessages = useMutation<void, void, IMutationVariables>({
    mutationFn: async ({ checked, userUid }) => {
      return profileService.updateProfile(userUid, {
        sendMessageAllowed: checked
      });
    },
    onSuccess(_data, variables) {
      const qKeyWithRelations = [QueryKeys.ProfileWithRelations, user?.id];

      queryClient.setQueryData<IUserWithPhoneAndSocial>(
        qKeyWithRelations,
        (v) => {
          return {
            ...v,
            sendMessageAllowed: variables.checked
          } as IUserWithPhoneAndSocial;
        }
      );
    }
  });

  const onChange = useCallback(async (checked: boolean) => {
    await updateShowMessages.mutateAsync({
      checked: checked,
      userUid: user!.id
    });
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      <ListItem
        size="$5"
        hoverTheme
        pressTheme
        alignItems="center"
        onPress={() => null}
      >
        <Text>Tillåt sändning av meddelanden</Text>
        <Switch
          checked={query.data?.sendMessageAllowed}
          onCheckedChange={onChange}
        >
          <Switch.Thumb />
        </Switch>
      </ListItem>
    </Suspense>
  );
}
