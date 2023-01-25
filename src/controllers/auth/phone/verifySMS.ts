import { Request, Response } from 'express';
import { Mutation_RootVerifySmsArgs } from '../../../generated/graphql';
import { getUserByPhoneNumber } from '../../../utils/db/getUserByPhoneNumber.js';
import { saveUser } from '../../../utils/db/saveUser.js';
import { generateJWT } from '../../../utils/jwt.js';
import twilioClient from '../../../utils/twilioClient.js';

export async function verifySMS(req: Request, res: Response) {
  try {
    const params: Mutation_RootVerifySmsArgs = req.body.input;
    /** Verify Code */
    const result = await twilioClient.verifySMS(params.to, params.code);
    if (!result.success) throw new Error(result.message);

    /** Get user by phone number */
    const getUserByPhoneNumberRes = await getUserByPhoneNumber(params.to);
    if (!getUserByPhoneNumberRes.success) {
      throw new Error(getUserByPhoneNumberRes.message);
    }

    /** Check whether user is already registered or not */
    const isUserRegistered = getUserByPhoneNumberRes.data?.users.length !== 0;
    let userId;

    /** Save User is DB if it is not registered */
    if (!isUserRegistered) {
      const saveUserRes = await saveUser({
        phone_number: params.to,
        verified: true,
      });
      if (!saveUserRes.success) {
        throw new Error(saveUserRes.message);
      }
      userId = saveUserRes.data?.insert_users_one?.id;
    }

    userId = isUserRegistered
      ? getUserByPhoneNumberRes?.data?.users[0].id
      : userId;

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
