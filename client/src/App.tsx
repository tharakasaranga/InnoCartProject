import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ProductCategory from "./components/ShoppingAndBrowsing/ProductCategory";
import ProductListingPage from "./components/ShoppingAndBrowsing/ProductListingPage";
import ProductDetails from "./components/ShoppingAndBrowsing/ProductDetails";
import ProductCategoryDetails from "./components/ShoppingAndBrowsing/ProductCategoryDetails";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/productCatogory" element={<ProductCategory />} />
              <Route path="/productListing" element={<ProductListingPage />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/products/category/:categorySlug" element={<ProductCategoryDetails />} />
       
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;