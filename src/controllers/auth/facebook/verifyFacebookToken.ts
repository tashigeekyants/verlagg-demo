/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { Mutation_RootSignInWithFacebookArgs } from '../../../generated/graphql.js';
import { USER } from '../../../types/loginTypes.js';

export async function verifyFacebookToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const params: Mutation_RootSignInWithFacebookArgs = req.body.input;

  const user: USER = {};

  try {
    let reqHeaders: any;
    const fetchResponse = await fetch(
      `https://graph.facebook.com/debug_token?input_token=${params.id_token}&access_token=${params.id_token}`,
      {
        method: 'GET',
        headers:
          {
            ...reqHeaders,
            'x-hasura-access-key': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
          } || {},
      },
    );
    const response: any = await fetchResponse.json();
    if (response.error) {
      res.status(403).json({ message: response.error.message });
    } else {
      const userData: any = await getUserData(params.id_token, response.data);
      user.name = userData?.name;
      user.email = userData?.email;
      user.picture = userData?.url;
      req.user = user;
      next();
    }

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function getUserData(accessToken: string, tokenData: any) {
  let reqHeaders: any;
  const fetchResponse = await fetch(
    `https://graph.facebook.com/${tokenData.user_id}?fields=id,name,email&access_token=${accessToken}`,
    {
      method: 'GET',
      headers:
        {
          ...reqHeaders,
          'x-hasura-access-key': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
        } || {},
    },
  );
  const response = await fetchResponse.json();
  return response;
}
