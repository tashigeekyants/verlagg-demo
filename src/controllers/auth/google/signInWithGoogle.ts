import { Request, Response } from 'express';
import {
  Get_User_By_EmailQuery,
  Get_User_By_EmailQueryVariables,
  Register_UserMutation,
  Register_UserMutationVariables,
} from '../../../generated/graphql';
import { GET_USER_BY_EMAIL, REGISTER_USER } from '../../../queries/auth.js';
import { client } from '../../../utils/apollo.js';
import { generateJWT } from '../../../utils/jwt.js';

export async function signInWithGoogle(req: Request, res: Response) {
  try {
    /** Get user from DB */
    const { data, errors } = await client.query<
      Get_User_By_EmailQuery,
      Get_User_By_EmailQueryVariables
    >({
      query: GET_USER_BY_EMAIL,
      variables: {
        email: req?.user?.email || '',
      },
    });
    if (errors) return res.status(400).json(errors[0]);
    let userId;
    const isUserRegister = data.users.length !== 0;

    /** Check whether user is already registered or not */
    if (!isUserRegister) {
      /** Register user */
      const { data, errors } = await client.mutate<
        Register_UserMutation,
        Register_UserMutationVariables
      >({
        mutation: REGISTER_USER,
        variables: {
          email: req.user?.email,
          name: req.user?.name,
          password: null,
          verified: true,
        },
      });

      if (errors) return res.status(400).json(errors[0]);

      userId = data?.insert_users_one?.id;
    }

    userId = isUserRegister ? data.users[0].id : userId;

    /** Generate JWT token */
    const token = generateJWT({
      defaultRole: 'user',
      allowedRoles: ['user'],
      otherClaims: {
        'X-Hasura-User-Id': userId,
      },
    });
    console.log({ token });
    return res.status(200).json({ token });
  } catch (error) {
    return res.json({ message: error?.message || 'Internal server error' });
  }
}
