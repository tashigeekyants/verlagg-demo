import { GET_USER_BY_PHONE_NUMBER } from '../../queries/getUserByPhoneNumber.js';
import {
  Get_User_By_Phone_NumberQuery,
  Get_User_By_Phone_NumberQueryVariables,
} from './../../generated/graphql';
import { client } from '../apollo.js';
import { DBResponse } from '../../types/globalTypes.js';

async function getUserByPhoneNumber(
  phone_number: string,
): Promise<DBResponse<Get_User_By_Phone_NumberQuery>> {
  try {
    const { data, errors } = await client.query<
      Get_User_By_Phone_NumberQuery,
      Get_User_By_Phone_NumberQueryVariables
    >({
      query: GET_USER_BY_PHONE_NUMBER,
      variables: {
        phone_number,
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

export { getUserByPhoneNumber };
