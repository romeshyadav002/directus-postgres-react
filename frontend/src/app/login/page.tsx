// app/login/page.tsx
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { loginOrRegister } from '../../../lib/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const token = await loginOrRegister(email, password);
      console.log('setting localstorage', token);
      localStorage.setItem('token', token as string);
      router.push('/');
    } catch (err) {
      alert('Failed to login/signup');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Login / Signup</h2>
      <input
        type="email"
        placeholder="Email"
        className="border mb-2 w-full p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        // type="password"
        placeholder="Password"
        className="border mb-2 w-full p-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
}
