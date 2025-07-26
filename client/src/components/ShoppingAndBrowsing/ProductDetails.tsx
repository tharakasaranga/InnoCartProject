import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import Header from '../Header';
import Footer from '../Footer';
import ProductCard from './ProductCard';

interface Product {
  _id: string; 
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  countInStock: number;
  brand?: string;
  rating?: number; 
  popularity?: number; 
}

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      setError(null);
      try {
    
        const productResponse = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!productResponse.ok) {

          const errorText = await productResponse.text(); 
          throw new Error(`Failed to fetch product details: ${productResponse.status} - ${errorText || productResponse.statusText}`);
        }
        const currentProductData: Product = await productResponse.json();
        setProduct(currentProductData);

       
        if (currentProductData && currentProductData.category) {
          const relatedProductsResponse = await fetch(`http://localhost:5000/api/products?category=${currentProductData.category}`);
          if (!relatedProductsResponse.ok) {
            console.warn(`Could not fetch related products for category ${currentProductData.category}: ${relatedProductsResponse.status}`);
            setRelatedProducts([]); 
          } else {
            const allRelatedData: Product[] = await relatedProductsResponse.json();
            // Filter out the current product and limit to a few
            const filteredRelated = allRelatedData.filter(p => p._id !== currentProductData._id);
            setRelatedProducts(filteredRelated.slice(0, 4)); // Display up to 4 related products
          }
        } else {
            setRelatedProducts([]); // No category, no related products
        }

      } catch (err: any) {
        console.error("Error fetching product data:", err);
        setError(err.message || 'An unexpected error occurred while loading product details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductData();
    } else {
      setLoading(false);
      setError("No product ID provided in the URL.");
    }
  }, [id]); // Re-run effect if product ID changes

  // Loading, Error, Not Found states
  if (loading) return (
    <>
      <Header />
      <div className="flex-grow container mx-auto p-4 text-center text-gray-600 text-lg">Loading product details...</div>
      <Footer />
    </>
  );

  if (error) return (
    <>
      <Header />
      <div className="flex-grow container mx-auto p-4 text-center text-red-600 text-lg">
        Error: {error}
        <br />
        <p className="text-gray-500 text-sm mt-2">Please check your backend server logs for more details, or ensure the product ID is valid.</p>
      </div>
      <Footer />
    </>
  );

  if (!product) return (
    <>
      <Header />
      <div className="flex-grow container mx-auto p-4 text-center text-gray-600 text-lg">Product not found. Please verify the URL.</div>
      <Footer />
    </>
  );

  // Safely construct image URL
  const imageUrl = product.image ? (
    product.image.startsWith('http') || product.image.startsWith('/')
      ? product.image
      : `/${product.image}`
  ) : '/path/to/placeholder-image.jpg'; // Fallback for missing image

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 py-8 font-inter"> {/* Added py-8 for more vertical spacing */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-96 w-full object-cover md:w-96"
              src={imageUrl}
              alt={product.name || "Product Image"} // Fallback for alt text
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null; // Prevent infinite loop
                target.src = '/path/to/placeholder-image.jpg'; // Fallback on error
                console.warn(`Could not load image for product ${product.name}: ${product.image}`);
              }}
            />
          </div>
          <div className="p-8 flex flex-col justify-between flex-grow"> {/* Added flex-grow */}
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-3">{product.name || 'Untitled Product'}</h1> {/* Fallback */}
              <p className="text-gray-600 text-lg mb-4">{product.description || 'No description available.'}</p> {/* Fallback */}
              <p className="text-5xl font-bold text-indigo-600 mb-6">LKR {product.price?.toFixed(2) || '0.00'}</p> {/* Safe access price */}

              {/* Product Info Table */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <table className="min-w-full text-sm text-gray-700">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-semibold">Category:</td>
                      <td className="py-2 px-4">{product.category || 'N/A'}</td> {/* Fallback */}
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-semibold">Brand:</td>
                      <td className="py-2 px-4">{product.brand || 'N/A'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-semibold">In Stock:</td>
                      <td className="py-2 px-4">{product.countInStock !== undefined && product.countInStock !== null ? `${product.countInStock} items` : 'N/A'}</td> {/* Safe access */}
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-semibold">Rating:</td>
                      <td className="py-2 px-4">{product.rating ? `${product.rating}/5` : 'N/A'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Add to Cart/Wishlist Buttons */}
              <div className="flex space-x-4">
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300">
                  Add to Cart
                </button>
                <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-300">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Related Products</h2>
          {relatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No related products found in the same category.</p>
          )}
        </div>

        {/* Product Reviews Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Reviews</h2>
          <div className="bg-white p-6 rounded-lg shadow-xl">
              <p className="text-gray-600">Reviews section placeholder. This would typically involve fetching reviews via a separate API endpoint.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}