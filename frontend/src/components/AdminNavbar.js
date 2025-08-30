import React from 'react';
import { Navbar as BSNavbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { BsBrush } from 'react-icons/bs';

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    window.location.href = '/';
  };

  return (
    <BSNavbar expand="lg" className="navbar">
      <BSNavbar.Brand as={Link} to="/admin" className="nav-logo">
        <BsBrush />
        <span>Cosmetics Shop</span>
      </BSNavbar.Brand>
      <BSNavbar.Toggle aria-controls="admin-navbar-nav" />
      <BSNavbar.Collapse id="admin-navbar-nav">
        <div className="mx-auto">
          <span className="navbar-brand mb-0 h1">
            Welcome Admin
          </span>
        </div>
        <Nav className="ms-auto">
          <Nav.Link onClick={handleLogout}>Admin Logout</Nav.Link>
        </Nav>
      </BSNavbar.Collapse>
    </BSNavbar>
  );
}

export default AdminNavbar;