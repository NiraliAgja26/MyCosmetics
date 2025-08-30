import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../utils/api';

function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [shades, setShades] = useState([]);
  const [selectedShade, setSelectedShade] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch available shades for the category
    api.get(`/products/category/${category}/shades`)
      .then(res => setShades(res.data))
      .catch(() => setError('Failed to load shades'));
  }, [category]);

  useEffect(() => {
    // Fetch products, filtered by selected shade if any
    const url = selectedShade
      ? `/products/category/${category}?shade=${selectedShade}`
      : `/products/category/${category}`;
    api.get(url)
      .then(res => setProducts(res.data))
      .catch(() => setError('Failed to load products'));
  }, [category, selectedShade]);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>{category} Products</h2>
      <Form.Group className="mb-3">
        <Form.Label>Filter by Shade:</Form.Label>
        <Form.Select
          value={selectedShade}
          onChange={e => setSelectedShade(e.target.value)}
          className="w-auto d-inline-block ms-2"
        >
          <option value="">All Shades</option>
          {shades.map(shade => (
            <option key={shade} value={shade}>{shade}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Row>
        {products.length === 0 ? (
          <p>No products found for this shade.</p>
        ) : (
          products.map(product => (
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
          ))
        )}
      </Row>
    </div>
  );
}

export default CategoryPage;