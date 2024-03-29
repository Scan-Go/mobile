import AppLoading from '@lib/components/app_loading';
import Screen from '@lib/components/screen';
import { QueryKeys } from '@lib/models/query_keys.model';
import { IUser } from '@lib/models/user.model';
import ProfilePictureSection from '@lib/modules/profile-settings/ProfilePictureSection';
import ProfileSection from '@lib/modules/profile-settings/ProfileSection';
import { profileService } from '@lib/services/profile.service';
import { useAuthStore } from '@lib/store/auth.store';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ScrollView } from 'tamagui';

export default function ProfileSettingsPage() {
  const user = useAuthStore((state) => state.user);
  const profileQuery = useSuspenseQuery<IUser>({
    queryKey: [QueryKeys.ProfileWithRelations, user?.id],
    queryFn: () => profileService.fetchProfile(user!.id),
    networkMode: 'offlineFirst'
  });

  return (
    <Suspense fallback={<AppLoading />}>
      <Screen>
        <ScrollView contentContainerStyle={{ gap: '$5' }}>
          <ProfilePictureSection user={profileQuery.data} />
          <ProfileSection user={profileQuery.data} />
        </ScrollView>
      </Screen>
    </Suspense>
  );
}
