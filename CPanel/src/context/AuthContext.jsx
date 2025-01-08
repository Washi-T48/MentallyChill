import React, { createContext, useState, useEffect } from 'react';
import axios from '../components/axioscreds';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [permission, setPermission] = useState('');
  const [staff, setStaff] = useState('');

  useEffect(() => {
    const fetchPermission = async () => {
      try {
        const response = await axios.get('/auth/permission');
        setPermission(response.data.permission);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchStaffData = async () => {
      try {
        const response = await axios.get('/auth/check');
        setStaff(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStaffData();
    fetchPermission();
  }, []);

  const update = (userData) => {
    setPermission(userData.permission);
  }

  return (
    <AuthContext.Provider value={{ permission, staff, update }}>
      {children}
    </AuthContext.Provider>
  );
};