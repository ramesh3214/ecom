import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Authcontext from "../Context/Authcontext";
import { CircularProgress } from "@mui/material";

function MyOrder() {
  const { user } = useContext(Authcontext); // Logged-in user context
  const [orders, setOrders] = useState([]); // Orders state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://backend-one-brown-50.vercel.app/orderdata");
        const allOrders = response.data;

        // Filter orders to match the user's email
        const userOrders = allOrders.filter((order) => order.email === user.email);
        setOrders(userOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch your orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        My Orders
      </h1>
      <div className="border-b border-gray-300 mb-6"></div>

      {orders.length === 0 ? (
        <div className="text-center">
          <p className="text-lg text-gray-500 mb-4">No orders found.</p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
            onClick={() => window.location.replace("/")}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div
              key={order.orderNumber}
              className="bg-white p-6 rounded shadow-lg hover:shadow-xl transition duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Order #{order.orderNumber}
              </h2>
              <p className="text-gray-500 text-sm mb-4">Placed by: {order.email}</p>
              <div className="border-t border-gray-300 pt-4">
                <p className="text-gray-800 font-medium">Items:</p>
                <p className="text-gray-600 text-sm">{order.name}</p>
              </div>
              <div className="mt-4">
                <p className="text-gray-800 font-medium">Size:</p>
                <p className="text-gray-600 text-sm">{order.selectedsize}</p>
              </div>
              <div className="mt-4">
                <p className="text-gray-800 font-medium">Color:</p>
                <p className="text-gray-600 text-sm">{order.selectedcolor}</p>
              </div>
              <div className="mt-4">
                <p className="text-gray-800 font-medium">Quantity:</p>
                <p className="text-gray-600 text-sm">{order.quantity}</p>
              </div>
              <div className="mt-4">
                <p className="text-gray-800 font-medium">Total Price:</p>
                <p className="text-green-600 text-lg font-bold">₹{order.totalPrice}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrder;
