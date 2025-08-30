// Product listing component (used in CategoryPage)
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProductList({ products }) {
  return (
    <Row>
      {products.map(product => (
        <Col md={4} key={product._id}>
          <Card className="product-card">
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>${product.price}</Card.Text>
              <Link to={`/product/${product._id}`} className="btn btn-primary">Details</Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default ProductList;