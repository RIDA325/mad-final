import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

const BASE_URL = "https://mad-app-firebase-auth-default-rtdb.firebaseio.com/";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/cart.json`);
        if (response.status === 200 && response.data) {
          const itemsArray = Object.entries(response.data).map(([id, value]) => ({
            id,
            ...value,
            price: value.price ? parseFloat(value.price) : 0,
          }));
          setCart(itemsArray);
        }
      } catch (error) {
        console.error("Error fetching cart data: ", error.message);
      }
    };

    fetchCart();
  }, []);

  const addToCart = async (newItem) => {
    try {
      const response = await axios.post(`${BASE_URL}/cart.json`, newItem);
      if (response.status === 200) {
        setCart((prevCart) => [
          ...prevCart,
          {
            id: response.data.name,
            ...newItem,
            price: newItem.price ? parseFloat(newItem.price) : 0,
          },
        ]);
        return true;
      }
    } catch (error) {
      console.error("Error adding item to cart: ", error.message);
      throw error;
    }
  };

  const removeFromCart = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/cart/${id}.json`);
      if (response.status === 200) {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
        return true;
      }
    } catch (error) {
      console.error("Error removing item from cart: ", error.message);
      throw error;
    }
  };

  const handleUpdateQuantity = async (id, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        await removeFromCart(id);
        return;
      }

      const updatedItem = cart.find(item => item.id === id);
      if (updatedItem) {
        updatedItem.quantity = newQuantity;
        await axios.put(`${BASE_URL}/cart/${id}.json`, updatedItem);
        setCart((prevCart) => prevCart.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        ));
      }
    } catch (error) {
      console.error("Error updating item quantity: ", error.message);
      throw error;
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, handleUpdateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
