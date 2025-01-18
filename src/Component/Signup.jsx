import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("https://backend-one-brown-50.vercel.app/signup", {
        name,
        email,
        password,
      });

      if (response.data) {
        toast.success("Signup successful! Please log in.");
        navigate("/login");
      } else {
        toast.error(response.data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div  className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-md w-full p-6 bg-white rounded-2xl shadow-lg transform transition duration-500 hover:shadow-2xl" >
        <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400">
          Create Your Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Join us and start your journey!
        </p>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="loader w-5 h-5 border-4 border-t-transparent border-white rounded-full animate-spin"></span>
                <span className="ml-2">Signing up...</span>
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 font-medium hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
