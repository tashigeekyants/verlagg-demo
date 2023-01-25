import { TokenPayload } from 'google-auth-library';
import { NextFunction, Request, Response } from 'express';
import googleClient from '../../../config/googleClient.js';
import { USER } from '../../../types/loginTypes.js';
import { Mutation_RootSignInWithGoogleArgs } from '../../../generated/graphql.js';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

export async function verifyGoogleToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const params: Mutation_RootSignInWithGoogleArgs = req.body.input;

  const user: USER = {};

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: params.id_token,
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
