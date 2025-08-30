import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import api from '../utils/api';

function ProfilePage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const res = await api.post(endpoint, { email, password });
      localStorage.setItem('userId', res.data.userId);
      localStorage.setItem('userEmail', res.data.email);
      window.dispatchEvent(new Event('storage'));
      setError('');
      navigate('/'); // Redirect to home
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Container>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {isLogin ? 'Login' : 'Sign Up'}
        </Button>
        <Button
          variant="link"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Need an account? Sign Up' : 'Have an account? Login'}
        </Button>
      </Form>
    </Container>
  );
}

export default ProfilePage;