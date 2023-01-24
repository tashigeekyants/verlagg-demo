import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.js';

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

app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`server is running at port : ${PORT}`);
});
