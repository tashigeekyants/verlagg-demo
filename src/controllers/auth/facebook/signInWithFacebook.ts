import { Request, Response } from 'express';
import { getUserByEmail } from '../../../utils/db/getUserByEmail.js';
import { saveUser } from '../../../utils/db/saveUser.js';
import { generateJWT } from '../../../utils/jwt.js';

export async function signInFacebook(req: Request, res: Response) {
  try {
    /** Get user from DB */
    const { success, data, message } = await getUserByEmail(
      req.user?.email || '',
    );

    if (!success) {
      throw new Error(message);
    }

    let userId;
    const isUserRegistered = data?.users.length !== 0;
    /** Check whether user is already registered or not */
    if (!isUserRegistered) {
      /** Save user in DB */
      const { data, success, message } = await saveUser({
        name: req.user?.name,
        email: req.user?.email,
        image_url: req.user?.picture,
        verified: true,
      });

      if (!success) {
        throw new Error(message);
      }

      userId = data?.insert_users_one?.id;
    }

    userId = isUserRegistered ? data?.users[0].id : userId;

    /** Generate JWT token */
    const token = generateJWT({
      defaultRole: 'user',
      allowedRoles: ['user'],
      otherClaims: {
        'X-Hasura-User-Id': userId,
      },
    });

    return res.status(200).json({ token, message: 'Login success' });
  } catch (error) {
    return res.json({ message: error?.message || 'Internal server error' });
  }
}
