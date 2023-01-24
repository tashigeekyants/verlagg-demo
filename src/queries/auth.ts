import pkg from '@apollo/client';

const { gql } = pkg;
export const REGISTER_USER = gql`
  mutation REGISTER_USER(
    $email: String = ""
    $name: String = ""
    $password: String = ""
  ) {
    insert_users_one(
      object: { email: $email, name: $name, password: $password }
    ) {
      id
      name
    }
  }
`;

export const GET_USER_BY_EMAIL = gql`
  query GET_USER_BY_EMAIL($email: String = "") {
    users(where: { email: { _eq: $email } }) {
      id
    }
  }
`;
