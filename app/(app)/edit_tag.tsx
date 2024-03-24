import Screen from '@lib/components/screen';
import EditTagModule from '@lib/modules/tags/edit_tag.module';
import { useLocalSearchParams } from 'expo-router';

export default function EditTagScreen() {
  const { tagUid } = useLocalSearchParams<{ tagUid: string }>();

  return (
    <Screen>
      <EditTagModule tagUid={tagUid} />
    </Screen>
  );
}
