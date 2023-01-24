import { Request, Response } from 'express';
import {
  Register_UserMutation,
  Register_UserMutationVariables,
} from '../../generated/graphql';
import { REGISTER_USER } from '../../queries/auth.js';
import bcrypt from 'bcrypt';
import { client } from '../../utils/apollo.js';
import pkg from '@apollo/client';
const { ApolloError } = pkg;

export async function registerUser(req: Request, res: Response) {
  const params: Register_UserMutationVariables = req.body.input;

  const hashedPassword = bcrypt.hashSync(params.password || '', 10);
  try {
    const { data, errors } = await client.mutate<
      Register_UserMutation,
      Register_UserMutationVariables
    >({
      mutation: REGISTER_USER,
      variables: {
        ...params,
        password: hashedPassword,
      },
    });
    if (errors) return res.status(400).json(errors[0]);
    return res.json({ ...data?.insert_users_one });
  } catch (error) {
    if (error instanceof ApolloError) {
      return res.status(422).json({ message: error?.message });
    }
    return res.status(400).json({ message: error?.message });
  }
}
