import { Collections } from '@lib/firebase/models';
import { INote } from '@lib/firebase/models/note.model';
import useCollection from '@lib/hooks/useCollection';
import { useEffect, useState } from 'react';
import { Text } from 'tamagui';

export default function Home() {
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
    <>
      {data.map((note) => (
        <Text key={note.title}>{note.content}</Text>
      ))}
    </>
  );
}
