import React, { useState, useMemo } from "react";
import Cartcontext from "./Cartcontext";

const Cartprovider = ({ children }) => {
  const [cart, setCart] = useState([]); // State for cart items

  const addToCart = (newProduct) => {
    setCart((prevCart) => {
      // Find if the product already exists in the cart
      const existingProductIndex = prevCart.findIndex(
        (item) =>
          item.product.id === newProduct.product.id &&
          item.selectedSize === newProduct.selectedSize &&
          item.selectedColor === newProduct.selectedColor
      );

      if (existingProductIndex !== -1) {
        // If the product exists, update its quantity
        return prevCart.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + 1 } // Increment quantity
            : item
        );
      } else {
        // If the product is new, add it to the cart
        return [...prevCart, { ...newProduct, quantity: 1 }]; // Initialize quantity as 1
      }
    });
  };

  // Calculate the total quantity of items in the cart
  const newquantity = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  return (
    <Cartcontext.Provider value={{ cart, setCart, addToCart, newquantity }}>
      {children}
    </Cartcontext.Provider>
  );
};

export default Cartprovider;
