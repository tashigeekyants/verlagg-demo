import { Request, Response } from 'express';
import { Mutation_RootVerifyEmailArgs } from '../../../generated/graphql';
import { getUserByEmail } from '../../../utils/db/getUserByEmail.js';
import { saveUser } from '../../../utils/db/saveUser.js';
import { generateJWT } from '../../../utils/jwt.js';
import twilioClient from '../../../utils/twilioClient.js';

export async function verifyEmail(req: Request, res: Response) {
  try {
    const params: Mutation_RootVerifyEmailArgs = req.body.input;
    /** Verify Code */
    const result = await twilioClient.verifyEmail(params.to, params.code);
    if (!result.success) throw new Error(result.message);

    /** Get user by email number */
    const getUserByEmailRes = await getUserByEmail(params.to);
    if (!getUserByEmailRes.success) {
      throw new Error(getUserByEmailRes.message);
    }

    /** Check whether user is already registered or not */
    const isUserRegistered = getUserByEmailRes.data?.users.length !== 0;
    let userId;

    /** Save User in DB if it is not registered */
    if (!isUserRegistered) {
      const saveUserRes = await saveUser({
        email: params.to,
        verified: true,
      });
      if (!saveUserRes.success) {
        throw new Error(saveUserRes.message);
      }
      userId = saveUserRes.data?.insert_users_one?.id;
    }

    userId = isUserRegistered ? getUserByEmailRes?.data?.users[0].id : userId;

    /** Generate JWT token */
    const token = generateJWT({
      defaultRole: 'user',
      allowedRoles: ['user'],
      otherClaims: {
        'X-Hasura-User-Id': userId,
      },
    });
    res.status(200).json({ token, message: result.message });
  } catch (error) {
    res
      .status(400)
      .json({ message: error?.message || 'Internal server error' });
  }
}
