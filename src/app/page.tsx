'use client'; 

import { useAuth } from '@/providers/AuthProvider'; 
import LoginForm from '@/components/LoginForm'; 
import RegisterForm from '@/components/RegisterForm'; 
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase'; 
import LoadingPage from './loading';

const HomePage = () => {
  const { user, loading } = useAuth(); 
  console.log("User:", user); // Log the user object

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out.");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (loading) {
    return <LoadingPage />; // Show loading state while checking auth
  }

  return (
    <div>
      <h1>My Awesome App</h1>

      {user ? (
        // If user is logged in, show this content
        <div>
          <p>Welcome, {user?.email}!</p>
          <button onClick={handleSignOut}>Sign Out</button>
          {/* Add components for communication/RTDB here */}
          {/* Now you know who the user is (user.uid)! */}
        </div>
      ) : (
        // If no user is logged in, show login/register forms
        <div>
          <p>Please log in or register.</p>
          <LoginForm />
          <p>Or</p>
          <RegisterForm />
        </div>
      )}
    </div>
  );
};

export default HomePage;
