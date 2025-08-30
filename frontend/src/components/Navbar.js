import React, { useState, useEffect } from 'react';
import { Navbar as BSNavbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsBrush } from 'react-icons/bs';


function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userId'));
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'));

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(!!localStorage.getItem('userId'));
      setUserEmail(localStorage.getItem('userEmail'));
    };
    window.addEventListener('storage', handleAuthChange);
    handleAuthChange();
    return () => {
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <BSNavbar  expand="lg" className="navbar">
      <BSNavbar.Brand as={Link} to="/" className="nav-logo">
        <BsBrush />
        <span>Cosmetics Shop</span>
      </BSNavbar.Brand>
      <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BSNavbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/category/Face">Face</Nav.Link>
          <Nav.Link as={Link} to="/category/Lips">Lips</Nav.Link>
          <Nav.Link as={Link} to="/category/Eyes">Eyes</Nav.Link>
        </Nav>
        {isLoggedIn && userEmail && (
          <div className="mx-auto">
            <span className="navbar-brand mb-0 h1">
              Welcome, {userEmail.split('@')[0]}!
            </span>
          </div>
        )}
        <Nav className="align-items-center">
          <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
          {isLoggedIn && <Nav.Link as={Link} to="/order-history">My Orders</Nav.Link>}
          <Nav.Link as={Link} to="/profile">
            {isLoggedIn ? 'Profile' : 'Login/Signup'}
          </Nav.Link>
          <Nav.Link href="/admin-login" target="_blank" rel="noopener noreferrer">Admin</Nav.Link>
          {isLoggedIn && <Nav.Link onClick={handleLogout}>Logout</Nav.Link>}
        </Nav>
      </BSNavbar.Collapse>
    </BSNavbar>
  );
}

export default Navbar;