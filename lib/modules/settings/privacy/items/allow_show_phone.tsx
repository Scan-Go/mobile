import Switch from '@lib/components/switch';
import { QueryKeys } from '@lib/models/query_keys.model';
import { IUserWithPhoneAndSocial } from '@lib/models/user.model';
import { profileService } from '@lib/services/profile.service';
import { useAuthStore } from '@lib/store/auth.store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { ListItem, Text } from 'tamagui';

interface IMutationVariables {
  userUid: string;
  checked: boolean;
}

export default function PrivacyAllowShowPhone() {
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
  const updateShowPhoneNumber = useMutation<void, void, IMutationVariables>({
    mutationFn: async ({ checked, userUid }) => {
      return profileService.updateProfile(userUid, {
        showPhoneNumber: checked
      });
    },
    onSuccess(data, variables) {
      const qKey = [QueryKeys.ProfileWithRelations, user?.id];

      queryClient.setQueryData<IUserWithPhoneAndSocial>(qKey, (v) => {
        return {
          ...v,
          showPhoneNumber: variables.checked
        } as IUserWithPhoneAndSocial;
      });
    }
  });

  const onChange = useCallback(async (checked: boolean) => {
    await updateShowPhoneNumber.mutateAsync({
      checked: checked,
      userUid: user!.id
    });
  }, []);

  return (
    <>
      <ListItem
        size="$5"
        hoverTheme
        pressTheme
        alignItems="center"
        onPress={() => null}
      >
        <Text>Visa mitt telefonnummer</Text>
        <Switch
          checked={query.data?.showPhoneNumber}
          onCheckedChange={onChange}
        >
          <Switch.Thumb />
        </Switch>
      </ListItem>
    </>
  );
}
