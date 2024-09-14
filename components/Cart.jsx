import React, { useState } from 'react';
import '../CSS/cart.css';

const Cart = () => {
  // Sample cart data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Tomato',
      price: 50,
      quantity: 1,
      image: 'https://via.placeholder.com/100'
    },
    {
      id: 2,
      name: 'Milk',
      price: 30,
      quantity: 2,
      image: 'https://via.placeholder.com/100'
    },
    {
      id: 3,
      name: 'Apple',
      price: 100,
      quantity: 3,
      image: 'https://via.placeholder.com/100'
    }
  ]);

  // Increase quantity
  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map(item => 
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems.map(item => 
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Calculate total for a single item
  const calculateItemTotal = (item) => {
    return item.price * item.quantity;
  };

  // Calculate total for the whole cart
  const calculateCartTotal = () => {
    return cartItems.reduce((acc, item) => acc + calculateItemTotal(item), 0);
  };

  return (
    <div>
      <header>
        <nav className='navhome'>
          <a href="/">Home</a>
          <div className="dropdown">
            <a href="/product-catalog">Products</a>
            
          </div>
          <a href="/create">Create Product</a>
          <a href="#">My cart</a>
          <a href="/register">Register</a>
          <a href="/login">Login</a>
        </nav>
      </header>
      
      <div className="cart-page">
        <h1 className='Cart_head'>Your Cart</h1>
        <table className="cart-table">
          <thead>
            <tr>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th> {/* New column for remove button */}
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item.id}>
                <td><img src={item.image} alt={item.name} className="product-image" /></td>
                <td>{item.name}</td>
                <td>₹{item.price}</td>
                <td>
                  <div className="quantity-control">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                </td>
                <td>₹{calculateItemTotal(item)}</td>
                <td>
                  <button onClick={() => removeItem(item.id)} className="remove-button">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="cart-total">
          <h3>Total: ₹{calculateCartTotal()}</h3>
        </div>
      </div>

      <footer className="footer">
        <p>&copy; 2024 KISANET. All rights reserved.</p>
        <p>
          <a href="#">Privacy Policy</a> | 
          <a href="#">Terms of Service</a> | 
          <a href="#">Contact Us</a>
        </p>
      </footer>
    </div>
  );
}

export default Cart;