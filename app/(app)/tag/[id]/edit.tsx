import Screen from '@lib/components/screen';
import EditTagModule from '@lib/modules/tags/edit_tag.module';
import { useLocalSearchParams } from 'expo-router';

export default function EditTagScreen() {
  const { id } = useLocalSearchParams();

  return (
    <Screen>
      <EditTagModule tagUid={id as string} />
    </Screen>
  );
}
