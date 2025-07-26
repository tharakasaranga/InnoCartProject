import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    onSearch(value);
  };

  return (
    <div className="flex justify-center items-center p-4 bg-gray-100">
      <input
        type="search"
        placeholder="Search products..."
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
}