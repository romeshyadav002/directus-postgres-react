// lib/directus.ts
// import { createDirectus, rest, readItems } from '@directus/sdk';

// export const directus = createDirectus('http://localhost:8055').with(rest());

// lib/directus.ts
import { createDirectus, rest, authentication } from '@directus/sdk';

// const directus = createDirectus('http://localhost:8055').with(rest());
const directus = createDirectus('http://localhost:8055')
  .with(authentication('json'))
  .with(rest());

export default directus;
