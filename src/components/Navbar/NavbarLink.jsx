import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CounterContext } from '../../CounterContext';
import { UserContext } from '../../context/UserContext'

export default function NavbarLink() {
  const { token, logout } = useContext(UserContext);
  const { total } = useContext(CounterContext);

    return (
      <div>
        <nav className="navbar bg-body-tertiary">
          <form className="container-fluid justify-content-start">
            <Link to="/" className="btn btn-success me-2">Pizzería Mamma Mia</Link>
            <Link to="/" className="btn btn-sm btn-outline-secondary">Home</Link>
            <Link to="/cart" className="btn btn-sm btn-outline-secondary">Total: ${total}</Link>
  
            {token ? (
              <>
                <Link to="/profile" className="btn btn-sm btn-outline-secondary">Profile</Link>
                <button onClick={logout} className="btn btn-sm btn-outline-danger">Logout</button>
              </>
            ) : (
              <>
                <Link to="/register" className="btn btn-sm btn-outline-secondary">Register</Link>
                <Link to="/login" className="btn btn-sm btn-outline-secondary">Login</Link>
              </>
            )}
          </form>
        </nav>
      </div>
    );
  }