import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, ListGroup, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsEmojiSmile, BsFillDropletFill, BsEye, BsBrush, BsPencilSquare, BsMoisture } from 'react-icons/bs';
import HeroCarousel from '../components/HeroCarousel';
import BestSellers from '../components/BestSellers';
import api from '../utils/api';

function Home() {
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const isLoggedIn = !!localStorage.getItem('userId');

  const makeupTips = [
    {
      icon: BsEmojiSmile,
      description: 'Always test foundation shades on your jawline in natural light to find the perfect match for your skin tone.'
    },
    {
      icon: BsFillDropletFill,
      description: 'Apply lip liner before lipstick to define your lips and prevent feathering, ensuring all-day wear.'
    },
    {
      icon: BsEye,
      description: 'Use a primer before eyeshadow to enhance color payoff and keep your eye makeup crease-free.'
    },
    {
      icon: BsBrush,
      description: 'Smile and apply blush to the apples of your cheeks, blending upwards for a natural, radiant glow.'
    },
    {
      icon: BsPencilSquare,
      description: 'Fill in your eyebrows with light, feathery strokes using a pencil or powder for a natural, defined look.'
    },
    {
      icon: BsMoisture,
      description: 'Finish with a setting spray to lock in your makeup for a flawless, long-lasting finish all day.'
    }
  ];

  const categories = [
    { name: 'Face', link: '/category/Face', icon: BsEmojiSmile },
    { name: 'Lips', link: '/category/Lips', icon: BsFillDropletFill },
    { name: 'Eyes', link: '/category/Eyes', icon: BsEye }
  ];

  useEffect(() => {
    api.get('/reviews')
      .then(res => setReviews(res.data))
      .catch(() => setError('Failed to load reviews'));
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText.trim()) {
      setError('Review cannot be empty');
      return;
    }
    try {
      const res = await api.post('/reviews', { text: reviewText });
      setReviews([res.data, ...reviews]);
      setReviewText('');
      setSuccess('Review added successfully!');
      setError(null);
      setTimeout(() => setSuccess(null), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add review');
    }
  };

  return (
    <div>
      <HeroCarousel />
      <Container className="my-4">
        <Card className="offer-section">
          <Card.Body>
            <Card.Title>10% Off Your First Purchase!</Card.Title>
            <Card.Text>Use code FIRST10 at checkout to enjoy 10% off your first order. Shop now and discover our premium cosmetics!</Card.Text>
            <Button as={Link} to="/category/Face" variant="primary">Shop Now</Button>
          </Card.Body>
        </Card>
      </Container>
      <Container className="my-4">
        <h2>Shop by Category</h2>
        <Row className="category-section">
          {categories.map((category, index) => (
            <Col md={4} key={index} className="mb-3">
              <Card as={Link} to={category.link} className="category-card text-decoration-none">
                <Card.Body className="text-center">
                  <category.icon className="category-icon mb-2" />
                  <Card.Title>{category.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <BestSellers />
      <Container className="my-4">
        <h2>Makeup Tips</h2>
        <ListGroup className="makeup-tips">
          {makeupTips.map((tip, index) => (
            <ListGroup.Item key={index} as="div" className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <tip.icon className="flip-card-icon" />
                </div>
                <div className="flip-card-back">
                  <p>{tip.description}</p>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
      <Container className="my-4">
        <h2>Customer Reviews</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        {isLoggedIn ? (
          <Form onSubmit={handleReviewSubmit} className="mb-4">
            <Form.Group className="mb-3">
              <Form.Label>Add Your Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                placeholder="Share your experience..."
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit Review
            </Button>
          </Form>
        ) : (
          <Alert variant="info">Please log in to add a review.</Alert>
        )}
        <ListGroup>
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            reviews.map(review => (
              <ListGroup.Item key={review._id} className="review-item">
                <p>{review.text}</p>
                <small>
                  By {review.user?.email || 'Anonymous'} on{' '}
                  {new Date(review.createdAt).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </small>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </Container>
    </div>
  );
}

export default Home;