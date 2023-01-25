import { registerUser } from './email/registerUser.js';
import { signInWithGoogle } from './google/signInWithGoogle.js';
import { verifyGoogleToken } from './google/verifyGoogleToken.js';
import { sendSMS } from './phone/sendSMS.js';
import { verifySMS } from './phone/verifySMS.js';

export {
  registerUser,
  signInWithGoogle,
  verifyGoogleToken,
  sendSMS,
  verifySMS,
};
