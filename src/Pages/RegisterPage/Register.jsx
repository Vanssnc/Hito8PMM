import React, { useState, useContext } from 'react';
import './register.css';
import { UserContext } from '../../context/UserContext';

export default function Register() {
  const { register, loading, error } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

 
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePassword2Change = (e) => setPassword2(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');


    if (email === '' || password === '' || password2 === '') {
      setErrorMessage('Todos los campos deben ser rellenados');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (password !== password2) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }


    try {
      await register({ email, password });
      alert('Registro exitoso');
    } catch (err) {
      setErrorMessage(err.message || 'Error al registrarse');
    }
  };

  return (
    <div className="form">
      <h2>Register</h2>

      <div className="formularios">
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

          <label>
            Confirmar contraseña:
            <br />
            <input
              onChange={handlePassword2Change}
              type="password"
              value={password2}
              required
            />
          </label>

          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {}
          <button type="submit" disabled={loading}>
            {loading ? 'Cargando...' : 'Registrar'}
          </button>
        </form>
      </div>
    </div>
  );
}