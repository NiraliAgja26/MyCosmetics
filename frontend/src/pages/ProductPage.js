import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import api from '../utils/api';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [shade, setShade] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => setError('Failed to load product'));
  }, [id]);

  const addToCart = () => {
    if (!shade) {
      setError('Please select a shade');
      return;
    }
    if (!localStorage.getItem('userId')) {
      setError('Please log in to add items to cart');
      return;
    }
    api.post('/cart', { productId: id, quantity, shade })
      .then(() => {
        setSuccess('Added to cart!');
        setError(null);
        setTimeout(() => setSuccess(null), 2000);
      })
      .catch(err => setError(err.response?.data?.message || 'Failed to add to cart'));
  };

  if (error && !product) return <Container><Alert variant="danger">{error}</Alert></Container>;
  if (!product) return <Container>Loading...</Container>;

  return (
    <Container>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Row>
        <Col md={6}>
          <img src={product.image} alt={product.name} className="img-fluid" />
        </Col>
        <Col md={6}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p><strong>Price:</strong> ₹{product.price}</p>
          <p><strong>Available:</strong> 
            {product.quantity > 0 ? (
              <span className="text-success">{product.quantity} items in stock</span>
            ) : (
              <span className="text-danger">Out of Stock</span>
            )}
          </p>
          <div className="mb-3">
            <label><strong>Shade:</strong></label>
            <select
              value={shade}
              onChange={e => setShade(e.target.value)}
              className="form-control w-auto d-inline-block ms-2"
            >
              <option value="">Select Shade</option>
              {product.shades.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label><strong>Quantity:</strong></label>
            <input
              type="number"
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
              min="1"
              max={product.quantity}
              className="form-control w-auto d-inline-block ms-2"
            />
          </div>
          <Button 
            variant="primary" 
            onClick={addToCart}
            disabled={product.quantity === 0}
          >
            {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductPage;