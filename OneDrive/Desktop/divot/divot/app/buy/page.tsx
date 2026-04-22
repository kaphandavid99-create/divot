"use client";

import { useState } from 'react';
import CarCard from '../components/CarCard';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { carDatabase, getCarsByCategory } from '../lib/carData';

const BuyPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');
  const { user } = useAuth();
  
  // Scroll animations
  const headerVisible = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const authPromptVisible = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const carsVisible = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  const buyCars = getCarsByCategory('buy');
  const filteredCars = buyCars.filter(car => {
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
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .scroll-animate.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .slide-in-left {
          opacity: 0;
          transform: translateX(-50px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .slide-in-left.visible {
          opacity: 1;
          transform: translateX(0);
        }
        
        .scale-in {
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
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
      <div className={`bg-white shadow-sm scroll-animate ${headerVisible ? 'visible' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-black">Cars for Sale</h1>
              <p className="text-gray-600 mt-2">Browse our premium selection of vehicles for purchase</p>
            </div>
            
            {/* Search */}
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'rating')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Authentication Prompt */}
      {!user && (
        <div className={`bg-sky-50 border border-sky-200 mx-4 mt-6 rounded-2xl p-6 scroll-animate scale-in ${authPromptVisible ? 'visible' : ''}`}>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-sky-900 mb-2">Sign in to Purchase Cars</h3>
              <p className="text-sky-700">Create an account or sign in to access our premium car purchase services.</p>
            </div>
            <div className="flex space-x-4">
              <Link 
                href="/login" 
                className="px-6 py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition"
              >
                Sign In
              </Link>
              <Link 
                href="/signup" 
                className="px-6 py-3 border-2 border-sky-500 text-sky-500 font-semibold rounded-lg hover:bg-sky-50 transition"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Cars Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {sortedCars.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">No vehicles found</div>
            <p className="text-gray-400">Try adjusting your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedCars.map((car, index) => (
              <div key={car.id} className={`scroll-animate slide-in-left ${carsVisible ? 'visible' : ''} stagger-${(index % 3) + 1}`}>
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

export default BuyPage;
