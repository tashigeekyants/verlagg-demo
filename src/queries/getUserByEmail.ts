import pkg from '@apollo/client';
const { gql } = pkg;

export const GET_USER_BY_EMAIL = gql`
  query GET_USER_BY_EMAIL($email: String = "") {
    users(where: { email: { _eq: $email } }) {
      id
    }
  }
`;
