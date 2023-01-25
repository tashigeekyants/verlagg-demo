import {
  Register_UserMutation,
  Register_UserMutationVariables,
} from '../../generated/graphql';
import { client } from '../apollo.js';
import { REGISTER_USER } from '../../queries/register.js';
import { DBResponse } from '../../types/globalTypes.js';

async function saveUser(
  variables: Register_UserMutationVariables,
): Promise<DBResponse<Register_UserMutation>> {
  try {
    const { data, errors } = await client.mutate<
      Register_UserMutation,
      Register_UserMutationVariables
    >({
      mutation: REGISTER_USER,
      variables,
    });

    if (errors) throw new Error(errors[0].message);

    return { success: true, data, message: 'User saved successfully' };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error?.message || 'Internal server error',
    };
  }
}

export { saveUser };
