// src/Context/CartContext.jsx
import React, { createContext, useState, useContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (medicine) => {
    setCartItems([...cartItems, { ...medicine, quantity: 1 }]);
  };

  const increaseQuantity = (id) => {
     setCartItems(cartItems.map(item => 
         item.medicineId === id ? { ...item, quantity: item.quantity + 1 } : item
     ));
 };

 const decreaseQuantity = (id) => {
     setCartItems(cartItems.map(item => 
         item.medicineId === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
     ));
 };


  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.medicineId !== id));
  };

   const clearCart = () => {
     setCartItems([]);
   };

  const cartInfo = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
     increaseQuantity,
     decreaseQuantity
  };

  return (
    <CartContext.Provider value={cartInfo}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
 return useContext(CartContext);
}
