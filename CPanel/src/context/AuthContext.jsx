import React, { createContext, useState, useEffect } from 'react';
import axios from '../components/axioscreds';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [permission, setPermission] = useState('');

  useEffect(() => {
    const fetchPermission = async () => {
      try {
        const response = await axios.get('/auth/permission');
        setPermission(response.data.permission);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchPermission();
  }, []);

  return (
    <AuthContext.Provider value={{ permission }}>
      {children}
    </AuthContext.Provider>
  );
};