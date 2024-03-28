import ProfileView from '@lib/components/profile_view';
import Screen from '@lib/components/screen';
import { QueryKeys } from '@lib/models/query_keys.model';
import { profileService } from '@lib/services/profile.service';
import { useAuthStore } from '@lib/store/auth.store';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigation } from 'expo-router';
import { Suspense, useLayoutEffect } from 'react';
import { Spinner } from 'tamagui';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const user = useAuthStore((state) => state.user);

  const query = useSuspenseQuery({
    queryKey: [QueryKeys.ProfileWithRelations, user!.id],
    queryFn: () => profileService.fetchProfile(user!.id)
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${query.data.firstName} ${query.data.lastName}`
    });
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      <Screen>
        <ProfileView
          profileData={query.data}
          bioText={'Biografi'}
          bioContent={query.data.bio ?? 'Inget'}
          socialData={query.data.social_media_accounts}
          phoneData={query.data.phone_numbers}
        />
      </Screen>
    </Suspense>
  );
}
