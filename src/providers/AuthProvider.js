// context/AuthContext.tsx or context/AuthContext.js
'use client'; // This context provider needs to run on the client

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from 'firebase/auth'; // Import the User type
import { auth } from '@/config/firebase'; // Import the auth instance
import LoadingPage from '@/app/loading';

// interface AuthContextType {
//   user: User | null;
//   loading: boolean; // Optional: true while initially checking auth state
// }

const AuthContext = createContext({ user: null, loading: true });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start loading

  useEffect(() => {
    // This listener is key! It fires when auth state changes
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser); // Set the user state
      setLoading(false); // Auth state checked, stop loading
    });

    return () => unsubscribe();
  }, []); 

  return (
    <AuthContext.Provider value={{ user, loading }}>
    
      {!loading && children}
      {loading && <LoadingPage />} 
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
