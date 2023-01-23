export const HASURA_OPERATION = `mutation MyMutation($email: String = "", $name: String = "", $password: String = "") {
    insert_users_one(object: {email: $email, name: $name, password: $password}) {
      id
      name
    }
}`;
