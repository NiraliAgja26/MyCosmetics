import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../utils/api';

function BestSellers() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/products')
      .then(res => setProducts(res.data.slice(0, 4)))
      .catch(() => setError('Failed to load products'));
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div className="my-4">
      <h2>Best Sellers</h2>
      <Row>
        {products.map(product => (
          <Col md={3} key={product._id}>
            <Card className="product-card">
              <Card.Img variant="top" src={product.image} alt={product.name} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>₹{product.price}</Card.Text>
                <Button as={Link} to={`/product/${product._id}`}>View</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default BestSellers;