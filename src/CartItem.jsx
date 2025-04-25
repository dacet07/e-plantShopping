import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;

    cart.forEach(item => {
        // Extract the quantity and cost of each item
        let quantity = item.quantity;
        let cost = parseFloat(item.cost.substring(1)); // Remove the "$" sign and convert to number
        
        // Multiply quantity by cost and add to the total
        total += quantity * cost;
    });

    // Return the total sum
    return total;
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };



  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      // If quantity is more than 1, decrement by 1
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // If quantity is 1, remove the item from cart
      dispatch(removeItem(item));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
    setAddedToCart((prevState) => {
      const updatedState = { ...prevState };
      delete updatedState[item.name]; // Remove the item from the addedToCart state
      return updatedState;
    });
  };
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    let quantity = item.quantity;
    let cost = parseFloat(item.cost.substring(1)); // Remove "$" and convert to number
    return (quantity * cost).toFixed(2); // Format to 2 decimal places
  };

  const calculateTotalItems = () => {
    let totalItems = 0;
    cart.forEach(item => {
      totalItems += item.quantity;
    });
    return totalItems;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
      <div className="total-items-in-cart">
        <p>Total Items: {calculateTotalItems()}</p>
      </div>
    </div>
  );
};

export default CartItem;


