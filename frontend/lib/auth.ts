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

// import { directusApi, setToken } from './directus';

// export async function loginOrRegister(email: string, password: string) {
//   try {
//     // Try login
//     const response = await fetch('http://localhost:8055/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       setToken(data.data.access_token);
//       return data.data.access_token;
//     }

//     // Login failed, now login as admin to register
//     const adminLogin = await fetch('http://localhost:8055/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
//     });

//     const adminData = await adminLogin.json();
//     const adminToken = adminData.data.access_token;

//     // Create user
//     await fetch('http://localhost:8055/items/users', {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${adminToken}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email,
//         password,
//         role: 'user',
//         status: 'active',
//       }),
//     });

//     // Login again
//     const newLogin = await fetch('http://localhost:8055/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });

//     const loginData = await newLogin.json();
//     setToken(loginData.data.access_token);
//     return loginData.data.access_token;
//   } catch (err) {
//     console.error('Auth error:', err);
//     throw err;
//   }
// }
