import { Maybe } from "./globalTypes.js"

export type registerResponse = {
  id: string
  name: string
}

export type Mutation = {
  register?: Maybe<registerResponse>
}

export type registerArgs = {
  email?: Maybe<string>
  name?: Maybe<string>
  password?: Maybe<string>
}