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

  const update = (permission) => {
    setPermission(permission);
  };

  return (
    <AuthContext.Provider value={{ permission, update }}>
      {children}
    </AuthContext.Provider>
  );
};