import React from "react";
import { LKR_EXCHANGE_RATE } from "./ProductCategoryDetails"; 

interface ProductFiltersProps {
  sortOrder: string;
  setSortOrder: (order: string) => void;
  priceRange: { min: number; max: number };
  setPriceRange: (range: { min: number; max: number }) => void;
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  uniqueBrands: string[];
  uniqueCategories: string[];
  toSlug: (name: string) => string; 
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  sortOrder,
  setSortOrder,
  priceRange,
  setPriceRange,
  selectedBrands,
  setSelectedBrands,
  minRating,
  setMinRating,
  selectedCategory,
  setSelectedCategory,
  uniqueBrands,
  uniqueCategories,
  toSlug, // Receive the helper function
}) => {
  return (
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
            <option value="popularityDesc">Popularity (High to Low)</option>
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
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Category:</h3>
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
                  id={`category-${toSlug(category)}`}
                  name="product-category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={() => setSelectedCategory(category)}
                  className="form-radio h-5 w-5 text-indigo-600 transition duration-150 ease-in-out focus:ring-2 focus:ring-indigo-500"
                />
                <label
                  htmlFor={`category-${toSlug(category)}`}
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
          Price Range (Rs):
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
          Current: Rs {priceRange.min} -{" "}
          {priceRange.max === Infinity ? "Max" : `Rs ${priceRange.max}`}
        </p>
      </div>

      {/* Brand Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Brand:</h3>
        <div className="max-h-48 overflow-y-auto pr-2 custom-scrollbar">
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
  );
};

export default ProductFilters;