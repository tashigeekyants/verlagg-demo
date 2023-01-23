import { TokenPayload } from './../../node_modules/google-auth-library/build/src/auth/loginticket.d';
import { NextFunction, Request, Response } from 'express';
import googleClient from '../config/googleClient.js';
import { USER } from '../types/loginTypes.js';
import { Maybe, UserRequest } from '../types/globalTypes.js';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

export async function verifyGoogleToken(token: string) {
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

    // DB logic
    // jwt token

    console.log({ payload });
    return user;
  } catch (error) {
    console.log({ error });
    return null;
  }
}

export async function checkAuthenticated(
  req: UserRequest,
  res: Response,
  next: NextFunction,
) {
  const token: string = req.cookies['session-token'];

  try {
    const user: Maybe<USER> = await verifyGoogleToken(token);
    req.user = user;
    next();
  } catch (error) {
    console.log({ error });
    res.status(401).redirect('/login');
  }
}
