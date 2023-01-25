import express from 'express';
import {
  signInWithGoogle,
  registerUser,
  verifyGoogleToken,
  sendSMS,
  verifySMS,
} from '../controllers/auth/index.js';
const router = express.Router();

router.route('/register').post(registerUser);

router.route('/signInWithGoogle').post(verifyGoogleToken, signInWithGoogle);
router.route('/sendSMS').post(sendSMS);
router.route('/verifySMS').post(verifySMS);

export default router;
