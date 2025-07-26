
import React from "react";
import { Link } from "react-router-dom"; 

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  brand?: string;
  rating?: number;
}

interface ProductDisplayProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  hasSearchTerm: boolean;
  totalFilteredProducts: number;
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({
  products,
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
  hasSearchTerm,
  totalFilteredProducts,
}) => {
  if (products.length === 0 && (hasSearchTerm || totalFilteredProducts === 0)) {
    return (
      <div className="md:flex-1 w-full p-4 bg-white rounded-lg shadow-md flex items-center justify-center min-h-[300px]">
        <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="md:flex-1 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          // Use product._id for the key and in the Link path
          <Link
            key={product._id}
            to={`/product/${product._id}`} // Use product._id here
            className="group block bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-indigo-600 transition-colors duration-300 truncate">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mb-2 truncate">
                {product.category}
              </p>
              <p className="text-xl font-bold text-indigo-700">
                LKR {product.price.toFixed(2)}
              </p>
              {product.rating && (
                <div className="flex items-center mt-2 text-yellow-500 text-sm">
                  {"★".repeat(Math.floor(product.rating))}
                  {"☆".repeat(5 - Math.floor(product.rating))}
                  <span className="ml-1 text-gray-600">({product.rating})</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-4">
          <button
            onClick={onPrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <span className="text-lg font-medium text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={onNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDisplay;