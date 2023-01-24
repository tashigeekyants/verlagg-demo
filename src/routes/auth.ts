import express from 'express';
import {
  signInWithGoogle,
  registerUser,
  verifyGoogleToken,
} from '../controllers/auth/index.js';
const router = express.Router();

router.route('/register').post(registerUser);

router.route('/signInWithGoogle').post(verifyGoogleToken, signInWithGoogle);

export default router;
