import React, { useState, useEffect } from "react";
import Authcontext from "./Authcontext";

const Authprovider = ({ children }) => {
  // State to manage login status and user data
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);

  // Logout function to clear user data and login state
  const logout = () => {
    setIsLogin(false);
    setUser(null);
    localStorage.removeItem("user"); // Clear user data from localStorage
    localStorage.setItem("isLogin", false); // Set isLogin to false in localStorage
  };

  // Check for login status on mount and update the state
  useEffect(() => {
    const savedLoginStatus = JSON.parse(localStorage.getItem("isLogin"));
    if (savedLoginStatus) {
      setIsLogin(savedLoginStatus);
    }
  }, []);

  // Update localStorage whenever login state or user data changes
  useEffect(() => {
    localStorage.setItem("isLogin", JSON.stringify(isLogin));
    if (isLogin && user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [isLogin, user]);

  return (
    <Authcontext.Provider value={{ isLogin, setIsLogin, user, setUser, logout }}>
      {children}
    </Authcontext.Provider>
  );
};

export default Authprovider;
