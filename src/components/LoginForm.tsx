// components/LoginForm.tsx or components/LoginForm.js
'use client'; // This component needs to run on the client

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/config/firebase'; // Import auth instance
import { Input } from 'antd';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // For error messages

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setError(null); // Clear previous errors

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Success! The onAuthStateChanged listener in AuthContext will update state.
      // You might redirect the user here or show a success message.
      console.log("User logged in successfully!");
    } catch (err: any) {
      // Handle errors
      console.error("Login Error:", err);
      setError(err.message); // Display the error message
    }
  };

  return (
    <form className='max-w-[500px] m-auto' onSubmit={handleLogin}>
      <h2 className='text-2xl font-semibold my-2'>Login</h2>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        className='mb-2'
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default LoginForm;
