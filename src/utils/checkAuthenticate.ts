// import { TokenPayload } from './../../node_modules/google-auth-library/build/src/auth/loginticket.d';
// import { NextFunction, Response } from 'express';
// import { USER } from '../types/loginTypes.js';
// import { Maybe, UserRequest } from '../types/globalTypes.js';

// export async function checkAuthenticated(
//   req: UserRequest,
//   res: Response,
//   next: NextFunction,
// ) {
//   const token: string = req.cookies['session-token'];

//   try {
//     const user: Maybe<USER> = await verifyGoogleToken(token);
//     req.user = user;
//     next();
//   } catch (error) {
//     console.log({ error });
//     res.status(401).redirect('/login');
//   }
// }
