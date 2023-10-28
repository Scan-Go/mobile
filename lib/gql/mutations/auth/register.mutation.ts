import { IUser } from '@/lib/models/auth.model';
import { gql } from '@apollo/client';

export const RegisterMutation = gql`
  mutation REGISTER_MUTATION($email: String!, $password: String!) {
    register(data: { email: $email, password: $password }) {
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

export type RegisterMutationInput = {
  email: string;
  password: string;
};

export type RegisterMutationOutput = {
  register: {
    access_token: string;
    refresh_token: string;
    user: IUser;
  };
};
