import React from 'react'
// import './header.css'
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='container'>
        <div className='titulo'>
        <h3>Error 404, la ruta no existe</h3> 
</div>

        <div className='desc'> 
            <Link to="/"> Volver a la página de inicio</Link>
            </div>
    </div>
  )
}