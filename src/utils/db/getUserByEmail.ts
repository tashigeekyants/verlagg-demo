import { GET_USER_BY_EMAIL } from '../../queries/getUserByEmail.js';
import { Get_User_By_EmailQueryVariables } from './../../generated/graphql';
import { Get_User_By_EmailQuery } from '../../generated/graphql';
import { client } from '../apollo.js';
import { DBResponse } from '../../types/globalTypes.js';

async function getUserByEmail(
  email: string,
): Promise<DBResponse<Get_User_By_EmailQuery>> {
  try {
    const { data, errors } = await client.query<
      Get_User_By_EmailQuery,
      Get_User_By_EmailQueryVariables
    >({
      query: GET_USER_BY_EMAIL,
      variables: {
        email,
      },
    });
    if (errors) throw new Error(errors[0].message);

    return { success: true, data, message: 'Fetched user successfully' };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error?.message || 'Internal server error',
    };
  }
}

export { getUserByEmail };
