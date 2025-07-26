// src/pages/ProductCategory.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ArrowUp, Truck, ShieldCheck, Headset, ArrowRight } from "lucide-react"; // Added new icons

// Import all category images
import menFashion from "../images/catogory/menFashion.jpg";
import womanFashion from "../images/catogory/womanFashion.jpg";
import electronicDevices from "../images/catogory/electronicDevices.jpg";
import HomeLifestyle from "../images/catogory/HomeLifestyle.jpg";
import Medicine from "../images/catogory/Medicine.jpg";
import SportsOutdoor from "../images/catogory/SportsOutdoor.jpg";
import toys from "../images/catogory/toys.jpg";
import GroceriesPets from "../images/catogory/GroceriesPets.jpg";
import HealthBeauty from "../images/catogory/HealthBeauty.jpg";
import ElectronicAccessories from "../images/catogory/ElectronicAccessories.jpg";
import AutomotiveMotorbike from "../images/catogory/AutomotiveMotorbike.jpg";
import WatchesAccessories from "../images/catogory/WatchesAccessories.jpg";

import Header from "../Header"; 
import Footer from "../Footer";



const ProductCategory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

  // Helper function to convert category names to slugs
  const toSlug = (name: string): string => {
    return name.toLowerCase().replace(/ & /g, '-and-').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  };

  // Array of category data including new descriptions for a richer display
  const categories = [
    { name: "Woman's Fashion", imageUrl: womanFashion, description: "Discover the latest trends in women's clothing, accessories, and more to enhance your style." },
    { name: "Men's Fashion", imageUrl: menFashion, description: "Explore stylish apparel, footwear, and accessories for every man, from casual to formal wear." },
    { name: "Electronic Devices", imageUrl: electronicDevices, description: "Shop for smartphones, laptops, tablets, and cutting-edge gadgets from top brands." },
    { name: "Home & Lifestyle", imageUrl: HomeLifestyle, description: "Everything for your home: decor, furniture, kitchenware, and lifestyle essentials for comfortable living." },
    { name: "Medicine", imageUrl: Medicine, description: "Health and wellness products, over-the-counter medicines, and healthcare essentials for your well-being." },
    { name: "Sports & Outdoor", imageUrl: SportsOutdoor, description: "Gear up for your favorite sports and outdoor adventures with our wide range of equipment and apparel." },
    { name: "Toys & Games", imageUrl: toys, description: "Fun and educational toys, board games, and video games for all ages, fostering creativity and entertainment." },
    { name: "Groceries & Pets", imageUrl: GroceriesPets, description: "Daily essentials, fresh produce, pet food, and supplies delivered to your door with convenience." },
    { name: "Health & Beauty", imageUrl: HealthBeauty, description: "Skincare, makeup, personal care, and wellness products for a radiant you, from head to toe." },
    { name: "Electronic Accessories", imageUrl: ElectronicAccessories, description: "Cables, chargers, cases, and all accessories for your electronic devices, ensuring seamless connectivity." },
    { name: "Automotive & Motorbike", imageUrl: AutomotiveMotorbike, description: "Parts, accessories, and essentials for cars and motorbikes, keeping your ride in top condition." },
    { name: "Watches & Accessories", imageUrl: WatchesAccessories, description: "Stylish watches, jewelry, and fashion accessories to complete your look and express your unique style." },
  ].map(category => ({ ...category, slug: toSlug(category.name), originalName: category.name })); // Add slug and originalName for routing

  // Handler for search button click
  const handleSearchClick = () => {
    if (searchTerm.trim()) {
      navigate(`/SearchProduct?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  // Handler for Enter key press in search input
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  // Handler for smooth scrolling to "All Product Categories" section
  const scrollToAllCategories = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault(); // Prevent default link behavior
    const element = document.getElementById('all-categories');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-inter">
      <Header />
     <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 px-4 overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight animate-fade-in-down">
            Discover a World of Products
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto animate-fade-in-up">
            Browse through our extensive collection of categories and find exactly what you need.
          </p>
        </div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-48 h-48 bg-white rounded-full mix-blend-overlay animate-blob"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-300 rounded-full mix-blend-overlay animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-56 h-56 bg-blue-300 rounded-full mix-blend-overlay animate-blob animation-delay-4000"></div>
        </div>
      </section>
      {/* --- Featured Categories Section --- */}
      <section className="container mx-auto p-4 md:p-8 mt-12 mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-8">
          Popular Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.slice(0, 3).map((category) => ( // Display top 3 popular categories
            <Link
              key={category.slug}
              to={`/products/category/${category.slug}?originalName=${encodeURIComponent(category.originalName)}`}
              className="group relative block w-full h-72 overflow-hidden rounded-lg shadow-md
                         hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300
                         ease-in-out border border-blue-100"
            >
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-full object-cover absolute inset-0 transition-transform
                           duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-800/80 via-blue-800/40 to-transparent
                               flex flex-col justify-end p-5 text-white">
                <h3 className="font-bold text-2xl mb-2 leading-tight group-hover:text-amber-300">
                  {category.name}
                </h3>
                <p className="text-sm opacity-90">
                  {category.description.split('.')[0]}. {/* Display first sentence of description */}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          {/* Modified Link to an <a> tag with onClick for smooth scroll */}
          <a
            href="#all-categories"
            onClick={scrollToAllCategories}
            className="text-blue-600 hover:text-blue-800 font-semibold text-lg flex items-center justify-center cursor-pointer"
          >
            View All Categories
            <ArrowRight className="ml-2" size={20} />
          </a>
        </div>
      </section>

      {/* --- Main Categories Grid --- */}
      <main className="flex-grow container mx-auto p-4 md:p-8">
        {/* Added id="all-categories" to the heading */}
        <h2 id="all-categories" className="text-4xl font-extrabold text-gray-900 text-center mb-12 mt-8">
          All Product Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/products/category/${category.slug}?originalName=${encodeURIComponent(category.originalName)}`}
              className="group relative block w-full h-80 overflow-hidden rounded-xl shadow-lg
                         hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300
                         ease-in-out border border-gray-200 bg-white"
            >
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-full object-cover absolute inset-0 transition-transform
                           duration-300 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-transparent
                               flex flex-col justify-end p-6 text-white">
                <h3 className="font-bold text-2xl mb-2 leading-tight group-hover:text-blue-300
                                 transition-colors duration-300">
                  {category.name}
                </h3>
                {/* Category Description - visible on hover */}
                <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-3 line-clamp-2">
                  {category.description}
                </p>
                <button
                  className="mt-auto bg-blue-600 text-white text-md px-6 py-3 rounded-full
                             opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0
                             transition-all duration-300 ease-in-out shadow-md hover:bg-blue-700
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-semibold w-fit"
                >
                  View Products
                </button>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* --- Why Shop With Us Section --- */}
      <section className="bg-white py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-12">
            Why Choose Our Store?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <Truck className="text-blue-600 mb-4" size={48} />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Fast & Free Delivery</h3>
              <p className="text-gray-600">Get your products delivered quickly and efficiently, right to your doorstep.</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <ShieldCheck className="text-green-600 mb-4" size={48} />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Secure Payments</h3>
              <p className="text-gray-600">Shop with confidence using our secure and reliable payment gateways.</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <Headset className="text-purple-600 mb-4" size={48} />
              <h3 className="text-xl font-bold text-gray-800 mb-2">24/7 Customer Support</h3>
              <p className="text-gray-600">Our dedicated support team is always here to help you with any queries.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* --- Scroll to top button --- */}
      <button
        id="scrollToTopBtn"
        className="fixed bottom-6 right-6 bg-blue-600 text-white w-14 h-14 rounded-full
                   flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all
                   duration-300 ease-in-out z-50 animate-bounce-slow"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        <ArrowUp size={28} />
      </button>
    </div>
  );
};

export default ProductCategory;