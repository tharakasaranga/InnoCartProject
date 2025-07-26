// src/pages/ProductListingPage.tsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom"; // URL queries ලබා ගැනීමට
import SearchBar from "./SearchBar";
import ProductCard from "./ProductCard";
import Header from "../Header";
import Footer from "../Footer";

export default function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");

  // New state for sorting and filtering
  const [sortOrder, setSortOrder] = useState("popularityDesc"); // 'priceAsc', 'priceDesc', 'popularityDesc'
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 }); // Default max price, adjust based on actual product data
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minRating, setMinRating] = useState(0); // Minimum rating (e.g., 0 for any, 3 for 3 stars and up)
  const [selectedCategory, setSelectedCategory] = useState(""); // New state for selected category

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // Number of products to display per page

  const location = useLocation(); // URL location object එක ලබා ගනී

  // Function to fetch all products from the backend
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/api/products");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
      // No initial filtering here, useEffect below will handle it
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []); // No dependencies, as it only fetches raw product data once

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Use useMemo to get unique brands from the fetched products
  const uniqueBrands = useMemo(() => {
    const brands = new Set();
    products.forEach((p) => {
      if (p.brand) {
        // Ensure brand exists
        brands.add(p.brand);
      }
    });
    return Array.from(brands).sort(); // Sort brands alphabetically for display
  }, [products]);

  // Use useMemo to get unique categories from the fetched products
  const uniqueCategories = useMemo(() => {
    const categories = new Set();
    products.forEach((p) => {
      if (p.category) {
        categories.add(p.category);
      }
    });
    return Array.from(categories).sort(); // Sort categories alphabetically for display
  }, [products]);

  // Unified effect to apply all filters, search, and sorting whenever relevant state changes
  useEffect(() => {
    let currentFiltered = products;

    // 1. Apply Category Filter (from URL query parameter OR internal state)
    const queryParams = new URLSearchParams(location.search);
    const urlCategoryFilter = queryParams.get("category");

    // Prioritize URL category if present, otherwise use internal state
    const activeCategoryFilter = urlCategoryFilter || selectedCategory;

    if (activeCategoryFilter) {
      currentFiltered = currentFiltered.filter(
        (product) =>
          product.category &&
          product.category.toLowerCase().replace(/[^a-z0-9]/g, "-") ===
            activeCategoryFilter.toLowerCase().replace(/[^a-z0-9]/g, "-")
      );
    }

    // 2. Apply Search Filter
    if (currentSearchTerm) {
      const lowercasedSearchTerm = currentSearchTerm.toLowerCase();
      currentFiltered = currentFiltered.filter(
        (product) =>
          (product.name &&
            product.name.toLowerCase().includes(lowercasedSearchTerm)) ||
          (product.description &&
            product.description.toLowerCase().includes(lowercasedSearchTerm)) ||
          (product.category &&
            product.category.toLowerCase().includes(lowercasedSearchTerm))
      );
    }

    // 3. Apply Price Range Filter
    currentFiltered = currentFiltered.filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max
    );

    // 4. Apply Brand Filter
    if (selectedBrands.length > 0) {
      currentFiltered = currentFiltered.filter(
        (product) => product.brand && selectedBrands.includes(product.brand)
      );
    }

    // 5. Apply Rating Filter (assuming 'rating' property exists for products)
    currentFiltered = currentFiltered.filter(
      (product) => product.rating >= minRating
    );

    // 6. Apply Sorting
    currentFiltered = [...currentFiltered].sort((a, b) => {
      // Create a shallow copy to avoid mutating original 'currentFiltered' array directly
      if (sortOrder === "priceAsc") {
        return a.price - b.price;
      } else if (sortOrder === "priceDesc") {
        return b.price - a.price;
      } else if (sortOrder === "popularityDesc") {
        return b.rating - a.rating; 
      }
      return 0; 
    });

    setFilteredProducts(currentFiltered);
    setCurrentPage(1); 
  }, [
    products,
    location.search,
    currentSearchTerm,
    sortOrder,
    priceRange,
    selectedBrands,
    minRating,
    selectedCategory,
  ]);


  const handleSearch = (searchTerm) => {
    setCurrentSearchTerm(searchTerm);
  };


  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle page change
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (loading)
    return <div className="text-center p-4">Loading products...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <>
      <Header /> {/* Header component remains unchanged */}
      <div className="container mx-auto p-4 font-inter">
        {" "}
        {/* Added font-inter for professional look */}
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8 mt-4">
          Discover Our Products
        </h1>
        <SearchBar onSearch={handleSearch} />
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          {/* Filters and Sorting Sidebar */}
          <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-xl border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-300">
              Filters & Sorting
            </h2>

            {/* Sorting */}
            <div className="mb-8">
              <label
                htmlFor="sort-by"
                className="block text-gray-700 text-sm font-semibold mb-3"
              >
                Sort By:
              </label>
              <div className="relative">
                <select
                  id="sort-by"
                  className="block appearance-none w-full bg-gray-50 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 transition duration-200 ease-in-out shadow-sm"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="popularityDesc">
                    Popularity (High to Low)
                  </option>
                  <option value="priceAsc">Price (Low to High)</option>
                  <option value="priceDesc">Price (High to Low)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Category:
              </h3>
              <div className="max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="category-all"
                    name="product-category"
                    value=""
                    checked={selectedCategory === ""}
                    onChange={() => setSelectedCategory("")}
                    className="form-radio h-5 w-5 text-indigo-600 transition duration-150 ease-in-out focus:ring-2 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="category-all"
                    className="ml-3 text-gray-700 text-base cursor-pointer"
                  >
                    All Categories
                  </label>
                </div>
                {uniqueCategories.length > 0 ? (
                  uniqueCategories.map((category) => (
                    <div key={category} className="flex items-center mb-2">
                      <input
                        type="radio"
                        id={`category-${category
                          .toLowerCase()
                          .replace(/[^a-z0-9]/g, "-")}`}
                        name="product-category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="form-radio h-5 w-5 text-indigo-600 transition duration-150 ease-in-out focus:ring-2 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`category-${category
                          .toLowerCase()
                          .replace(/[^a-z0-9]/g, "-")}`}
                        className="ml-3 text-gray-700 text-base cursor-pointer"
                      >
                        {category}
                      </label>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm italic">
                    No categories available to filter.
                  </p>
                )}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Price Range:
              </h3>
              <div className="flex items-center space-x-3">
                <input
                  type="number"
                  placeholder="Min"
                  className="shadow-sm appearance-none border border-gray-300 rounded-lg w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500 transition duration-200"
                  value={priceRange.min === 0 ? "" : priceRange.min}
                  onChange={(e) =>
                    setPriceRange((prev) => ({
                      ...prev,
                      min: Number(e.target.value) || 0,
                    }))
                  }
                  min="0"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="shadow-sm appearance-none border border-gray-300 rounded-lg w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500 transition duration-200"
                  value={priceRange.max === Infinity ? "" : priceRange.max}
                  onChange={(e) =>
                    setPriceRange((prev) => ({
                      ...prev,
                      max: Number(e.target.value) || Infinity,
                    }))
                  }
                  min="0"
                />
              </div>
              <p className="text-gray-600 text-xs mt-2">
                Current: ${priceRange.min} -{" "}
                {priceRange.max === Infinity ? "Max" : `$${priceRange.max}`}
              </p>
            </div>

            {/* Brand Filter */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Brand:
              </h3>
              <div className="max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {" "}
                {/* Max height for scrollable brand list */}
                {uniqueBrands.length > 0 ? (
                  uniqueBrands.map((brand) => (
                    <div key={brand} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`brand-${brand}`}
                        value={brand}
                        checked={selectedBrands.includes(brand)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedBrands((prev) => [...prev, brand]);
                          } else {
                            setSelectedBrands((prev) =>
                              prev.filter((b) => b !== brand)
                            );
                          }
                        }}
                        className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out rounded-md focus:ring-2 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`brand-${brand}`}
                        className="ml-3 text-gray-700 text-base cursor-pointer"
                      >
                        {brand}
                      </label>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm italic">
                    No brands available to filter.
                  </p>
                )}
              </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Minimum Rating:
              </h3>
              {[5, 4, 3, 2, 1, 0].map((rating) => (
                <div key={rating} className="flex items-center mb-2">
                  <input
                    type="radio"
                    id={`rating-${rating}`}
                    name="min-rating"
                    value={rating}
                    checked={minRating === rating}
                    onChange={() => setMinRating(rating)}
                    className="form-radio h-5 w-5 text-indigo-600 transition duration-150 ease-in-out focus:ring-2 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={`rating-${rating}`}
                    className="ml-3 text-gray-700 text-base cursor-pointer"
                  >
                    {rating === 0 ? "Any Rating" : `${rating} Stars & Up`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="w-full md:w-3/4">
            {filteredProducts.length === 0 && currentSearchTerm !== "" && (
              <p className="text-center text-gray-500 text-lg mt-4 p-4 bg-yellow-50 rounded-lg shadow-md">
                No products found matching your search criteria.
              </p>
            )}
            {filteredProducts.length === 0 && currentSearchTerm === "" && (
              <p className="text-center text-gray-500 text-lg mt-4 p-4 bg-yellow-50 rounded-lg shadow-md">
                No products available with the selected filters.
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 space-x-4">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`px-6 py-3 rounded-lg font-semibold transition duration-300 ease-in-out ${
                    currentPage === 1
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md"
                  }`}
                >
                  Previous
                </button>
                <span className="text-lg font-medium text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-6 py-3 rounded-lg font-semibold transition duration-300 ease-in-out ${
                    currentPage === totalPages
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer /> 
    </>
  );
}