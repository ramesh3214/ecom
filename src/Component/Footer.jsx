import React from "react";
import { TextField, Button } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

function Footer() {
  return (
    <div className="bg-gray-100 text-gray-700">
      <div className="max-w-screen-xl mx-auto py-10 px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">About Us</h2>
          <p className="text-sm mb-4">
            We are committed to bringing you the best online shopping experience, offering premium products and outstanding customer service.
          </p>
          <p className="text-sm">© 2024 Maloon. All rights reserved.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Shop</a></li>
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h2 className="text-xl font-bold mb-4">Customer Service</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">FAQ</a></li>
            <li><a href="#" className="hover:underline">Returns</a></li>
            <li><a href="#" className="hover:underline">Shipping</a></li>
            <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-sm mb-4">
            Get updates on exclusive deals and new arrivals directly to your inbox.
          </p>
          <div className="flex items-center space-x-2">
            <TextField
              label="Your Email"
              variant="outlined"
              size="small"
              className="flex-grow"
            />
            <Button variant="contained" color="primary" className="text-white">
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="bg-gray-200 py-4">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center px-6">
          <p className="text-sm">Follow us on:</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-700 hover:text-blue-500">
              <Facebook fontSize="large" />
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-300">
              <Twitter fontSize="large" />
            </a>
            <a href="#" className="text-gray-700 hover:text-pink-500">
              <Instagram fontSize="large" />
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-700">
              <LinkedIn fontSize="large" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
