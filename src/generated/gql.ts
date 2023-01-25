/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  mutation REGISTER_USER(\n    $email: String = \"\"\n    $name: String = \"\"\n    $password: String = \"\"\n    $verified: Boolean = false\n  ) {\n    insert_users_one(\n      object: {\n        email: $email\n        name: $name\n        password: $password\n        verified: $verified\n      }\n    ) {\n      id\n      name\n    }\n  }\n": types.Register_UserDocument,
    "\n  query GET_USER_BY_EMAIL($email: String = \"\") {\n    users(where: { email: { _eq: $email } }) {\n      id\n    }\n  }\n": types.Get_User_By_EmailDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation REGISTER_USER(\n    $email: String = \"\"\n    $name: String = \"\"\n    $password: String = \"\"\n    $verified: Boolean = false\n  ) {\n    insert_users_one(\n      object: {\n        email: $email\n        name: $name\n        password: $password\n        verified: $verified\n      }\n    ) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation REGISTER_USER(\n    $email: String = \"\"\n    $name: String = \"\"\n    $password: String = \"\"\n    $verified: Boolean = false\n  ) {\n    insert_users_one(\n      object: {\n        email: $email\n        name: $name\n        password: $password\n        verified: $verified\n      }\n    ) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GET_USER_BY_EMAIL($email: String = \"\") {\n    users(where: { email: { _eq: $email } }) {\n      id\n    }\n  }\n"): (typeof documents)["\n  query GET_USER_BY_EMAIL($email: String = \"\") {\n    users(where: { email: { _eq: $email } }) {\n      id\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;