"use client";

import { useState } from 'react';
import CarCard from '../components/CarCard';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import { getCarsByCategory } from '../lib/carData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const RentPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');
  const { user } = useAuth();
  
  // Scroll animations
  const headerVisible = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const authPromptVisible = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const carsVisible = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  
  const rentCars = getCarsByCategory('rent');
  const filteredCars = rentCars.filter(car => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      car.name.toLowerCase().includes(searchLower) ||
      car.location.toLowerCase().includes(searchLower)
    );
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Custom animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        .scroll-animate {
          opacity: 0;
          transform: translateY(50px) scale(0.95);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .scroll-animate.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .slide-in-left {
          animation: slideInLeft 0.6s ease-out forwards;
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}} />

      {/* Header */}
      <div className={`bg-gradient-to-r from-sky-600 to-sky-800 text-white py-16 px-4 scroll-animate ${headerVisible ? 'visible' : ''}`}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Rent a Car</h1>
          <p className="text-lg md:text-xl opacity-90">Find the perfect rental car for your journey</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white shadow-md py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search cars..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'rating')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Auth Prompt */}
      {!user && (
        <div className={`max-w-7xl mx-auto px-4 py-6 scroll-animate ${authPromptVisible ? 'visible' : ''}`}>
          <div className="bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-lg p-6 text-center">
            <p className="text-gray-700 mb-4">Sign in to book rental cars and access exclusive deals</p>
            <div className="flex justify-center gap-4">
              <Link 
                href="/login" 
                className="px-6 py-2 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition"
              >
                Sign In
              </Link>
              <Link 
                href="/signup" 
                className="px-6 py-2 border-2 border-sky-500 text-sky-500 font-semibold rounded-lg hover:bg-sky-50 transition"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Cars Grid */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 scroll-animate ${carsVisible ? 'visible' : ''}`}>
        {sortedCars.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">No vehicles found</div>
            <p className="text-gray-400">Try adjusting your search</p>
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
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RentPage;
