// context/AuthContext.tsx or context/AuthContext.js
"use client"; // This context provider needs to run on the client

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { auth } from "@/config/firebase"; // Import the auth instance
import { User } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean; // Optional: true while initially checking auth state
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start loading

  useEffect(() => {
    // This listener is key! It fires when auth state changes
    const unsubscribe = auth.onAuthStateChanged((firebaseUser: any) => {
      setUser(firebaseUser); // Set the user state
      setLoading(false); // Auth state checked, stop loading
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
      {loading && <div> Loading...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
