import { Request } from 'express';
import { USER } from './loginTypes.js';

export type Maybe<T> = T | null;
declare module 'express-serve-static-core' {
  export interface Request {
    user: Maybe<USER>;
  }
}
