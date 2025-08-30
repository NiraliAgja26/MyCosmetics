import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Envelope, Telephone, Instagram, Twitter, Facebook } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer mt-auto py-4">
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <h5>Contact Us</h5>
            <p>
              <Envelope className="me-2" /> support@mycosmetics.com
            </p>
            <p>
              <Telephone className="me-2" /> +91 123-456-7890
            </p>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Follow Us</h5>
            <p>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-link">
                <Instagram className="me-2" /> Instagram
              </a>
            </p>
            <p>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-link">
                <Twitter className="me-2" /> Twitter
              </a>
            </p>
            <p>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-link">
                <Facebook className="me-2" /> Facebook
              </a>
            </p>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Quick Links</h5>
            <p><Link to="/" className="footer-link">Home</Link></p>
            <p><Link to="/category/Face" className="footer-link">Face</Link></p>
            <p><Link to="/category/Lips" className="footer-link">Lips</Link></p>
            <p><Link to="/category/Eyes" className="footer-link">Eyes</Link></p>
            <p><Link to="/cart" className="footer-link">Cart</Link></p>
            <p><Link to="/profile" className="footer-link">Profile</Link></p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-3">
            <p>&copy; {new Date().getFullYear()} MyCosmetics. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;