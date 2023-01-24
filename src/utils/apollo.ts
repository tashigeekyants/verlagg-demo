import pkg from '@apollo/client';
import fetch from 'cross-fetch';

const { ApolloClient, HttpLink, InMemoryCache } = pkg;

export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:8080/v1/graphql',
    headers: {
      'x-hasura-admin-secret':
        'klBiEH1IdfXaXYkHmoMThJKqcgzyogwgzBKZAVBP5fucay3mGshTIWAERmAcq7qZ',
    },
    fetch,
  }),
  cache: new InMemoryCache(),
});
