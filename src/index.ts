import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { execute } from './utils/execute.js';
import { HASURA_OPERATION } from './queries/register.js';
import { verifyGoogleToken } from './utils/checkAuthenticate.js';

import { registerArgs } from './types/registerTypes';

// configure dotenv
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// routes
app.get('/', function (req: Request, res: Response) {
  res.send('server is running');
});

app.post('/register', async (req: Request, res: Response) => {
  const params: registerArgs = req.body.input;

  const hashedPassword = bcrypt.hashSync(params.password || '', 10);

  const { data, errors }: any = await execute(HASURA_OPERATION, {
    ...params,
    password: hashedPassword,
  });
  if (errors) return res.status(400).json(errors[0]);
  console.log({ data, errors });
  return res.json({ ...data.insert_users_one });
});

app.post('/signInWithGoogle', async (req: Request, res: Response) => {
  const token: string = req.body.token;
  try {
    const user = await verifyGoogleToken(token);
    if (user === null) {
      res.status(401).json({ message: 'Unauthorized user' });
      return;
    }
    res.cookie('session-token', token);
    res.status(201).json({ user, message: 'Login success' });
  } catch (error) {
    console.error({ error });
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`server is running at port : ${PORT}`);
});
