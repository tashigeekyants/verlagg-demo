import { USER } from './loginTypes.js';

export type Maybe<T> = T | null;
export type Data<T> = T | null | undefined;
declare module 'express-serve-static-core' {
  export interface Request {
    user: Maybe<USER>;
  }
}
export interface DBResponse<T> {
  success: boolean;
  data: Data<T>;
  message: string;
}
