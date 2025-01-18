import React, { useContext, useState, useEffect } from "react";
import { Add, Remove, Delete } from "@mui/icons-material";
import Cartcontext from "../Context/Cartcontext";
import { useNavigate } from "react-router-dom";
import Authcontext from "../Context/Authcontext";
import axios from "axios";

function Cart() {
  const { cart, setCart } = useContext(Cartcontext);
  const { isLogin, user } = useContext(Authcontext);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [lastOrderNumber, setLastOrderNumber] = useState(0); // Store the last order number
  const [loadingOrderNumber, setLoadingOrderNumber] = useState(false);

  useEffect(() => {
    // Fetch the last order number when the component mounts
    const getLastOrderNumber = async () => {
      try {
        setLoadingOrderNumber(true);
        const response = await axios.get("https://backend-one-brown-50.vercel.app/orderdata");
        const orders = response.data;

        if (orders && orders.length > 0) {
          const maxOrderNumber = Math.max(
            ...orders.map((order) => order.orderNumber)
          );
          setLastOrderNumber(maxOrderNumber);
        } else {
          setLastOrderNumber(0); // Start from 0 if no orders exist
        }
      } catch (error) {
        console.error("Failed to fetch the last order number:", error);
      } finally {
        setLoadingOrderNumber(false);
      }
    };

    getLastOrderNumber();
  }, []);

  const incrementQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
  };

  const decrementQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
    }
  };

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const calculateTotalPrice = () =>
    cart.reduce((total, item) => total + item.quantity * item.product.price, 0);

  const handleCouponChange = (e) => {
    setCoupon(e.target.value);
  };

  const applyCoupon = async () => {
    try {
      const response = await axios.get("https://ecom-khu6nnt2u-virats-projects-2baaa249.vercel.app/coupon");
      const coupons = response.data;

      const matchingCoupon = coupons[0].coupon.find(
        (item) => item.name === coupon
      );

      if (matchingCoupon) {
        setDiscount(parseFloat(matchingCoupon.discount) / 100); // Convert percentage to decimal
        setErrorMessage(""); // Clear error message
      } else {
        setDiscount(0);
        setErrorMessage("Invalid coupon code!");
      }
    } catch (error) {
      setErrorMessage("Failed to apply coupon. Please try again later.");
    }
  };

  const totalPrice = calculateTotalPrice();
  const discountedPrice = discount > 0 ? totalPrice * discount : 0;
  const actualPrice =
    discountedPrice > 0 ? calculateTotalPrice() - discountedPrice : totalPrice;

  const ordersubmit = async () => {
    if (loadingOrderNumber) {
      console.log("Fetching the latest order number...");
      return;
    }

    const nextOrderNumber = lastOrderNumber + 1; // Increment last order number

    try {
      const addProduct = {
        email: user.email,
        orderNumber: nextOrderNumber, // Use the next order number
        totalPrice: actualPrice,
        quantity: cart.reduce((total, item) => total + item.quantity, 0),
        name: cart.map((item) => item.product.name).join(", "),
        selectedsize: cart.map((item) => item.selectedSize).join(", "),
        selectedcolor: cart.map((item) => item.selectedColor).join(", "),
      };

      const response = await axios.post(
        "https://backend-one-brown-50.vercel.app/order",
        addProduct
      );

      console.log("Order created successfully:", response.data);
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  const handleCheckout = async () => {
    if (isLogin) {
      await ordersubmit();
      
      
      navigate("/checkout");
      setCart([]);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Your Cart
      </h1>
      <div className="border-b border-gray-300 mb-6"></div>

      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-lg text-gray-500 mb-4">Your cart is empty.</p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center justify-between p-10 bg-white rounded shadow mb-4"
            >
              <div className="flex flex-col sm:flex-row items-center w-full sm:w-2/3">
                <img
                  src={item.product.images[0].src}
                  alt={item.product.images[0].alt}
                  className="w-24 h-24 object-cover rounded mb-4 sm:mb-0 sm:mr-4"
                />
                <div className="text-left">
                  <h2 className="text-xl font-semibold text-gray-700">
                    {item.product.name}
                  </h2>
                  <p className="text-gray-500">
                    ₹{item.product.price} x {item.quantity}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Size: {item.selectedSize}
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="text-gray-500 text-sm mr-2">Color:</span>
                    <div
                      className="w-6 h-6 rounded-full border"
                      style={{ backgroundColor: item.selectedColor }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center sm:w-1/3 mt-4 sm:mt-0 justify-between">
                <div className="flex items-center">
                  <button
                    onClick={() => decrementQuantity(index)}
                    className="p-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
                  >
                    <Remove />
                  </button>
                  <span className="px-3 text-gray-700 font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => incrementQuantity(index)}
                    className="p-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
                  >
                    <Add />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(index)}
                  className="ml-4 p-2 text-red-500 hover:text-red-700"
                >
                  <Delete />
                </button>
              </div>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row justify-center items-center mt-6">
            <input
              type="text"
              placeholder="Coupon Code"
              className="border border-gray-300 rounded p-2 w-full sm:w-auto sm:mr-4 mb-4 sm:mb-0"
              value={coupon}
              onChange={handleCouponChange}
            />
            <button
              onClick={applyCoupon}
              className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
            >
              Apply
            </button>
          </div>

          {errorMessage && (
            <p className="text-center text-red-500 mt-4">{errorMessage}</p>
          )}

          <div className="text-right mt-6">
            <p className="text-lg font-medium text-gray-700">
              Subtotal: ₹{totalPrice}
            </p>

            <p className="text-lg font-medium text-green-500">
              Discounted Price: ₹{discountedPrice.toFixed(2)}
            </p>

            <p className="text-lg font-medium text-green-500">
              Total Price: ₹{actualPrice.toFixed(2)}
            </p>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Continue Shopping
            </button>
            <button
              onClick={handleCheckout}
              className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
