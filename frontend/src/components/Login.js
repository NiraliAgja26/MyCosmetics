// Login form
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import api from '../utils/api';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/auth/login', { email, password })
      .then(res => {
        localStorage.setItem('token', res.data.token);
        onLogin();
      })
      .catch(err => alert('Login failed'));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button type="submit">Login</Button>
    </Form>
  );
}

export default Login;