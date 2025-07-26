import { useState } from 'react';
import { Search, ShoppingCart, Menu, User, Bell, Heart, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import AuthModal from './AuthModal';
import CartSidebar from './CartSidebar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCartSidebar, setShowCartSidebar] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false); // New state for products dropdown

  const { user, logout, isAuthenticated } = useAuth();
  const { totalItems } = useCart();

  const handleUserClick = () => {
    if (isAuthenticated) {
      setShowUserDetails(!showUserDetails);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserDetails(false);
  };

  return (
    <>
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="bg-white p-2 rounded-lg shadow-md">
                  <ShoppingCart className="h-6 w-6 text-blue-600" />
                </div>
                <h1 className="text-2xl font-extrabold text-white tracking-wide">
                  Innocart
                </h1>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-4">
              <Button asChild variant="ghost" className="text-white hover:bg-blue-500/30 hover:text-white rounded-full px-5 py-2 transition-all duration-300">
                <a href="/">Home</a>
              </Button>
              <Button asChild variant="ghost" className="text-white hover:bg-blue-500/30 hover:text-white rounded-full px-5 py-2 transition-all duration-300">
                <a href="/about">About</a>
              </Button>

              {/* Products Dropdown - Enhanced */}
              <div className="relative">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-blue-500/30 hover:text-white rounded-full px-5 py-2 transition-all duration-300 flex items-center"
                  onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
                >
                  Products <ChevronDown className={`ml-2 h-4 w-4 transform transition-transform duration-200 ${isProductsDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                </Button>
                {isProductsDropdownOpen && (
                  <ul className="absolute top-full left-0 bg-white text-gray-800 shadow-xl mt-2 rounded-lg overflow-hidden min-w-[200px] z-50 animate-fade-in-down">
                    <li>
                      <a href="/productCatogory" className="block px-4 py-3 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Products Category</a>
                    </li>
                    <li>
                      <a href="/productListing" className="block px-4 py-3 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Product Listing</a>
                    </li>
                   
                  </ul>
                )}
              </div>

              <Button asChild variant="ghost" className="text-white hover:bg-blue-500/30 hover:text-white rounded-full px-5 py-2 transition-all duration-300">
                <a href="/services">Services</a>
              </Button>
              <Button asChild variant="ghost" className="text-white hover:bg-blue-500/30 hover:text-white rounded-full px-5 py-2 transition-all duration-300">
                <a href="/contact">Contact Us</a>
              </Button>
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-3">
              {isAuthenticated && (
                <>
                  <Button variant="ghost" size="sm" className="text-white relative hover:bg-blue-500/30 transition-all duration-300">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center border border-white">
                      3
                    </span>
                  </Button>

                  <Button variant="ghost" size="sm" className="text-white hover:bg-blue-500/30 transition-all duration-300">
                    <Heart className="h-5 w-5" />
                  </Button>
                </>
              )}

              <Button
                variant="ghost"
                size="sm"
                className="relative text-white hover:bg-blue-500/30 transition-all duration-300"
                onClick={() => setShowCartSidebar(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-800 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce border border-white">
                    {totalItems}
                  </span>
                )}
              </Button>

              <div className="hidden md:flex items-center space-x-2 text-white cursor-pointer relative" onClick={handleUserClick}>
                <User className="h-5 w-5" />
                <span className="text-sm font-semibold">
                  {isAuthenticated ? user?.name?.split(' ')[0] : 'Sign In'}
                </span>
                {showUserDetails && isAuthenticated && user && (
                  // User details dropdown - kept as modal for richer info, but can be converted to dropdown too
                  <div className="absolute top-full right-0 bg-white text-gray-800 shadow-xl mt-2 rounded-lg overflow-hidden min-w-[250px] z-50 p-4 animate-fade-in-down">
                    <h4 className="font-bold text-lg mb-2">{user.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{user.email}</p>
                    <Button
                      className="w-full justify-start text-red-600 hover:bg-red-50"
                      variant="ghost"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                  </div>
                )}
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-white hover:bg-blue-500/30 transition-all duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/20 animate-slide-down">
              <nav className="flex flex-col space-y-3">
                <a href="/" className="text-white hover:text-blue-200 font-medium py-1">Home</a>
                <a href="/about" className="text-white hover:text-blue-200 font-medium py-1">About</a>
                {/* Mobile Products Dropdown */}
                <div className="relative">
                  <button
                    className="flex items-center justify-between w-full text-white hover:text-blue-200 font-medium py-1 pr-2"
                    onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
                  >
                    Products <ChevronDown className={`ml-2 h-4 w-4 transform transition-transform duration-200 ${isProductsDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                  </button>
                  {isProductsDropdownOpen && (
                    <div className="pl-4 pt-2 pb-1 space-y-2 animate-fade-in">
                      <a href="/productCatogory" className="block text-white/80 hover:text-white text-sm">Products Category</a>
                      <a href="/productListing" className="block text-white/80 hover:text-white text-sm">Product Listing</a>
                    </div>
                  )}
                </div>
                <a href="/services" className="text-white hover:text-blue-200 font-medium py-1">Services</a>
                <a href="/contact" className="text-white hover:text-blue-200 font-medium py-1">Contact Us</a>
                {isAuthenticated ? (
                    <button
                        onClick={handleLogout}
                        className="flex items-center text-red-200 hover:text-red-100 font-medium py-1"
                    >
                        <LogOut className="h-4 w-4 mr-2" /> Logout
                    </button>
                ) : (
                    <button
                        onClick={() => { setShowAuthModal(true); setIsMenuOpen(false); }}
                        className="flex items-center text-green-200 hover:text-green-100 font-medium py-1"
                    >
                        <User className="h-4 w-4 mr-2" /> Sign In
                    </button>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* User Details Modal (remains as a modal for more detailed info, can be styled further) */}
      {showUserDetails && isAuthenticated && user && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform scale-105 animate-zoom-in">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-4 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center shadow-inner">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover border-4 border-white" />
                ) : (
                  <User className="h-12 w-12 text-blue-600" />
                )}
              </div>
              <h3 className="text-3xl font-extrabold text-gray-900 mb-2">{user.name}</h3>
              <p className="text-purple-600 text-lg mb-6 font-semibold">
                {user.isSeller ? 'Seller' : 'Buyer'} Account
              </p>
              <div className="space-y-3 text-left bg-gray-50 p-6 rounded-xl border border-gray-100 mb-8">
                <p className="text-gray-700"><strong>Email:</strong> <span className="font-medium text-blue-700">{user.email}</span></p>
                <p className="text-gray-700"><strong>Phone:</strong> <span className="font-medium">{user.phone}</span></p>
                <p className="text-gray-700"><strong>Member Since:</strong> <span className="font-medium">{user.memberSince}</span></p>
                {user.isSeller && (
                  <>
                    <p className="text-gray-700"><strong>Rating:</strong> <span className="font-medium text-yellow-600">{user.rating}/5.0 ⭐</span></p>
                    <p className="text-gray-700"><strong>Total Sales:</strong> <span className="font-medium text-green-600">{user.totalSales}</span></p>
                  </>
                )}
                <p className="text-gray-700"><strong>Verified:</strong>
                  <span className={`font-semibold ${user.verified ? "text-green-600" : "text-orange-600"}`}>
                    {user.verified ? " ✓ Verified" : " Pending"}
                  </span>
                </p>
              </div>
              <div className="flex flex-col space-y-3">
                <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold shadow-md">
                  Edit Profile
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full text-red-600 border-red-300 hover:bg-red-50 py-3 rounded-lg text-lg font-semibold shadow-md"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </Button>
                <Button
                  onClick={() => setShowUserDetails(false)}
                  variant="ghost"
                  className="w-full text-gray-600 hover:bg-gray-100 py-3 rounded-lg text-lg font-semibold"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      <CartSidebar
        isOpen={showCartSidebar}
        onClose={() => setShowCartSidebar(false)}
      />
    </>
  );
};

export default Header;