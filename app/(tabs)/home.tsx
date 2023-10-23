import { FetchNotesOutput, FetchNotesQuery } from "@/lib/gql/queries/notes.query";
import { useQuery } from "@apollo/client";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { Spinner, Text } from "tamagui";

export function isRefreshNeeded(token?: string | null) {
  if (!token) {
    return { valid: false, needRefresh: true };
  }

  const decoded = jwt_decode<JwtPayload>(token);

  if (!decoded) {
    return { valid: false, needRefresh: true };
  }
  if (decoded.exp && Date.now() >= decoded.exp * 1000) {
    return { valid: false, needRefresh: true };
  }
  return { valid: true, needRefresh: false };
}


export default function Home() {
  const gqlQuery = useQuery<FetchNotesOutput>(FetchNotesQuery)

  if (gqlQuery.loading) {
    return <Spinner size="large"/>
  }

  if (gqlQuery.data.fetchNotes.length < 1) {
    return <Text>No new note</Text>
  }

  return <>
    {gqlQuery.data.fetchNotes.map(note => <Text>{note.content}</Text>)}
  </>

}
