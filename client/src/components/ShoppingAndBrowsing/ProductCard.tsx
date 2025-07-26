import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Eye } from 'lucide-react'; 
interface Product {
  _id: string; 
  name: string;
  description: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imageUrl = product.image.startsWith('http') || product.image.startsWith('/')
    ? product.image
    : `/${product.image}`;


  const dummyRating = 4; 

  return (
    <div className="group relative block w-full h-auto rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 overflow-hidden bg-white border border-gray-200">
      <Link to={`/product/${product._id}`} className="block h-full"> {/* Make the whole card clickable */}
        <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{product.name}</h3>
          
          {/* Dummy Rating Display */}
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < dummyRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
              />
            ))}
            {/* <span className="text-gray-600 text-sm ml-2">({product.numReviews || 0} reviews)</span> */}
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
          
          <div className="mt-auto pt-2 flex items-center justify-between">
            <p className="text-2xl font-bold text-blue-700">LKR {product.price.toFixed(2)}</p>
            

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium
                         opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0
                         transition-all duration-300 ease-in-out shadow-md hover:bg-blue-700
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                         flex items-center"
            >
              <Eye size={18} className="mr-1" /> View Details
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;