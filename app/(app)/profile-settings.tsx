import Screen from '@lib/components/screen';
import { QueryKeys } from '@lib/models/query_keys.model';
import { IUser } from '@lib/models/user.model';
import ProfilePictureSection from '@lib/modules/profile-settings/ProfilePictureSection';
import { profileService } from '@lib/services/profile.service';
import { useAuthStore } from '@lib/store/auth.store';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { Spinner } from 'tamagui';

export default function ProfileSettingsPage() {
  const user = useAuthStore((state) => state.user);
  const profileQuery = useSuspenseQuery<IUser>({
    queryKey: [QueryKeys.ProfileWithRelations, user?.id],
    queryFn: () => profileService.fetchProfile(user!.id)
  });

  return (
    <Suspense fallback={<Spinner />}>
      <Screen>
        <ProfilePictureSection user={profileQuery.data} />
      </Screen>
    </Suspense>
  );
}
