// lib/directus.ts
import { createDirectus, rest, authentication } from '@directus/sdk';

const directus = createDirectus('http://localhost:8055')
  .with(authentication('json'))
  .with(rest());

export default directus;

import { Configuration, ItemsArticlesApi } from '../directus-api-client'; // Adjust import based on actual file structure

let accessToken = null;

export const setToken = (token) => {
  accessToken = token;
};

const config = new Configuration({
  basePath: 'http://localhost:8055',
  accessToken: () => accessToken || '',
});

// export const authApi = new AuthApi(config);
export const itemsApi = new ItemsArticlesApi(config);
