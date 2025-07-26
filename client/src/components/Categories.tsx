import {
  Shirt,          // Woman's Fashion, Men's Fashion
  Laptop,         // Electronic Devices
  Home,           // Home & Lifestyle
  Pill,           // Medicine
  Dumbbell,       // Sports & Outdoor
  // Toy,            // Toys & Games - REMOVED
  Bone,           // Groceries & Pets
  Heart,          // Health & Beauty
  Headphones,     // Electronic Accessories
  Car,            // Automotive & Motorbike
  Watch           // Watches & Accessories
} from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// Helper function to convert category name to a URL-friendly slug
const toSlug = (name: string): string => {
  return name.toLowerCase().replace(/ & /g, '-and-').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
};

const categories = [
  { name: "Woman's Fashion", icon: Shirt, color: 'from-pink-500 to-rose-500', count: '120+' },
  { name: "Men's Fashion", icon: Shirt, color: 'from-blue-500 to-indigo-500', count: '100+' },
  { name: "Electronic Devices", icon: Laptop, color: 'from-green-500 to-emerald-500', count: '150+' },
  { name: "Home & Lifestyle", icon: Home, color: 'from-purple-500 to-violet-500', count: '200+' },
  { name: "Medicine", icon: Pill, color: 'from-red-500 to-orange-500', count: '80+' },
  { name: "Sports & Outdoor", icon: Dumbbell, color: 'from-yellow-500 to-amber-500', count: '95+' },
  // { name: "Toys & Games", icon: Toy, color: 'from-cyan-500 to-teal-500', count: '70+' }, // REMOVED
  { name: "Groceries & Pets", icon: Bone, color: 'from-lime-500 to-green-500', count: '180+' },
  { name: "Health & Beauty", icon: Heart, color: 'from-rose-500 to-pink-500', count: '130+' },
  { name: "Electronic Accessories", icon: Headphones, color: 'from-indigo-500 to-blue-500', count: '110+' },
  { name: "Automotive & Motorbike", icon: Car, color: 'from-gray-500 to-slate-500', count: '65+' },
  { name: "Watches & Accessories", icon: Watch, color: 'from-orange-500 to-red-500', count: '50+' },
];

const Categories = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Explore Our Product Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover a world of products tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const categorySlug = toSlug(category.name); // Generate slug
            const originalCategoryName = encodeURIComponent(category.name); // Encode original name

            return (
              <Link // Use Link component for navigation
                key={category.name}
                to={`/products/category/${categorySlug}?originalName=${originalCategoryName}`}
                className="group cursor-pointer animate-fade-in hover-scale"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br bg-gray-50 p-6 text-center transition-all duration-300 hover:shadow-xl">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${category.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8" />
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {category.count} items
                  </p>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl bg-blue-600"></div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;