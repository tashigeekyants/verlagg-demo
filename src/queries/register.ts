import pkg from '@apollo/client';
const { gql } = pkg;

export const REGISTER_USER = gql`
  mutation REGISTER_USER(
    $email: String = ""
    $name: String = ""
    $password: String = ""
    $verified: Boolean = false
    $phone_number: String = ""
    $image_url: String = ""
  ) {
    insert_users_one(
      object: {
        email: $email
        name: $name
        password: $password
        verified: $verified
        phone_number: $phone_number
        image_url: $image_url
      }
    ) {
      id
      name
    }
  }
`;
