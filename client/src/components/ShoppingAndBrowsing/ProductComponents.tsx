// src/components/ShoppingAndBrowse/ProductComponents.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LKR_EXCHANGE_RATE } from "./ProductCategoryDetails"; // Import the exchange rate

// Interface for Product (copied from ProductCategoryDetails for self-containment)
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  brand?: string;
  rating?: number;
}

// SearchBar Component
export const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="flex items-center space-x-4 mb-8 p-4 bg-white rounded-xl shadow-md">
      <input
        type="text"
        placeholder="Search products by name, description, or category..."
        className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button
        onClick={handleSearchClick}
        className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 shadow-md"
      >
        Search
      </button>
    </div>
  );
};

// ProductCard Component
export const ProductCard = ({ product }: { product: Product }) => {

  const priceInLKR = (product.price * LKR_EXCHANGE_RATE).toFixed(2);

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200">
      <img
        src={
          product.image ||
          `https://placehold.co/400x300/F0F0F0/888888?text=${product.name}`
        }
        alt={product.name}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://placehold.co/400x300/F0F0F0/888888?text=Image+Not+Found";
        }}
      />
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-extrabold text-indigo-700">
            Rs {priceInLKR}
          </span>
          <span className="text-sm text-gray-500">
            Rating: {product.rating || "N/A"}
          </span>
        </div>
        <Link
          to={`/product/${product.id}`} 
          className="block w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 text-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};