// src/components/ShoppingAndBrowse/ProductCategoryDetails.tsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { SearchBar } from "./ProductComponents";
import ProductFilters from "./ProductFilters";
import ProductDisplay from "./ProductDisplay";

export const LKR_EXCHANGE_RATE = 1;

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

const PRODUCTS_PER_PAGE = 9;

const ProductCategoryDetails: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const originalCategoryName = queryParams.get("originalName");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");

  const [sortOrder, setSortOrder] = useState("popularityDesc");
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 5000 * LKR_EXCHANGE_RATE,
  });
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const toSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/ & /g, "-and-")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const categoryNameMap: { [key: string]: string } = {
    "Woman's Fashion": "Apparel",
    "Men's Fashion": "Apparel",
    "Electronic Devices": "Electronics",
    "Home & Lifestyle": "Home & Living",
    "Sports & Outdoor": "Sports",
    "Health & Beauty": "Beauty & Personal Care",
    "Toys & Games": "Toys & Games",
    "Groceries & Pets": "Groceries & Pets",
    Medicine: "Medicine",
    "Electronic Accessories": "Electronic Accessories",
    "Automotive & Motorbike": "Automotive & Motorbike",
    "Watches & Accessories": "Watches & Accessories",
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const categoryToFetch =
        selectedCategory && selectedCategory !== "All Categories"
          ? categoryNameMap[selectedCategory] || selectedCategory
          : "";

      const queryParams = new URLSearchParams();
      if (currentSearchTerm) {
        queryParams.append("keyword", currentSearchTerm);
      }
      if (categoryToFetch) {
        queryParams.append("category", categoryToFetch);
      }

      const response = await fetch(
        `http://localhost:5000/api/products?${queryParams.toString()}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Product[] = await response.json();
      setProducts(data);
    } catch (err: any) {
      console.error("Error fetching products:", err);
      setError(
        "Failed to fetch products. Please try again later. Error: " +
          err.message
      );
    } finally {
      setLoading(false);
    }
  }, [currentSearchTerm, selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (categorySlug) {
      const initialCategory =
        originalCategoryName ||
        categorySlug
          .replace(/-/g, " ")
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      setSelectedCategory(initialCategory);
    } else {
      setSelectedCategory("");
    }
  }, [categorySlug, originalCategoryName]);

  const uniqueBrands = useMemo(() => {
    const brands = new Set<string>();
    products.forEach((p) => {
      if (p.brand) {
        brands.add(p.brand);
      }
    });
    return Array.from(brands).sort();
  }, [products]);

  const uniqueCategories = useMemo(() => {
    const categories = new Set<string>();
    products.forEach((p) => {
      if (p.category) {
        categories.add(p.category);
      }
    });
    return Array.from(categories).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    let currentFiltered = products;

    currentFiltered = currentFiltered.filter(
      (product) =>
        product.price * LKR_EXCHANGE_RATE >= priceRange.min &&
        product.price * LKR_EXCHANGE_RATE <= priceRange.max
    );

    if (selectedBrands.length > 0) {
      currentFiltered = currentFiltered.filter(
        (product) => product.brand && selectedBrands.includes(product.brand)
      );
    }

    currentFiltered = currentFiltered.filter(
      (product) => (product.rating || 0) >= minRating
    );

    currentFiltered = [...currentFiltered].sort((a, b) => {
      if (sortOrder === "priceAsc") {
        return a.price - b.price;
      } else if (sortOrder === "priceDesc") {
        return b.price - a.price;
      } else if (sortOrder === "popularityDesc") {
        return (b.rating || 0) - (a.rating || 0);
      }
      return 0;
    });

    return currentFiltered;
  }, [
    products,
    sortOrder,
    priceRange,
    selectedBrands,
    minRating,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [currentSearchTerm, sortOrder, priceRange, selectedBrands, minRating, selectedCategory]);

  const handleSearch = (searchTerm: string) => {
    setCurrentSearchTerm(searchTerm);
  };

  const displayCategoryName =
    originalCategoryName || categorySlug?.replace(/-/g, " ") || "Products";

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
        <Header />
        <main className="flex-grow container mx-auto p-4 md:p-8 text-center text-gray-600 text-lg">
          Loading products...
        </main>
        <Footer />
      </div>
    );
  if (error)
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
        <Header />
        <main className="flex-grow container mx-auto p-4 md:p-8 text-center text-red-600 text-lg">
          Error: {error}
        </main>
        <Footer />
      </div>
    );

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 font-inter">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8 mt-4 capitalize">
          {displayCategoryName} Products
        </h1>
        <SearchBar onSearch={handleSearch} />
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <ProductFilters
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            minRating={minRating}
            setMinRating={setMinRating}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            uniqueBrands={uniqueBrands}
            uniqueCategories={uniqueCategories}
            toSlug={toSlug}
          />

          <ProductDisplay
            products={paginatedProducts}
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
            hasSearchTerm={currentSearchTerm !== ""}
            totalFilteredProducts={filteredProducts.length}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductCategoryDetails;