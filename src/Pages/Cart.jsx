// src/Pages/Cart.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length > 0 ? (
        <>
          <div className="grid grid-cols-5 gap-4 border-b pb-2">
            <span className="font-semibold">Name</span>
            <span className="font-semibold">Company</span>
            <span className="font-semibold">Price</span>
            <span className="font-semibold">Quantity</span>
            <span className="font-semibold">Actions</span>
          </div>

          {cartItems.map((item) => (
            <div key={item.medicineId} className="grid grid-cols-5 gap-4 items-center border-b py-2">
              <span>{item.name}</span>
              <span>{item.company}</span>
              <span>${item.pricePerUnit}</span>
              <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item.medicineId)}
                    className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.medicineId)}
                    className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    +
                  </button>
                </div>
              <button
                onClick={() => removeFromCart(item.medicineId)}
                className="px-2 py-1 bg-red-500 text-white hover:bg-red-600 rounded"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={clearCart}
              className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded"
            >
              Clear All
            </button>
            <Link to="CheckoutPage">
              <button className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded">
                Checkout
              </button>
            </Link>
          </div>
        </>
      ) : (
        <p className="text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
