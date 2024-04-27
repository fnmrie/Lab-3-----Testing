
// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/my-pogs">My Pogs</Link></li>
        <li><Link to="/shop">Shop</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
