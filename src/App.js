import React, { useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Collection from "./Component/Product/Collection";
import ProductDetail from "./Component/Productdetail";
import Login from "./Component/Signin";
import Signup from "./Component/Signup";
import Cartprovider from "./Component/Context/Cartprovider";
import Cartcontext from "./Component/Context/Cartcontext";
import Authcontext from "./Component/Context/Authcontext";
import Authprovider from "./Component/Context/Authprovider";
import Hero from "./Component/Hero";
import Checkout from "./Component/Checkout";
import Contact from "./Component/Contact";
import MyOrder from "./Component/Product/Myorder";

function App() {
  return (
    <Authprovider>
      <Cartprovider>
        <BrowserRouter>
          <CartConsumerComponent />
        </BrowserRouter>
      </Cartprovider>
    </Authprovider>
  );
}

const CartConsumerComponent = () => {
  const { cart, setCart } = useContext(Cartcontext);
  const { isLogin, setIsLogin } = useContext(Authcontext);

  
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart && Array.isArray(savedCart)) {
      setCart(savedCart); 
    }

    const savedLogin = JSON.parse(localStorage.getItem("isLogin"));
    if (typeof savedLogin === "boolean") {
      setIsLogin(savedLogin); 
    }
  }, [setCart, setIsLogin]);

  // Sync cart and isLogin state with localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("isLogin", JSON.stringify(isLogin));
  }, [cart, isLogin]);

  return (
    <>
      <Navbar
        newquantity={cart.reduce((acc, item) => acc + item.quantity, 0)} // Calculate newquantity directly here
      />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/collection/:gender" element={<Collection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        
        <Route path="/productdetails" element={<ProductDetail />} />
        <Route path="/myorder" element={<MyOrder />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
};

export default App;
