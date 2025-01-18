import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaFilter, FaSort, FaTshirt, FaPalette, FaRuler } from "react-icons/fa";

function Collection() {
  const [filter, setFilter] = useState({
    category: "",
    size: "",
    price: "",
    colors: "",
  });
  const { gender } = useParams();
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [product, setProducts] = useState([]);

  // Fetch product data on component mount
  useEffect(() => {
    async function productdata() {
      try {
        const response = await axios.get(`https://backend-one-brown-50.vercel.app/product`);
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    productdata();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filter, gender, product]);

  const handleFilterChange = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyFilters = () => {
    const { category, size, price, colors } = filter;

    let filtered = product.filter((item) => {
      const genderMatch = !gender || item.gender === gender;
      const categoryMatch = category === "" || item.category === category;
      const sizeMatch = size === "" || item.size.includes(size);
      const colorMatch = colors === "" || item.colors?.includes(colors);
      return genderMatch && categoryMatch && sizeMatch && colorMatch;
    });

    if (price === "low-to-high") {
      filtered = filtered.sort((a, b) => parseInt(a.price) - parseInt(b.price));
    } else if (price === "high-to-low") {
      filtered = filtered.sort((a, b) => parseInt(b.price) - parseInt(a.price));
    }

    setFilteredProduct(filtered);
  };

  return (
    <div className="flex flex-col p-6 bg-gray-50 min-h-screen">
      {/* Header with Sort By */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Products</h2>
        <div className="flex items-center gap-2">
          <FaSort className="text-gray-500" />
          <select
            value={filter.price}
            onChange={(e) => handleFilterChange("price", e.target.value)}
            className="border border-gray-300 rounded-lg p-3 text-sm bg-gray-50 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Sort By</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Filters and Products */}
      <div className="flex gap-6 flex-col md:flex-row">
        {/* Sidebar Filters */}
        <div className="w-full md:w-1/4 bg-white rounded-lg shadow-lg p-6 border border-gray-200 mb-6 md:mb-0">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaFilter className="text-indigo-500" />
            Filters
          </h2>

          {/* Category */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <FaTshirt className="text-indigo-500" />
              Category
            </label>
            <select
              value={filter.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Categories</option>
              <option value="tee">Tee</option>
              <option value="shirt">Shirt</option>
            </select>
          </div>

          {/* Size */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <FaRuler className="text-indigo-500" />
              Size
            </label>
            <select
              value={filter.size}
              onChange={(e) => handleFilterChange("size", e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Sizes</option>
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
              <option value="XL">Extra Large</option>
            </select>
          </div>

          {/* Colors */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <FaPalette className="text-indigo-500" />
              Color
            </label>
            <select
              value={filter.colors}
              onChange={(e) => handleFilterChange("colors", e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Colors</option>
              {product[0]?.colors?.map((color, index) => (
                <option key={index} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Section */}
        <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProduct.map((item) => (
            <Link
              to={`/productdetails`}
              state={{ product: item }}
              key={item.id}
              className="block group transition-transform duration-300 transform hover:scale-105"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={item.images[0].src}
                  alt={item.images[0].alt}
                  className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                  <p className="text-lg font-bold text-green-600 mb-4">
                    ₹{item.price}
                  </p>
                  <p className="text-sm text-gray-500">
                    Sizes: {item.size.join(", ")}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection;
