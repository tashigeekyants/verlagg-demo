import express from 'express';
import { sendEmail } from '../controllers/auth/email/sendEmail.js';
import { verifyEmail } from '../controllers/auth/email/verifyEmail.js';
import {
  signInWithGoogle,
  registerUser,
  verifyGoogleToken,
  sendSMS,
  verifySMS,
  verifyFacebookToken,
  signInFacebook,
} from '../controllers/auth/index.js';
const router = express.Router();

router.route('/register').post(registerUser);

// sign in with google account
router.route('/signInWithGoogle').post(verifyGoogleToken, signInWithGoogle);

// sign in with phone sms
router.route('/sendSMS').post(sendSMS);
router.route('/verifySMS').post(verifySMS);

// sign in with facebook account
router.route('/signInWithFacebook').post(verifyFacebookToken, signInFacebook);

// sign in with email verification
router.route('/sendEmail').post(sendEmail);
router.route('/verifyEmail').post(verifyEmail);

export default router;
