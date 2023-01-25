import pkg from '@apollo/client';
const { gql } = pkg;

export const GET_USER_BY_PHONE_NUMBER = gql`
  query GET_USER_BY_PHONE_NUMBER($phone_number: String = "") {
    users(where: { phone_number: { _eq: $phone_number } }) {
      id
    }
  }
`;
