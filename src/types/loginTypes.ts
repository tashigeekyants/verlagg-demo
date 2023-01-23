import { Maybe } from "./globalTypes.js";

export type USER = {
  email?: string;
  name?: string;
  picture?: Maybe<string>;
};
