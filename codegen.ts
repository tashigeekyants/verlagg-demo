import yml from 'yaml';
import type { CodegenConfig } from '@graphql-codegen/cli';
import { writeFileSync } from 'fs';

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    'http://localhost:8080/v1/graphql': {
      headers: {
        'x-hasura-admin-secret':
          'klBiEH1IdfXaXYkHmoMThJKqcgzyogwgzBKZAVBP5fucay3mGshTIWAERmAcq7qZ',
      },
    },
  },
  documents: ['src/**/*.ts'],
  generates: {
    'src/generated/': {
      preset: 'client-preset',
      plugins: ['typescript'],
    },
  },
};

writeFileSync('codegen.yml', yml.stringify(config));

export default config;
