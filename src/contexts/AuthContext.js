import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem('user');
    if (session) {
      setUser(JSON.parse(session));
    }
    setLoading(false);
  }, []);

  const signUp = async (email, password, username) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([{ email, password, username, role: 'user', admin_websites: [] }])
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select()
        .eq('email', email)
        .eq('password', password)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Invalid email or password');

      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    signUp,
    signIn,
    signOut,
    user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}