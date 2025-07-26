// src/pages/FeaturedProductDetails.tsx - (Modal එකක් ඇතුළත පෙන්වීමට සකස් කරන ලද component එක)
import React, { useState, useEffect } from 'react';
// useParams එක මේ component එක modal එකක් විදියට භාවිතා කරන නිසා අවශ්‍ය වෙන්නේ නෑ.
// productId prop එකක් විදියට ලැබෙනවා.

interface Product {
  _id: string; // Product ID එක
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  countInStock: number;
  brand?: string; // Optional
  rating?: number; // Optional
  popularity?: number; // Optional
}

interface FeaturedProductDetailsProps {
  productId: string; // Product ID එක prop එකක් ලෙස ලබා ගනී
  onClose: () => void; // Modal එක වසන්නට function එකක්
}

export default function FeaturedProductDetails({ productId, onClose }: FeaturedProductDetailsProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // Mock data for demonstration, replace with actual API call if you have a backend
        // මේ data set එක ඔබේ FeaturedProducts.tsx එකේ තියෙන data set එකට match වෙන්න ඕනේ
        const mockProducts = [
          {
            _id: '1',
            name: 'Premium Wireless Headphones',
            description: 'Experience crystal clear sound with these premium wireless headphones. Perfect for music lovers and professionals alike.',
            price: 299.99,
            category: 'Electronics',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
            countInStock: 50,
            brand: 'AudioTech',
            rating: 4.8,
            popularity: 324,
          },
          {
            _id: '2',
            name: 'Smart Watch Series X',
            description: 'Stay connected and track your fitness with the new Smart Watch Series X. Features advanced health monitoring.',
            price: 449.99,
            category: 'Wearables',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
            countInStock: 30,
            brand: 'TechGear',
            rating: 4.9,
            popularity: 156,
          },
          {
            _id: '3',
            name: 'Professional Camera Lens',
            description: 'Capture stunning photos with this high-quality professional camera lens. Ideal for various photography styles.',
            price: 824.99,
            category: 'Photography',
            image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop',
            countInStock: 15,
            brand: 'PhotoPro',
            rating: 4.7,
            popularity: 89,
          },
          {
            _id: '4',
            name: 'Minimalist Backpack',
            description: 'A sleek and durable backpack designed for daily use. Perfect for carrying your essentials in style.',
            price: 119.99,
            category: 'Bags',
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
            countInStock: 100,
            brand: 'UrbanCarry',
            rating: 4.6,
            popularity: 267,
          },
          {
            _id: '5',
            name: 'Bluetooth Speaker Pro',
            description: 'Enjoy powerful and portable sound with this Bluetooth speaker. Long battery life and rich bass.',
            price: 194.99,
            category: 'Audio',
            image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
            countInStock: 40,
            brand: 'SoundBlast',
            rating: 4.5,
            popularity: 198,
          },
          {
            _id: '6',
            name: 'Gaming Mechanical Keyboard',
            description: 'Gain the competitive edge with this responsive mechanical keyboard. Designed for ultimate gaming performance.',
            price: 224.99,
            category: 'Gaming',
            image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop',
            countInStock: 25,
            brand: 'GamerGear',
            rating: 4.8,
            popularity: 445,
          },
        ];

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500)); 
        
        // productId එක string නිසා, mockProducts වල _id field එකට match කරන්න.
        const foundProduct = mockProducts.find(p => p._id === String(productId));

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          throw new Error('Product not found');
        }
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  if (loading) return <div className="text-center p-4">Loading product details...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  if (!product) return <div className="text-center p-4">Product not found.</div>;

  const imageUrl = product.image.startsWith('http') || product.image.startsWith('/')
    ? product.image
    : `/${product.image}`;

  return (
    <div className="relative p-4"> {/* Modal content container */}
      <button 
        onClick={onClose} 
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold"
      >
        &times; {/* Close button */}
      </button>
      <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-72 w-full object-cover md:w-72" // Modal එකට ගැලපෙන විදියට size අඩු කළා
              src={imageUrl}
              alt={product.name}
            />
          </div>
          <div className="p-6 flex flex-col justify-between"> {/* padding අඩු කළා */}
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{product.name}</h1> {/* font size අඩු කළා */}
              <p className="text-gray-600 text-base mb-3">{product.description}</p> {/* font size අඩු කළා */}
              <p className="text-4xl font-bold text-indigo-600 mb-4">LKR {product.price.toFixed(2)}</p> {/* font size අඩු කළා */}

              {/* Product Info Table */}
              <div className="bg-gray-50 p-3 rounded-lg mb-4"> {/* padding අඩු කළා */}
                <table className="min-w-full text-sm text-gray-700">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-1 px-2 font-semibold">Category:</td> {/* padding අඩු කළා */}
                      <td className="py-1 px-2">{product.category}</td> {/* padding අඩු කළා */}
                    </tr>
                    <tr className="border-b">
                      <td className="py-1 px-2 font-semibold">Brand:</td>
                      <td className="py-1 px-2">{product.brand || 'N/A'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-1 px-2 font-semibold">In Stock:</td>
                      <td className="py-1 px-2">{product.countInStock > 0 ? `${product.countInStock} items` : 'Out of Stock'}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 font-semibold">Rating:</td>
                      <td className="py-1 px-2">{product.rating ? `${product.rating}/5` : 'N/A'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Add to Cart/Wishlist Buttons (Example - you'll integrate actual logic) */}
              <div className="flex space-x-3"> {/* space අඩු කළා */}
                <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 text-sm"> {/* padding, font size අඩු කළා */}
                  Add to Cart
                </button>
                <button className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-300 text-sm"> {/* padding, font size අඩු කළා */}
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}