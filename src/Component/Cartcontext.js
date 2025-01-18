import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  
  const updateCart = (product, quantity, selectedColor, selectedSize) => {
    setCart((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.id === product.id);

      if (itemIndex >= 0) {
        // Update existing item
        const updatedItems = [...prevItems];
        updatedItems[itemIndex] = { ...updatedItems[itemIndex], quantity };
        return updatedItems;
      } else {
        // Add new item
        return [
          ...prevItems,
          { ...product, quantity, selectedColor, selectedSize },
        ];
      }
    });
  };

  return (
    <CartContext.Provider value={{ cart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};
