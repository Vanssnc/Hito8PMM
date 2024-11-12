import React from 'react'

export default function Navbar() {
  return (
    <div>
        <nav class="navbar bg-body-tertiary">
  <form class="container-fluid justify-content-start">
    <button class="btn btn-success me-2" type="button">Pizzería Mamma Mia</button>
    <button class="btn btn-sm btn-outline-secondary" type="button">Home</button>
    <button class="btn btn-sm btn-outline-secondary" type="button">Profile</button>
    <button class="btn btn-sm btn-outline-secondary" type="button">Logout</button>
    <button class="btn btn-sm btn-outline-secondary" type="button">Login</button>
    <button class="btn btn-sm btn-outline-secondary" type="button">Register</button>
    <button class="btn btn-sm btn-outline-secondary" type="button">Total</button>
  </form>
</nav>
    </div>
  )
}
