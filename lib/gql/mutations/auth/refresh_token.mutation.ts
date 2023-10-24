import { gql } from '@apollo/client';

export const RefreshTokenMutation = gql`
  mutation RefreshToken {
    refreshToken {
      access_token
      refresh_token
    }
  }
`;

export type RefreshTokenOutput = {
  refreshToken: {
    accessToken: string;
    refreshToken: string;
  };
};
