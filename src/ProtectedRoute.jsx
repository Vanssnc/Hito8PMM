import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './context/UserContext';


export default function ProtectedRoute({ element }) {
  const { token } = useContext(UserContext);


  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return element;
}