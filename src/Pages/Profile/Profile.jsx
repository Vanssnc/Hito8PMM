import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

export default function Profile() {
  const { email, logout } = useContext(UserContext); 


  return (
    <div className='User'>
      <h2>Perfil del Usuario</h2>
      {email ? (
        <>
          <p>Email: {email}</p>
          <button onClick={() => alert('Cerrar sesión')}>
        Cerrar sesión
      </button>
        </>
      ) : (
        <p>No estás autenticado</p> 
      )}
    </div>
  );
}
