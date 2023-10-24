import { IUser } from '@/lib/models/auth.model';
import { gql } from '@apollo/client';

export const LoginMutation = gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!) {
    logIn(data: { email: $email, password: $password }) {
      access_token
      refresh_token
      user {
        id
        email
        tel
        last_name
        name
      }
    }
  }
`;

export type LoginMutationInput = {
  email: string;
  password: string;
};

export type LoginMutationOutput = {
  access_token: string;
  refresh_token: string;
  user: IUser;
};
