import fetch from 'node-fetch';
import { registerArgs } from '../types/registerTypes';

export const execute = async (query: string, variables: registerArgs) => {
  const fetchResponse = await fetch('http://localhost:8080/v1/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables,
    }),
    headers: {
      'x-hasura-admin-secret':
        'klBiEH1IdfXaXYkHmoMThJKqcgzyogwgzBKZAVBP5fucay3mGshTIWAERmAcq7qZ',
    },
  });
  const data = await fetchResponse.json();
  console.log('DEBUG: ', data);
  return data;
};

export default execute;
