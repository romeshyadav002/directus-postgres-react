// lib/auth.ts
import { login } from '@directus/sdk';
import directus from './directus';

export async function loginOrRegister(email: string, password: string) {
  try {
    // Try login first
    const { access_token } = await directus.login(email, password);
    // .request(login(email, password));
    console.log({ access_token });
    return access_token;
  } catch {
    // If login fails, register then login
    // await directus.
    // request(l(email, password))
    // // .items('users').createOne({ email, password, role: 'user' });
    // const { access_token } = await directus.auth.login({ email, password });
    // return access_token;
  }
}
