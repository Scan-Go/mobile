import { IUser } from '@/lib/models/auth.model';
import { gql } from '@apollo/client';

export const FetchNotesQuery = gql`
  query fetchNotes {
    fetchNotes {
      content
      id
      expires
      user {
        id
      }
    }
  }
`;

export type FetchNotesOutput = {
  fetchNotes: {
    content: string;
    id: number;
    expires: Date;
    user: Pick<IUser, 'id'>;
  }[];
};
