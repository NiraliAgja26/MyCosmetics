// Categories section with images and links
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CategorySection() {
  return (
    <div className="my-4">
      <h2>Categories</h2>
      <Row>
        <Col md={4}>
          <Card className="category-card">
            <Card.Img variant="top" src="/images/face.jpg" /> {/* Add image */}
            <Card.Body>
              <Card.Title><Link to="/category/Face">Face</Link></Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="category-card">
            <Card.Img variant="top" src="/images/lips.jpg" />
            <Card.Body>
              <Card.Title><Link to="/category/Lips">Lips</Link></Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="category-card">
            <Card.Img variant="top" src="/images/eyes.jpg" />
            <Card.Body>
              <Card.Title><Link to="/category/Eyes">Eyes</Link></Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CategorySection;