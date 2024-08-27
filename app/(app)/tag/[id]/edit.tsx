import Screen from '@lib/components/screen';
import EditTagModule from '@lib/modules/tags/edit_tag.module';
import { useAuthStore } from '@lib/store/auth.store';
import { Redirect, useLocalSearchParams } from 'expo-router';

export default function EditTagScreen() {
  const { id } = useLocalSearchParams();
  const isSignedIn = useAuthStore();

  if (!isSignedIn) {
    return <Redirect href="/signIn" />;
  }

  return (
    <Screen>
      <EditTagModule tagUid={id as string} />
    </Screen>
  );
}
