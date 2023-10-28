import {
  FetchNotesOutput,
  FetchNotesQuery
} from '@/lib/gql/queries/notes.query';
import { useQuery } from '@apollo/client';
import { Redirect } from 'expo-router';
import { Spinner, Text } from 'tamagui';

export default function Home() {
  const gqlQuery = useQuery<FetchNotesOutput>(FetchNotesQuery);

  if (gqlQuery.loading) {
    return <Spinner size="large" />;
  }

  if (gqlQuery.data?.fetchNotes.length < 1) {
    return <Text>No new note</Text>;
  }
  // TODO: REMOVE
  return <Redirect href="/tag/232" />;

  // return (
  //   <>
  //     {gqlQuery.data.fetchNotes.map((note) => (
  //       <Text key={note.id}>{note.content}</Text>
  //     ))}
  //   </>
  // );
}
