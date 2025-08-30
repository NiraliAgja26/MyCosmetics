import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';

function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple hardcoded admin credentials
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      localStorage.setItem('adminAuth', 'true');
      navigate('/admin');
    } else {
      setError('Invalid admin credentials');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <Card style={{ width: '400px' }}>
        <Card.Body>
          <h3 className="text-center mb-4">Admin Login</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AdminLogin;