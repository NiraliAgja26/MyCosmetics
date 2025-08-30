import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Form, Alert } from 'react-bootstrap';
import AdminNavbar from '../components/AdminNavbar';
import api from '../utils/api';

function AdminPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      navigate('/admin-login');
      return;
    }
    loadProducts();
  }, [navigate]);

  const loadProducts = () => {
    api.get('/products/admin/all')
      .then(res => setProducts(res.data))
      .catch(() => setError('Failed to load products'));
  };

  const updateQuantity = (productId, newQuantity) => {
    api.put(`/products/${productId}/quantity`, { quantity: newQuantity })
      .then(() => {
        setSuccess('Quantity updated successfully');
        setError(null);
        loadProducts();
        setTimeout(() => setSuccess(null), 2000);
      })
      .catch(err => setError(err.response?.data?.message || 'Failed to update quantity'));
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 0) return;
    updateQuantity(productId, quantity);
  };

  if (!localStorage.getItem('adminAuth')) {
    return null;
  }

  return (
    <div>
      <AdminNavbar />
      <Container className="my-4">
        <h2>Product Inventory Management</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      
      {products.length === 0 ? (
        <Alert variant="info">No products found in database</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Shades</th>
              <th>Current Quantity</th>
              <th>Update Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>₹{product.price}</td>
                <td>{product.shades?.join(', ') || 'N/A'}</td>
                <td>{product.quantity || 0}</td>
                <td>
                  <Form.Control
                    type="number"
                    min="0"
                    defaultValue={product.quantity || 0}
                    onBlur={(e) => handleQuantityChange(product._id, Number(e.target.value))}
                    style={{ width: '100px' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      </Container>
    </div>
  );
}

export default AdminPage;