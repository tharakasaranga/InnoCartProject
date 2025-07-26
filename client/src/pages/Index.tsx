
import { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductSearch from '../components/ProductSearch';
import ProductCard from '../components/ProductCard';
import Categories from '../components/Categories';
import Footer from '../components/Footer';

const mockProducts = [
  {
    id: '1',
    title: 'iPhone 15 Pro Max 256GB - Natural Titanium',
    price: 485000,
    originalPrice: 520000,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    seller: 'TechStore LK',
    rating: 4.9,
    bids: 15,
    timeLeft: '2d 5h',
    isAuction: true,
    isBuyNow: true,
    condition: 'new' as const,
    shipping: 'Free shipping',
    watchers: 45
  },
  {
    id: '2',
    title: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    seller: 'AudioHub',
    rating: 4.8,
    isAuction: false,
    isBuyNow: true,
    condition: 'new' as const,
    shipping: 'Free shipping',
    watchers: 28
  },
  {
    id: '3',
    title: 'MacBook Air M2 13" 256GB - Midnight',
    price: 325000,
    originalPrice: 350000,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
    seller: 'Apple Store Sri Lanka',
    rating: 5.0,
    bids: 8,
    timeLeft: '1d 12h',
    isAuction: true,
    isBuyNow: false,
    condition: 'new' as const,
    shipping: 'Free shipping',
    watchers: 67
  },
  {
    id: '4',
    title: 'Samsung Galaxy S24 Ultra 512GB - Titanium Black',
    price: 425000,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop',
    seller: 'MobileWorld',
    rating: 4.7,
    isAuction: false,
    isBuyNow: true,
    condition: 'new' as const,
    shipping: 'Free shipping',
    watchers: 33
  },
  {
    id: '5',
    title: 'Canon EOS R6 Mark II Mirrorless Camera Body',
    price: 645000,
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop',
    seller: 'PhotoPro LK',
    rating: 4.9,
    bids: 3,
    timeLeft: '3d 8h',
    isAuction: true,
    isBuyNow: true,
    condition: 'new' as const,
    shipping: 'Free shipping',
    watchers: 19
  },
  {
    id: '6',
    title: 'Nike Air Jordan 1 Retro High OG - Chicago',
    price: 45000,
    originalPrice: 55000,
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop',
    seller: 'SneakerHeadLK',
    rating: 4.6,
    isAuction: false,
    isBuyNow: true,
    condition: 'new' as const,
    shipping: 'LKR 1,500 shipping',
    watchers: 52
  }
];

const Index = () => {
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  const handleSearch = (query: string, filters: any) => {
    let filtered = mockProducts;
    
    if (query) {
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.seller.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map((p: string) => 
        p.includes('+') ? Infinity : parseInt(p)
      );
      filtered = filtered.filter(product => {
        if (max === Infinity) return product.price >= min;
        return product.price >= min && product.price <= max;
      });
    }

    if (filters.sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'ending') {
      filtered = [...filtered].sort((a, b) => {
        if (a.isAuction && !b.isAuction) return -1;
        if (!a.isAuction && b.isAuction) return 1;
        return 0;
      });
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <Hero />
      
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductSearch onSearch={handleSearch} />
          
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Featured Products ({filteredProducts.length})
            </h2>
            <div className="text-sm text-gray-600">
              Showing all results
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      <Categories />
      <Footer />
    </div>
  );
};

export default Index;
