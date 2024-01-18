import CurrentUserAvatar from '@lib/components/CurrentUserAvatar';
import Screen from '@lib/components/Screen';
import { Collections } from '@lib/firebase/models';
import { INote } from '@lib/firebase/models/note.model';
import useCollection from '@lib/hooks/useCollection';
import useSession from '@lib/hooks/useSession';
import { useEffect, useState } from 'react';
import { H5, SizableText, Tabs, Text } from 'tamagui';

export default function Home() {
  const { currentUser } = useSession();
  const { collection } = useCollection<INote>(Collections.Notes);
  const [data, setData] = useState<INote[]>([]);

  useEffect(() => {
    async function getMarker() {
      const snapshot = await collection.get();

      const s = snapshot.docs.map((doc) => doc.data());

      setData(s);
    }

    getMarker();
  }, []);

  if (data.length < 1) {
    return <Text>No new note</Text>;
  }

  return (
    <Screen>
      <CurrentUserAvatar />

      <Tabs defaultValue="tab1">
        <Tabs.List space>
          <Tabs.Tab value="tab1">
            <SizableText>Tab 1</SizableText>
          </Tabs.Tab>
          <Tabs.Tab value="tab2">
            <SizableText>Tab 2</SizableText>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Content value="tab1">
          <H5>Tab 1</H5>
        </Tabs.Content>
        <Tabs.Content value="tab2">
          <H5>Tab 2</H5>
        </Tabs.Content>
      </Tabs>
    </Screen>
  );
}
