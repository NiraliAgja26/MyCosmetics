// Cart component (shows items)
import React, { useState, useEffect } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import api from '../utils/api';

function Cart() {
  const [cart, setCart] = useState({ items: [] });

  useEffect(() => {
    api.get('/cart')
      .then(res => setCart(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleRemove = (itemId) => {
    api.delete(`/cart/${itemId}`)
      .then(res => setCart(res.data))
      .catch(err => console.error(err));
  };

  const total = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div>
      <h2>Your Cart</h2>
      <ListGroup>
        {cart.items.map(item => (
          <ListGroup.Item key={item._id} className="cart-item">
            {item.product.name} - Shade: {item.shade} - Qty: {item.quantity} - ${item.product.price * item.quantity}
            <Button variant="danger" size="sm" className="ms-2" onClick={() => handleRemove(item._id)}>Remove</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h4 className="mt-3">Total: ${total}</h4>
    </div>
  );
}

export default Cart;