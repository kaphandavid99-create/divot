"use client";

import { useState } from 'react';
import CarCard from '../components/CarCard';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface Car {
  id: number;
  name: string;
  price: string;
  image: string;
  category: 'buy' | 'rent';
  location: string;
  rating: number;
}

const carItems: Car[] = [
  { id: 1, name: 'Toyota Land Cruiser V8', price: '150.000 FCFA/jour', image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'rent', location: 'Douala, Cameroon', rating: 4.8 },
  { id: 2, name: 'Toyota Hilux 4x4', price: '85.000 FCFA/jour', image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'rent', location: 'Yaoundé, Cameroon', rating: 4.6 },
  { id: 3, name: 'Mercedes GLE', price: '180.000 FCFA/jour', image: 'https://images.pexels.com/photos/977003/pexels-photo-977003.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'rent', location: 'Douala, Cameroon', rating: 4.9 },
  { id: 4, name: 'Range Rover Sport', price: '55.000.000 FCFA', image: 'https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'buy', location: 'Douala, Cameroon', rating: 4.7 },
  { id: 5, name: 'Toyota Prado V6', price: '38.500.000 FCFA', image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'buy', location: 'Yaoundé, Cameroon', rating: 4.5 },
  { id: 6, name: 'Lexus LX 570', price: '85.000.000 FCFA', image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'buy', location: 'Douala, Cameroon', rating: 4.8 },
  { id: 7, name: 'BMW X5', price: '120.000 FCFA/jour', image: 'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'rent', location: 'Douala, Cameroon', rating: 4.7 },
  { id: 8, name: 'Audi Q7', price: '140.000 FCFA/jour', image: 'https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'rent', location: 'Yaoundé, Cameroon', rating: 4.6 },
  { id: 9, name: 'Toyota Camry', price: '25.000.000 FCFA', image: 'https://images.pexels.com/photos/627678/pexels-photo-627678.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'buy', location: 'Douala, Cameroon', rating: 4.4 },
  { id: 10, name: 'Mercedes C-Class', price: '32.000.000 FCFA', image: 'https://images.pexels.com/photos/977003/pexels-photo-977003.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'buy', location: 'Bafoussam, Cameroon', rating: 4.5 },
  { id: 11, name: 'Volkswagen Tiguan', price: '95.000 FCFA/jour', image: 'https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'rent', location: 'Douala, Cameroon', rating: 4.5 },
  { id: 12, name: 'Honda CR-V', price: '28.000.000 FCFA', image: 'https://images.pexels.com/photos/627678/pexels-photo-627678.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'buy', location: 'Yaoundé, Cameroon', rating: 4.3 },
];

// Helper function to extract car brand from name
const getCarBrand = (carName: string): string => {
  const brands = ['Toyota', 'Mercedes', 'Suzuki', 'Range Rover', 'Hyundai', 'Lexus', 'BMW', 'Audi', 'Volkswagen', 'Ford', 'Honda', 'Nissan'];
  for (const brand of brands) {
    if (carName.toLowerCase().includes(brand.toLowerCase())) {
      return brand;
    }
  }
  return carName.split(' ')[0]; // Return first word as brand if no match
};

const CarsPage = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'rent' | 'buy'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000000]);
  const [minYear, setMinYear] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [transmission, setTransmission] = useState('');
  const { user } = useAuth();

  // Initialize scroll animations
  useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  const filteredCars = carItems.filter(car => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      car.name.toLowerCase().includes(searchLower) ||
      getCarBrand(car.name).toLowerCase().includes(searchLower) ||
      car.location.toLowerCase().includes(searchLower);
    const matchesCategory = activeTab === 'all' || car.category === activeTab;
    
    const carPrice = parseInt(car.price.replace(/[^0-9]/g, ''));
    const matchesPrice = carPrice >= priceRange[0] && carPrice <= priceRange[1];
    
    const matchesYear = !minYear || true; // Would need year data in carItems
    const matchesFuel = !fuelType || true; // Would need fuel data in carItems
    const matchesTransmission = !transmission || true; // Would need transmission data in carItems
    
    return matchesSearch && matchesCategory && matchesPrice && matchesYear && matchesFuel && matchesTransmission;
  });

  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price':
        const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
        const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
        return priceA - priceB;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const rentCars = sortedCars.filter(car => car.category === 'rent');
  const buyCars = sortedCars.filter(car => car.category === 'buy');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl translate-y-1/2"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-fade-in-up">
              Find Your Perfect Ride
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Discover premium vehicles for rent or sale across Cameroon. From luxury SUVs to reliable daily drivers.
            </p>
            <div className="flex justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Link href="/" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300">
                Back Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .slide-in-left {
          opacity: 0;
          transform: translateX(-50px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: opacity, transform;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        
        .slide-in-left.visible {
          opacity: 1;
          transform: translateX(0);
        }
        
        .slide-in-right {
          opacity: 0;
          transform: translateX(50px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: opacity, transform;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        
        .slide-in-right.visible {
          opacity: 1;
          transform: translateX(0);
        }
        
        .scale-in {
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: opacity, transform;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        
        .scale-in.visible {
          opacity: 1;
          transform: scale(1);
        }
        
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
      `}} />

      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40 scroll-animate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl font-bold text-black">All Vehicles</h1>
            
            {/* Search */}
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search by name, brand, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
              />
              {searchTerm && (
                <div className="mt-2 text-xs text-gray-500">
                  Searching for: &quot;{searchTerm}&quot; in names, brands, and locations
                </div>
              )}
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value as 'all' | 'rent' | 'buy')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
              >
                <option value="all">All Vehicles</option>
                <option value="rent">For Rent</option>
                <option value="buy">For Sale</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'rating')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
                <option value="rating">Sort by Rating</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 border rounded-lg font-semibold transition-colors ${
                  showFilters 
                    ? 'bg-sky-500 text-white border-sky-500' 
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                Advanced Filters
              </button>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range (FCFA)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 100000000])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Minimum Year</label>
                  <select
                    value={minYear}
                    onChange={(e) => setMinYear(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                  >
                    <option value="">Any Year</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Fuel Type</label>
                  <select
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                  >
                    <option value="">Any Fuel</option>
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="electric">Electric</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Transmission</label>
                  <select
                    value={transmission}
                    onChange={(e) => setTransmission(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                  >
                    <option value="">Any</option>
                    <option value="automatic">Automatic</option>
                    <option value="manual">Manual</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setPriceRange([0, 100000000]);
                    setMinYear('');
                    setFuelType('');
                    setTransmission('');
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 font-semibold"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6`}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm scroll-animate scale-in stagger-1">
            <div className="text-2xl font-bold text-sky-600">{carItems.length}</div>
            <div className="text-sm text-gray-600">Total Vehicles</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm scroll-animate scale-in stagger-2">
            <div className="text-2xl font-bold text-green-600">{rentCars.length}</div>
            <div className="text-sm text-gray-600">For Rent</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm scroll-animate scale-in stagger-3">
            <div className="text-2xl font-bold text-blue-600">{buyCars.length}</div>
            <div className="text-sm text-gray-600">For Sale</div>
          </div>
        </div>
      </div>

      {/* Cars Grid */}
      <div id="cars-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Results Info */}
        {searchTerm && (
          <div className="mb-6 bg-sky-50 border border-sky-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sky-900 font-semibold">
                  {sortedCars.length} {sortedCars.length === 1 ? 'vehicle' : 'vehicles'} found
                </span>
                <span className="text-sky-700 ml-2">
                  matching &quot;{searchTerm}&quot;
                </span>
              </div>
              <button
                onClick={() => setSearchTerm('')}
                className="text-sky-600 hover:text-sky-800 text-sm font-medium"
              >
                Clear search
              </button>
            </div>
          </div>
        )}

        {sortedCars.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">No vehicles found</div>
            <p className="text-gray-500">No cars found matching &quot;your search&quot;. Try different filters.</p>
            <div className="text-sm text-gray-500">
              <strong>Search tips:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Try car names: &quot;Toyota&quot;, &quot;Mercedes&quot;, &quot;Lexus&quot;</li>
                <li>• Try locations: &quot;Douala&quot;, &quot;Yaoundé&quot;, &quot;Bafoussam&quot;</li>
                <li>• Try models: &quot;Corolla&quot;, &quot;Hilux&quot;, &quot;Prado&quot;</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedCars.map((car, index) => (
              <div key={car.id} className={`scroll-animate slide-in-left stagger-${(index % 3) + 1}`}>
                <CarCard
                  id={car.id}
                  name={car.name}
                  price={car.price}
                  image={car.image}
                  category={car.category}
                  location={car.location}
                  rating={car.rating}
                  priority={index < 4}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarsPage;
