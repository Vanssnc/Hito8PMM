import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al iniciar sesión');
      }

      const data = await response.json();
      const { token, email } = data;

      if (!token || !email) {
        throw new Error('Respuesta de la API inválida');
      }

      setToken(token);
      setEmail(email);
      console.log('Login exitoso:', email);
    } catch (error) {
      console.error('Error en el login:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Método para hacer register
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al registrarse');
      }

      const data = await response.json();
      const { token, email } = data;

      if (!token || !email) {
        throw new Error('Respuesta de la API inválida');
      }

      setToken(token);
      setEmail(email);
      console.log('Registro exitoso:', email);
    } catch (error) {
      console.error('Error en el registro:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  const logout = () => {
    setToken(null);
    setEmail(null);
    setUserProfile(null);
    console.log('Usuario deslogueado');
  };


  const getProfile = async () => {
    if (!token) {
      setError('Usuario no autenticado');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al obtener el perfil');
      }

      const data = await response.json();
      setUserProfile(data);
      console.log('Perfil del usuario obtenido:', data);
    } catch (error) {
      console.error('Error al obtener el perfil:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ token, email, userProfile, login, register, logout, getProfile, loading, error }}>
      {children}
    </UserContext.Provider>
  );
}