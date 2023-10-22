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
  password: String;
};

export type LoginMutationOutput = {
  access_token: string;
  refresh_token: string;
  user: User;
};

export type User = {
  id: number;
  email: string;
  tel: string;
  last_name: string;
  name: string;
};
