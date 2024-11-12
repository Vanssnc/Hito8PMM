import React from 'react'
import './Login.css'
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { Navigate } from 'react-router-dom';

export default function Login1() {
  const { token, login, error } = useContext(UserContext);
  
  if (token) {
    return <Navigate to="/" replace />;
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (email === '' || password === '') {
      alert("Todos los campos deben ser rellenados");
      return;
    }

    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    // Llamar al método login del UserContext
    try {
      await login({ email, password });
    } catch (err) {
      alert(err.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className='form'>
      <h2>Login</h2>

      <div className='formularios'>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <br />
            <input
              onChange={handleEmailChange}
              type="email"
              value={email}
              required
            />
          </label>

          <label>
            Contraseña:
            <br />
            <input
              onChange={handlePasswordChange}
              type="password"
              value={password}
              required
            />
          </label>

          {error && <p style={{ color: "red" }}>{error}</p>} {}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
