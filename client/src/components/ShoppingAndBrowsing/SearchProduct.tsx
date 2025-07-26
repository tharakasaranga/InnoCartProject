import React, { useEffect, useState } from 'react';
// import axios from 'axios'; // Uncomment when backend is ready
import { useSearchParams } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  image_url: string;
  price: number;
  sizes: string[];
}

const SearchProduct = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
 
    /*
    axios
      .get(`http://localhost/yourpath/search_products.php?query=${encodeURIComponent(query)}`)
      .then((res) => setResults(res.data))
      .catch((err) => console.error(err));
    */


    setResults([
      {
        id: 1,
        name: 'Plain Red T-shirt',
        image_url: '/images/red-tshirt.jpg',
        price: 1500,
        sizes: ['S', 'M', 'L', 'XL'],
      },
      {
        id: 2,
        name: 'Printed White Shirt',
        image_url: '/images/white-shirt.jpg',
        price: 1800,
        sizes: ['M', 'L', 'XL'],
      },
      {
        id: 3,
        name: 'Hoodies For Men',
        image_url: '/images/hoodie.jpg',
        price: 3500,
        sizes: ['L', 'XL'],
      },
    ]);
  }, [query]);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-pink-100 to-purple-200">
      <h1 className="text-2xl font-bold mb-4">
        Search Results for: <span className="italic text-purple-700">{query}</span>
      </h1>

      {results.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {results.map((product) => (
            <div key={product.id} className="bg-white rounded shadow p-4">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover mb-3"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>

              <div className="flex items-center gap-2 text-sm mt-2 flex-wrap">
                <span className="font-medium">Sizes:</span>
                {product.sizes.map((size, index) => (
                  <label key={index} className="flex items-center gap-1">
                    <input type="checkbox" checked readOnly />
                    {size}
                  </label>
                ))}
              </div>

              <div className="mt-2 text-sm">
                <span className="text-gray-600">Price:</span>
                <span className="ml-2 font-bold">{product.price} LKR</span>
              </div>

              <button className="mt-3 bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700">
                BUY
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchProduct;
