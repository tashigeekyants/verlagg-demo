import { Request } from 'express';
import { USER } from './loginTypes.js';

export type Maybe<T> = T | null;
export interface UserRequest extends Request {
  user: Maybe<USER>;
}
