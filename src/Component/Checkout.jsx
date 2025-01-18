import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Button } from "@mui/material";
import axios from "axios";

function OrderConfirmation() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null); // Change from array to single order
  const [trackingOrder, setTrackingOrder] = useState(null);

  // Fetch orders once the component mounts
  useEffect(() => {
    fetchOrder();
  }, []);

  async function fetchOrder() {
    try {
      const response = await axios.get("https://backend-one-brown-50.vercel.app/orderdata");
      const allOrders = response.data;
      // Assuming orders are sorted by date, pick the last one
      const latestOrder = allOrders[allOrders.length - 1];
      setOrder(latestOrder); // Set only the latest order
    } catch (error) {
      console.log(error);
    }
  }

  // Handle order tracking
  const handleTrackOrder = (orderNumber) => {
    setTrackingOrder(orderNumber);
    // Add your logic for tracking order here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <CheckCircleOutlineIcon
            style={{ fontSize: "4rem", color: "#4caf50" }}
          />
        </motion.div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Thank You for Your Order!
        </h1>
        <p className="text-gray-600 mb-6">
          Your order has been placed successfully. You will receive an email
          confirmation shortly.
        </p>
        <div className="text-left mb-6">
          {order && (
            <motion.div
              key={order.orderNumber}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 relative"
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="text-2xl font-bold text-gray-700 mb-4">
                Order #{order.orderNumber}
              </h2>
              <p className="text-gray-500 text-sm mb-2">Placed by: {order.email}</p>
              <div className="border-t border-gray-300 pt-4">
                <p className="text-gray-800 font-medium">Items:</p>
                <p className="text-gray-600 text-sm mb-2">{order.name}</p>
                <p className="text-gray-800 font-medium">Size:</p>
                <p className="text-gray-600 text-sm mb-2">{order.selectedsize}</p>
                <p className="text-gray-800 font-medium">Color:</p>
                <p className="text-gray-600 text-sm mb-2">{order.selectedcolor}</p>
                <p className="text-gray-800 font-medium">Quantity:</p>
                <p className="text-gray-600 text-sm mb-2">{order.quantity}</p>
                <p className="text-gray-800 font-medium">Total Price:</p>
                <p className="text-green-600 text-lg font-bold">₹{order.totalPrice}</p>
              </div>

              <button
                className={`mt-6 w-full px-4 py-2 rounded-full text-white shadow-lg transition duration-300 ${
                  trackingOrder === order.orderNumber
                    ? "bg-yellow-500"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                onClick={() => handleTrackOrder(order.orderNumber)}
                disabled={trackingOrder === order.orderNumber}
              >
                {trackingOrder === order.orderNumber ? "Tracking..." : "Track Order"}
              </button>
            </motion.div>
          )}
          {!order && <p className="text-gray-600 text-sm">No orders available.</p>}
        </div>
        <Button
          variant="contained"
          color="primary"
          className="px-6 py-2 rounded-full shadow-lg"
          onClick={() => navigate("/")}
          style={{ textTransform: "none" }}
        >
          Continue Shopping
        </Button>
      </motion.div>
    </div>
  );
}

export default OrderConfirmation;
