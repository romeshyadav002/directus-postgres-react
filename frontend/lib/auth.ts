const ADMIN_EMAIL = 'raojiromesh002@gmail.com';
const ADMIN_PASSWORD = 'hitesh@1991';

import directus from './directus';

export async function loginOrRegister(email: string, password: string) {
  try {
    // Try logging in
    const { access_token } = await directus.login(email, password);
    return access_token;
  } catch {
    // Login failed, try to create the user using admin credentials
    try {
      // Login as admin
      const { access_token: adminAccessToken } = await directus.login(
        ADMIN_EMAIL,
        ADMIN_PASSWORD,
      );
      console.log({ adminAccessToken });

      const response = await fetch('http://0.0.0.0:8055/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminAccessToken}`,
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const userCreationData = await response.json();
      console.log({ userCreationData });

      await directus.logout();
      const { access_token } = await directus.login(email, password);
      return access_token;
    } catch (err) {
      console.error('Error during signup and login:', err);
      throw err;
    }
  }
}
