import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Alert, Modal, Form, Row, Col } from 'react-bootstrap';
import api from '../utils/api';

function CartPage() {
  const [cart, setCart] = useState({ items: [] });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardholderName: '',
  });
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('userId')) {
      setError('Please log in to view your cart');
      return;
    }
    api.get('/cart')
      .then(res => setCart(res.data))
      .catch(err => setError(err.response?.data?.message || 'Failed to load cart'));
  }, []);

  const removeFromCart = itemId => {
    api.delete(`/cart/${itemId}`)
      .then(res => setCart(res.data))
      .catch(err => setError(err.response?.data?.message || 'Failed to remove item'));
  };

  const clearCart = () => {
    api.delete('/cart')
      .then(res => setCart(res.data))
      .catch(err => setError(err.response?.data?.message || 'Failed to clear cart'));
  };

  const handleCheckout = () => {
    setPaymentError(null);
    setPaymentSuccess(null);
    setShowModal(true);
  };

  const handlePaymentChange = e => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handlePaymentSubmit = async e => {
    e.preventDefault();
    // Basic validation for demonstration
    if (!paymentData.cardNumber || !/^\d{16}$/.test(paymentData.cardNumber)) {
      setPaymentError('Card number must be 16 digits.');
      return;
    }
    if (!paymentData.expiry || !/^\d{2}\/\d{2}$/.test(paymentData.expiry)) {
      setPaymentError('Expiry must be in MM/YY format.');
      return;
    }
    if (!paymentData.cvv || !/^\d{3}$/.test(paymentData.cvv)) {
      setPaymentError('CVV must be 3 digits.');
      return;
    }
    if (!paymentData.cardholderName.trim()) {
      setPaymentError('Cardholder name is required.');
      return;
    }

    const validItems = cart.items.filter(item => item.product);
    if (validItems.length < cart.items.length) {
      setPaymentError('Some items in your cart are no longer available. Please remove them and try again.');
      return;
    }

    const orderPayload = {
      orderItems: validItems.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        shade: item.shade,
      })),
    };

    try {
      // Create an order to store payment history
      await api.post('/orders', orderPayload);

      // Payment was successful. Clear cart and any previous page-level errors.
      setError(null);
      setCart(prev => ({ ...prev, items: [] }));
      setPaymentSuccess('Payment successful! Thank you for your purchase.');
      setPaymentError(null);
      setTimeout(() => {
        setShowModal(false);
        navigate('/order-history');
      }, 3000);
    } catch (err) {
      setPaymentError(err.response?.data?.message || 'Payment failed. Please try again.');
    }
  };

  if (error) return <Container><Alert variant="danger">{error}</Alert></Container>;
  if (!cart) return <Container>Loading...</Container>;

  // Calculate total amount
const totalAmount = cart.items.reduce((total, item) => {
  if (!item.product || typeof item.product.price !== 'number') return total;
  return total + item.product.price * item.quantity;
}, 0).toFixed(2);


  return (
    <Container>
      <Row>
        <Col>
          <h2>Your Cart</h2>
          {(cart?.items?.length || 0) === 0 ? (
            <Alert variant="info">Your cart is empty</Alert>
          ) : (
            <>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Shade</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.items.map(item => (
                    <tr key={item._id}>
                      <td>{item.product?.name || 'Product not found'}</td>
                      <td>{item.shade}</td>
                      <td>{item.quantity}</td>
                      <td>₹{item.product?.price ? item.product.price.toFixed(2) : 'N/A'}</td>
                      <td>₹{item.product?.price ? (item.product.price * item.quantity).toFixed(2) : 'N/A'}</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeFromCart(item._id)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <h4>Total Amount: ₹{totalAmount}</h4>
                <div>
                  <Button variant="warning" onClick={clearCart} className="me-2">
                    Clear Cart
                  </Button>
                  <Button variant="primary" onClick={handleCheckout}>
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </>
          )}
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Complete Your Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {paymentError && <Alert variant="danger">{paymentError}</Alert>}
          {paymentSuccess && <Alert variant="success">{paymentSuccess}</Alert>}
          {!paymentSuccess && (
            <Form onSubmit={handlePaymentSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                  type="text"
                  name="cardNumber"
                  value={paymentData.cardNumber}
                  onChange={handlePaymentChange}
                  placeholder="0000 0000 0000 0000"
                  maxLength="16"
                  required
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Expiry Date</Form.Label>
                    <Form.Control
                      type="text"
                      name="expiry"
                      value={paymentData.expiry}
                      onChange={handlePaymentChange}
                      placeholder="MM/YY"
                      maxLength="5"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>CVV</Form.Label>
                    <Form.Control
                      type="text"
                      name="cvv"
                      value={paymentData.cvv}
                      onChange={handlePaymentChange}
                      placeholder="123"
                      maxLength="3"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Cardholder Name</Form.Label>
                <Form.Control
                  type="text"
                  name="cardholderName"
                  value={paymentData.cardholderName}
                  onChange={handlePaymentChange}
                  placeholder="Name on card"
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Pay ₹{totalAmount}
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default CartPage;