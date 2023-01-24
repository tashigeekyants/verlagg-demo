import { TokenPayload } from 'google-auth-library';
import { NextFunction, Request, Response } from 'express';
import googleClient from '../../config/googleClient.js';
import { USER } from '../../types/loginTypes.js';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

export async function verifyGoogleToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers?.authorization?.split(' ')[1] || '';
  const user: USER = {};

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload: TokenPayload | undefined = ticket.getPayload();
    user.name = payload?.name;
    user.email = payload?.email;
    user.picture = payload?.picture;
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
