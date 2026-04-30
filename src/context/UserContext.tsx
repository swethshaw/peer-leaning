import React, { createContext, useContext, useState, useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

import type { User } from '../types';

interface UserContextType {
  user: User | null;
  isAuthLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      const storedUserId = localStorage.getItem('quiz_user_id');
      if (storedUserId) {
        try {
          const res = await fetch(`${API_URL}/api/users/${storedUserId}`);
          const data = await res.json();
          if (data.success) {
            setUser(data.data);
          } else {
            localStorage.removeItem('quiz_user_id');
          }
        } catch (err) {
          console.error("Failed to restore session");
        }
      }
      setIsAuthLoading(false);
    };
    restoreSession();
  }, []);

  const login = (userData: any) => {
    setUser(userData);
    localStorage.setItem('quiz_user_id', userData._id);
    if (userData.token) {
      localStorage.setItem('lms_token', userData.token);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quiz_user_id');
    localStorage.removeItem('lms_token');
  };

  return (
    <UserContext.Provider value={{ user, isAuthLoading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) throw new Error('useUser must be used within UserProvider');
  return context;
};