import React, { useState, useEffect } from 'react';
import { Container, Table, Alert, Spinner } from 'react-bootstrap';
import api from '../utils/api';

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders/myorders');
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch order history.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Container>
      <h2 className="my-4">My Orders</h2>
      {orders.length === 0 ? (
        <Alert variant="info">You have no past orders.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>₹{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? new Date(order.paidAt).toLocaleDateString() : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default OrderHistoryPage;