// Product detail component
import React, { useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import api from '../utils/api';

function ProductDetail({ product }) {
  const [selectedShade, setSelectedShade] = useState(product.shades[0]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    api.post('/cart', { productId: product._id, quantity, shade: selectedShade })
      .then(() => alert('Added to cart!'))
      .catch(err => console.error(err));
  };

  return (
    <Row className="product-detail">
      <Col md={6}>
        <img src={product.image} alt={product.name} />
      </Col>
      <Col md={6}>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <h4>${product.price}</h4>
        <Form.Group>
          <Form.Label>Shade</Form.Label>
          <Form.Select value={selectedShade} onChange={e => setSelectedShade(e.target.value)}>
            {product.shades.map(shade => <option key={shade}>{shade}</option>)}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label>Quantity</Form.Label>
          <Form.Control type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} min={1} />
        </Form.Group>
        <Button className="mt-3 btn-add-to-cart" onClick={handleAddToCart}>Add to Cart</Button>
      </Col>
    </Row>
  );
}

export default ProductDetail;