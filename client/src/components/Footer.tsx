import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Send, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin, ShoppingCart, ArrowRight } from 'lucide-react'; // Added Lucide icons

const Footer = () => (
  <footer className="bg-gray-900 text-gray-200 pt-16 px-4 md:px-8 lg:px-16 mt-auto shadow-inner border-t border-blue-900">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">

      {/* Column 1: Brand & Newsletter Subscription */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <ShoppingCart className="h-8 w-8 text-blue-400" />
          <h3 className="font-extrabold text-3xl text-white tracking-wider">Innocart</h3>
        </div>
        <p className="text-gray-400 text-md leading-relaxed">
          Unlock a world of possibilities with <span className="font-semibold text-blue-300">Innocart</span>. Your trusted partner for quality products and seamless shopping experiences.
        </p>
        <p className="text-lg font-medium text-blue-300">Subscribe to our newsletter</p>
        <p className="text-sm text-gray-400 -mt-2">Get 10% off your first order!</p>

        <div className="relative w-full mt-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full bg-gray-800 text-white placeholder-gray-500 text-sm border border-gray-700 rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
            aria-label="Email for newsletter subscription"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-3 flex items-center justify-center text-blue-400 hover:text-blue-300 transition-colors duration-300"
            aria-label="Subscribe"
          >
            <Send className="w-5 h-5 rotate-[45deg]" />
          </button>
        </div>
      </div>

      {/* Column 2: Support & Contact Info */}
      <div className="space-y-4">
        <h4 className="font-bold text-xl text-white mb-4">Support</h4>
        <div className="flex items-start space-x-3 text-gray-300">
          <MapPin className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
          <p>111 Galle Road, Colombo 04, Sri Lanka.</p>
        </div>
        <div className="flex items-center space-x-3 text-gray-300">
          <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
          <p><a href="mailto:support@innocart.com" className="hover:text-blue-300 transition-colors duration-200">support@innocart.com</a></p>
        </div>
        <div className="flex items-center space-x-3 text-gray-300">
          <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
          <p><a href="tel:+94712345678" className="hover:text-blue-300 transition-colors duration-200">+94-71-234-5678</a></p>
        </div>
        <p className="text-gray-400 text-sm mt-4">Working Hours: Mon - Fri, 9 AM - 5 PM (SLST)</p>
      </div>

      {/* Column 3: My Account Links */}
      <div className="space-y-4">
        <h4 className="font-bold text-xl text-white mb-4">Account & Links</h4>
        <ul className="space-y-2">
          <li>
            <Link to="/my-account" className="flex items-center space-x-2 text-gray-300 hover:text-blue-300 transition-colors duration-200 group">
              <ArrowRight className="h-4 w-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
              <span>My Account</span>
            </Link>
          </li>
          <li>
            <Link to="/login" className="flex items-center space-x-2 text-gray-300 hover:text-blue-300 transition-colors duration-200 group">
              <ArrowRight className="h-4 w-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
              <span>Login</span>
            </Link>
          </li>
          <li>
            <Link to="/signup" className="flex items-center space-x-2 text-gray-300 hover:text-blue-300 transition-colors duration-200 group">
              <ArrowRight className="h-4 w-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
              <span>Register</span>
            </Link>
          </li>
          <li>
            <Link to="/cart" className="flex items-center space-x-2 text-gray-300 hover:text-blue-300 transition-colors duration-200 group">
              <ArrowRight className="h-4 w-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
              <span>View Cart</span>
            </Link>
          </li>
          <li>
            <Link to="/wishlist" className="flex items-center space-x-2 text-gray-300 hover:text-blue-300 hover:underline transition-colors duration-200 group">
              <ArrowRight className="h-4 w-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
              <span>Wishlist</span>
            </Link>
          </li>
          <li>
            <Link to="/shop" className="flex items-center space-x-2 text-gray-300 hover:text-blue-300 transition-colors duration-200 group">
              <ArrowRight className="h-4 w-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
              <span>Shop All</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Column 4: Quick Links & Social Media */}
      <div className="space-y-4">
        <h4 className="font-bold text-xl text-white mb-4">Quick Links</h4>
        <ul className="space-y-2">
          <li>
            <Link to="/privacy-policy" className="flex items-center space-x-2 text-gray-300 hover:text-blue-300 transition-colors duration-200 group">
              <ArrowRight className="h-4 w-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
              <span>Privacy Policy</span>
            </Link>
          </li>
          <li>
            <Link to="/terms-of-use" className="flex items-center space-x-2 text-gray-300 hover:text-blue-300 transition-colors duration-200 group">
              <ArrowRight className="h-4 w-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
              <span>Terms Of Use</span>
            </Link>
          </li>
          <li>
            <Link to="/faq" className="flex items-center space-x-2 text-gray-300 hover:text-blue-300 transition-colors duration-200 group">
              <ArrowRight className="h-4 w-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
              <span>FAQ</span>
            </Link>
          </li>
          <li>
            <Link to="/contact" className="flex items-center space-x-2 text-gray-300 hover:text-blue-300 transition-colors duration-200 group">
              <ArrowRight className="h-4 w-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
              <span>Contact Us</span>
            </Link>
          </li>
        </ul>
        <div className="flex space-x-4 mt-6">
          <a href="https://facebook.com/your-innocart-page" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Facebook className="h-6 w-6 text-gray-400 hover:text-blue-500 transition-colors duration-200" />
          </a>
          <a href="https://twitter.com/your-innocart-page" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <Twitter className="h-6 w-6 text-gray-400 hover:text-blue-400 transition-colors duration-200" />
          </a>
          <a href="https://instagram.com/your-innocart-page" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram className="h-6 w-6 text-gray-400 hover:text-pink-500 transition-colors duration-200" />
          </a>
          <a href="https://linkedin.com/company/your-innocart-page" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="h-6 w-6 text-gray-400 hover:text-blue-700 transition-colors duration-200" />
          </a>
        </div>
      </div>
    </div>

    {/* Copyright Section */}
    <hr className="border-t border-gray-700 w-full mt-16 mb-8" />

    <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left text-sm text-gray-500 pb-8">
      <p>&copy; {new Date().getFullYear()} Innocart. All rights reserved.</p>
      <div className="flex items-center space-x-2 mt-4 sm:mt-0">
        <span className="text-gray-600">Built with ❤️ in Sri Lanka</span>
        {/* You can add payment icons here if relevant */}
        {/* <img src="/path/to/visa.png" alt="Visa" className="h-5" /> */}
      </div>
    </div>
  </footer>
);

export default Footer;