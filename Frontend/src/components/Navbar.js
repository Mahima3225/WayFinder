// frontend/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{ padding: '1rem', backgroundColor: '#282c34', color: '#fff' }}>
    <h2 style={{ display: 'inline' }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
        WayFinder
      </Link>
    </h2>
    <div style={{ float: 'right' }}>
      <Link to="/login" style={{ color: '#fff', marginRight: '1rem' }}>Login</Link>
      <Link to="/signup" style={{ color: '#fff' }}>Signup</Link>
    </div>
  </nav>
);

export default Navbar;
