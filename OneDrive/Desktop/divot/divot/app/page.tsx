"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import ParticlesBackground from './components/Particles';
import { heroCarImages, carDatabase } from './lib/carData';
import CarCard from './components/CarCard';
import CarouselCard from './components/CarouselCard';
import { useAuth } from './contexts/AuthContext';
import Link from 'next/link';
import { useScrollAnimation } from './hooks/useScrollAnimation';

interface Car {
  id: number;
  name: string;
  price: string;
  image: string;
  category: 'buy' | 'rent';
  location: string;
  rating: number;
}

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

const Page = () => {
  const [activeTab, setActiveTab] = useState<'buy' | 'rent'>('rent');
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  
  // Car rotation for hero section
  const [currentCarIndex, setCurrentCarIndex] = useState(0);
  const carImages = heroCarImages;
  const currentCarImage = carImages[currentCarIndex];
  
  // Auto-rotate cars every 15 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarIndex((prevIndex) => (prevIndex + 1) % carImages.length);
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Initialize scroll animations for different sections
  useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  useScrollAnimation({ threshold: 0.3, triggerOnce: true });
  useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  const featuredCars = carDatabase
    .filter(car => car.category === activeTab)
    .filter(car => {
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      return (
        car.name.toLowerCase().includes(searchLower) ||
        getCarBrand(car.name).toLowerCase().includes(searchLower) ||
        car.location.toLowerCase().includes(searchLower)
      );
    })
    .slice(0, 3);

  return (
    <div className="flex-1 bg-white flex flex-col">
      {/* Custom styles for animations */}
      <style dangerouslySetInnerHTML={{ __html: `
          @keyframes scroll-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-scroll-right {
            display: flex;
            width: max-content;
            animation: scroll-right 300s linear infinite;
          }
          
          .scroll-animate {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          
          .scroll-animate.visible {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
          
          .slide-in-left {
            opacity: 0;
            transform: translateX(-80px) translateY(30px) scale(0.9);
            transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
            filter: blur(3px) brightness(0.8);
          }
          
          .slide-in-left.visible {
            opacity: 1;
            transform: translateX(0) translateY(0) scale(1);
            filter: blur(0) brightness(1);
          }
          
          .slide-in-right {
            opacity: 0;
            transform: translateX(80px) translateY(30px) scale(0.9);
            transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
            filter: blur(3px) brightness(0.8);
          }
          
          .slide-in-right.visible {
            opacity: 1;
            transform: translateX(0) translateY(0) scale(1);
            filter: blur(0) brightness(1);
          }
          
          .scale-in {
            opacity: 0;
            transform: scale(0.3) rotate(-5deg);
            transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            filter: blur(4px) brightness(0.7);
          }
          
          .scale-in.visible {
            opacity: 1;
            transform: scale(1) rotate(0deg);
            filter: blur(0) brightness(1);
          }
          
          .fade-in-up {
            opacity: 0;
            transform: translateY(60px) scale(0.8);
            transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            filter: blur(2px) saturate(0.5);
          }
          
          .fade-in-up.visible {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0) saturate(1);
          }
          
          /* Stagger delays for sequential animations */
          .stagger-1 { transition-delay: 0.1s; }
          .stagger-2 { transition-delay: 0.2s; }
          .stagger-3 { transition-delay: 0.3s; }
          .stagger-4 { transition-delay: 0.4s; }
          
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
          .stagger-4 { transition-delay: 0.4s; }
          
          .car-rotator-container {
            position: relative;
            overflow: hidden;
          }
          
          .car-image-container {
            animation: carSlideIn 2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            transform-origin: center bottom;
          }
          
          .car-image-container img {
            animation: carFloat 6s ease-in-out infinite, carGlow 4s ease-in-out infinite alternate, carFade 15s ease-in-out infinite;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            -webkit-animation: carFloat 6s ease-in-out infinite, carGlow 4s ease-in-out infinite alternate, carFade 15s ease-in-out infinite;
          }

          @keyframes glow {
            0%, 100% {
              box-shadow: 0 0 5px rgba(56, 189, 248, 0.5), 0 0 10px rgba(56, 189, 248, 0.3), 0 0 15px rgba(56, 189, 248, 0.2);
            }
            50% {
              box-shadow: 0 0 10px rgba(56, 189, 248, 0.8), 0 0 20px rgba(56, 189, 248, 0.5), 0 0 30px rgba(56, 189, 248, 0.3), 0 0 40px rgba(56, 189, 248, 0.2);
            }
          }

          .particle {
            position: absolute;
            opacity: 0;
            animation: particleMove 8s ease-in-out infinite;
          }

          .particle::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: inherit;
            border-radius: inherit;
            animation: sparkle 1.5s ease-in-out infinite;
          }

          .particle-1 {
            left: 10%;
            top: 80%;
            width: 4px;
            height: 4px;
            background: linear-gradient(135deg, #38bdf8, #818cf8);
            border-radius: 50%;
            animation-delay: 0s;
            box-shadow: 0 0 8px #38bdf8, 0 0 16px #38bdf8;
          }

          .particle-2 {
            left: 30%;
            top: 20%;
            width: 6px;
            height: 6px;
            background: linear-gradient(135deg, #60a5fa, #a78bfa);
            clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
            animation-delay: 0.5s;
            box-shadow: 0 0 10px #60a5fa, 0 0 20px #60a5fa;
          }

          .particle-3 {
            left: 50%;
            top: 60%;
            width: 3px;
            height: 3px;
            background: linear-gradient(135deg, #38bdf8, #c084fc);
            border-radius: 50%;
            animation-delay: 1s;
            box-shadow: 0 0 6px #38bdf8, 0 0 12px #38bdf8;
          }

          .particle-4 {
            left: 70%;
            top: 30%;
            width: 5px;
            height: 5px;
            background: linear-gradient(135deg, #818cf8, #f472b6);
            clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
            animation-delay: 1.5s;
            box-shadow: 0 0 8px #818cf8, 0 0 16px #818cf8;
          }

          .particle-5 {
            left: 90%;
            top: 70%;
            width: 4px;
            height: 4px;
            background: linear-gradient(135deg, #38bdf8, #34d399);
            border-radius: 50%;
            animation-delay: 2s;
            box-shadow: 0 0 8px #38bdf8, 0 0 16px #38bdf8;
          }

          .particle-6 {
            left: 15%;
            top: 40%;
            width: 5px;
            height: 5px;
            background: linear-gradient(135deg, #60a5fa, #fbbf24);
            clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
            animation-delay: 2.5s;
            box-shadow: 0 0 10px #60a5fa, 0 0 20px #60a5fa;
          }

          .particle-7 {
            left: 35%;
            top: 75%;
            width: 3px;
            height: 3px;
            background: linear-gradient(135deg, #a78bfa, #38bdf8);
            border-radius: 50%;
            animation-delay: 3s;
            box-shadow: 0 0 6px #a78bfa, 0 0 12px #a78bfa;
          }

          .particle-8 {
            left: 55%;
            top: 25%;
            width: 6px;
            height: 6px;
            background: linear-gradient(135deg, #f472b6, #818cf8);
            clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
            animation-delay: 3.5s;
            box-shadow: 0 0 10px #f472b6, 0 0 20px #f472b6;
          }

          .particle-9 {
            left: 75%;
            top: 55%;
            width: 4px;
            height: 4px;
            background: linear-gradient(135deg, #34d399, #38bdf8);
            border-radius: 50%;
            animation-delay: 4s;
            box-shadow: 0 0 8px #34d399, 0 0 16px #34d399;
          }

          .particle-10 {
            left: 85%;
            top: 35%;
            width: 5px;
            height: 5px;
            background: linear-gradient(135deg, #fbbf24, #f472b6);
            clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
            animation-delay: 4.5s;
            box-shadow: 0 0 10px #fbbf24, 0 0 20px #fbbf24;
          }

          .particle-11 {
            left: 20%;
            top: 65%;
            width: 3px;
            height: 3px;
            background: linear-gradient(135deg, #38bdf8, #a78bfa);
            border-radius: 50%;
            animation-delay: 5s;
            box-shadow: 0 0 6px #38bdf8, 0 0 12px #38bdf8;
          }

          .particle-12 {
            left: 40%;
            top: 15%;
            width: 5px;
            height: 5px;
            background: linear-gradient(135deg, #c084fc, #60a5fa);
            clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
            animation-delay: 5.5s;
            box-shadow: 0 0 8px #c084fc, 0 0 16px #c084fc;
          }

          .particle-13 {
            left: 60%;
            top: 45%;
            width: 4px;
            height: 4px;
            background: linear-gradient(135deg, #818cf8, #34d399);
            border-radius: 50%;
            animation-delay: 6s;
            box-shadow: 0 0 8px #818cf8, 0 0 16px #818cf8;
          }

          .particle-14 {
            left: 80%;
            top: 85%;
            width: 6px;
            height: 6px;
            background: linear-gradient(135deg, #f472b6, #fbbf24);
            clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
            animation-delay: 6.5s;
            box-shadow: 0 0 10px #f472b6, 0 0 20px #f472b6;
          }

          .particle-15 {
            left: 95%;
            top: 50%;
            width: 3px;
            height: 3px;
            background: linear-gradient(135deg, #38bdf8, #c084fc);
            border-radius: 50%;
            animation-delay: 7s;
            box-shadow: 0 0 6px #38bdf8, 0 0 12px #38bdf8;
          }

          @keyframes particleMove {
            0% {
              transform: translate(0, 0) scale(0) rotate(0deg);
              opacity: 0;
            }
            15% {
              opacity: 1;
              transform: translate(15px, -25px) scale(1) rotate(45deg);
            }
            30% {
              transform: translate(-20px, -50px) scale(1) rotate(90deg);
            }
            45% {
              transform: translate(25px, -75px) scale(1) rotate(135deg);
            }
            60% {
              transform: translate(-15px, -100px) scale(1) rotate(180deg);
            }
            75% {
              opacity: 1;
              transform: translate(20px, -125px) scale(0.9) rotate(225deg);
            }
            90% {
              opacity: 0.5;
              transform: translate(-10px, -140px) scale(0.5) rotate(270deg);
            }
            100% {
              transform: translate(5px, -150px) scale(0) rotate(360deg);
              opacity: 0;
            }
          }

          @keyframes sparkle {
            0%, 100% {
              opacity: 0.5;
              transform: scale(1);
            }
            50% {
              opacity: 1;
              transform: scale(1.5);
            }
          }
          
          @keyframes carFade {
            0%, 100% { opacity: 1; }
            40%, 60% { opacity: 0; }
            50% { opacity: 1; }
          }
          
          @keyframes carSlideIn {
            0% {
              opacity: 0;
              transform: translateX(100px) rotate(5deg) scale(0.8);
              filter: blur(10px) brightness(0.7);
            }
            100% {
              opacity: 1;
              transform: translateX(0) rotate(0deg) scale(1);
              filter: blur(0) brightness(1);
            }
          }
          
          @keyframes carFloat {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-15px);
            }
          }
          
          @keyframes carGlow {
            0% {
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(96, 165, 250, 0.4);
            }
            100% {
              box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(96, 165, 250, 0.6);
            }
          }
                `}} />

      {/* Hero & Search Section */}
      <section className="relative pt-20 pb-16 px-4 bg-black text-black overflow-hidden scroll-animate">
        <ParticlesBackground />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left lg:ml-15">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-extrabold mb-4 md:mb-6 tracking-tight text-white">
                Drive the <span className="text-sky-400">Future</span> Today
              </h1>
              <p className="text-gray-300 text-base md:text-lg lg:text-xl mb-8 md:mb-12 max-w-2xl mx-auto lg:mx-0 font-medium">
                Explore the finest collection of premium vehicles for every journey.
              </p>
            </div>

            {/* Animated Car Image */}
            <div className="relative h-64 md:h-80 flex items-center justify-center">
              <div className="car-rotator-container">
                <div className="car-image-container">
                  <Image
                    src={currentCarImage}
                    alt="Luxury Car"
                    width={400}
                    height={250}
                    className="rounded-lg shadow-2xl"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Big Search Bar */}
          <div className="w-full max-w-5xl mx-auto mt-8 relative">
            {/* Glow effect behind */}
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 via-blue-500 to-purple-600 rounded-2xl blur-xl opacity-30"></div>

            {/* Main search container */}
            <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl rounded-2xl shadow-2xl p-5 border border-white/20">
              {/* Search icon and title */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/30">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Find Your Perfect Ride</h3>
                  <p className="text-white/70 text-xs">Search from our premium collection</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {/* Location */}
                <div className="group">
                  <label className="block text-[10px] font-semibold text-sky-300 mb-1 uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Location
                    </span>
                  </label>
                  <select className="w-full px-3 py-2 bg-white/10 border-2 border-white/20 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:border-white/30 appearance-none cursor-pointer text-sm">
                    <option value="" className="text-gray-900 font-medium">All Locations</option>
                    <option value="douala" className="text-gray-900 font-medium">Douala</option>
                    <option value="yaounde" className="text-gray-900 font-medium">Yaoundé</option>
                    <option value="bafoussam" className="text-gray-900 font-medium">Bafoussam</option>
                    <option value="bamenda" className="text-gray-900 font-medium">Bamenda</option>
                  </select>
                </div>

                {/* Car Type */}
                <div className="group">
                  <label className="block text-[10px] font-semibold text-sky-300 mb-1 uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                      Car Type
                    </span>
                  </label>
                  <select className="w-full px-3 py-2 bg-white/10 border-2 border-white/20 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:border-white/30 appearance-none cursor-pointer text-sm">
                    <option value="" className="text-gray-900 font-medium">All Types</option>
                    <option value="sedan" className="text-gray-900 font-medium">Sedan</option>
                    <option value="suv" className="text-gray-900 font-medium">SUV</option>
                    <option value="truck" className="text-gray-900 font-medium">Truck</option>
                    <option value="luxury" className="text-gray-900 font-medium">Luxury</option>
                    <option value="sports" className="text-gray-900 font-medium">Sports</option>
                  </select>
                </div>

                {/* Price Range */}
                <div className="group">
                  <label className="block text-[10px] font-semibold text-sky-300 mb-1 uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Price Range
                    </span>
                  </label>
                  <select className="w-full px-3 py-2 bg-white/10 border-2 border-white/20 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:border-white/30 appearance-none cursor-pointer text-sm">
                    <option value="" className="text-gray-900 font-medium">All Prices</option>
                    <option value="0-25000" className="text-gray-900 font-medium">0 - 25,000 FCFA</option>
                    <option value="25000-50000" className="text-gray-900 font-medium">25,000 - 50,000 FCFA</option>
                    <option value="50000-100000" className="text-gray-900 font-medium">50,000 - 100,000 FCFA</option>
                    <option value="100000+" className="text-gray-900 font-medium">100,000+ FCFA</option>
                  </select>
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                  <button
                    type="button"
                    className="w-full px-5 py-2 bg-gradient-to-r from-sky-500 via-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-sky-600 hover:via-blue-700 hover:to-purple-700 transform hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/50 transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Search
                    </span>
                    {/* Particle effects */}
                    <div className="absolute inset-0">
                      <div className="particle particle-1"></div>
                      <div className="particle particle-2"></div>
                      <div className="particle particle-3"></div>
                      <div className="particle particle-4"></div>
                      <div className="particle particle-5"></div>
                      <div className="particle particle-6"></div>
                      <div className="particle particle-7"></div>
                      <div className="particle particle-8"></div>
                      <div className="particle particle-9"></div>
                      <div className="particle particle-10"></div>
                      <div className="particle particle-11"></div>
                      <div className="particle particle-12"></div>
                      <div className="particle particle-13"></div>
                      <div className="particle particle-14"></div>
                      <div className="particle particle-15"></div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Quick tags */}
              <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-white/10">
                <span className="text-white/60 text-[10px] uppercase tracking-wider font-semibold">Popular:</span>
                <button className="px-2 py-0.5 bg-white/10 hover:bg-sky-500/30 text-white/80 hover:text-white rounded-full text-[10px] font-medium transition-all duration-300 border border-white/10 hover:border-sky-400/50">
                  Luxury SUVs
                </button>
                <button className="px-2 py-0.5 bg-white/10 hover:bg-sky-500/30 text-white/80 hover:text-white rounded-full text-[10px] font-medium transition-all duration-300 border border-white/10 hover:border-sky-400/50">
                  Sports Cars
                </button>
                <button className="px-2 py-0.5 bg-white/10 hover:bg-sky-500/30 text-white/80 hover:text-white rounded-full text-[10px] font-medium transition-all duration-300 border border-white/10 hover:border-sky-400/50">
                  Family Cars
                </button>
                <button className="px-2 py-0.5 bg-white/10 hover:bg-sky-500/30 text-white/80 hover:text-white rounded-full text-[10px] font-medium transition-all duration-300 border border-white/10 hover:border-sky-400/50">
                  Electric
                </button>
              </div>
            </div>
          </div>

          {/* Search Results Info */}
          {searchTerm && (
            <div className="mt-4 text-black text-lg">
              Searching for: &quot;{searchTerm}&quot; - {featuredCars.length} {featuredCars.length === 1 ? 'result' : 'results'} found
            </div>
          )}
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 px-4 bg-slate-50 scroll-animate">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-bold text-black mb-2">Featured Listings</h2>
              <p className="text-gray-500">Handpicked vehicles curated for quality and value.</p>
            </div>
            
            {/* Tab Switcher */}
            <div className="flex bg-gray-200 p-1 rounded-xl">
              <button 
                onClick={() => setActiveTab('rent')}
                className={`px-8 py-2.5 rounded-lg font-bold transition-all ${activeTab === 'rent' ? 'bg-black text-sky-400 shadow-lg' : 'text-gray-500 hover:text-black'}`}
              >
                For Rent
              </button>
              <button 
                onClick={() => setActiveTab('buy')}
                className={`px-8 py-2.5 rounded-lg font-bold transition-all ${activeTab === 'buy' ? 'bg-black text-sky-400 shadow-lg' : 'text-gray-500 hover:text-black'}`}
              >
                For Sale
              </button>
            </div>
          </div>

          {/* Authentication Prompt */}
          {!user && (
            <div className="bg-sky-50 border border-sky-200 rounded-2xl p-6 mb-8 scroll-animate scale-in">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-sky-900 mb-2">Sign in to {activeTab === 'rent' ? 'Rent' : 'Purchase'} Cars</h3>
                  <p className="text-sky-700">Create an account or sign in to access our premium car rental and purchase services.</p>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCars.map((car, index) => (
              <div key={car.id} className={`scroll-animate fade-in-up stagger-${(index % 4) + 1}`}>
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
        </div>
      </section>

      {/* Why Choose Divot Section */}
      <section className="py-24 px-4 bg-white scroll-animate">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-black mb-4">Why Choose <span className="text-sky-500">Divot</span></h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">We are committed to providing a seamless automotive experience built on reliability and excellence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Trust */}
            <div className="flex flex-col items-center text-center group scroll-animate scale-in stagger-1">
              <div className="w-16 h-16 bg-sky-50 text-sky-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-sky-400 transition-all duration-300 shadow-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Absolute Trust</h3>
              <p className="text-gray-600 leading-relaxed">
                Your peace of mind is our priority. We maintain transparent transactions and secure processing for every rental and purchase.
              </p>
            </div>

            {/* Affordability */}
            <div className="flex flex-col items-center text-center group scroll-animate scale-in stagger-2">
              <div className="w-16 h-16 bg-sky-50 text-sky-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-sky-400 transition-all duration-300 shadow-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Proven Affordability</h3>
              <p className="text-gray-600 leading-relaxed">
                Premium quality doesn&apos;t have to mean premium prices. We offer competitive rates and flexible payment options tailored to your budget.
              </p>
            </div>

            {/* Verified Dealers */}
            <div className="flex flex-col items-center text-center group scroll-animate scale-in stagger-3">
              <div className="w-16 h-16 bg-sky-50 text-sky-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-sky-400 transition-all duration-300 shadow-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Verified Dealers</h3>
              <p className="text-gray-600 leading-relaxed">
                We partner exclusively with vetted and certified dealers across Africa to ensure every vehicle meets our rigorous quality standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 px-4 scroll-animate scale-in">
        <div className="max-w-5xl mx-auto bg-black rounded-[3rem] p-12 text-center relative overflow-hidden border border-white/5 shadow-2xl">
          {/* Decorative Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-400/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-400/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 relative z-10">
            Ready to Drive Your Dream Car?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto relative z-10">
            Join thousands of satisfied customers who have found their perfect vehicle with Divot. Your journey starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link href="/cars" className="px-10 py-4 bg-sky-400 hover:bg-sky-500 text-white font-bold rounded-xl md:rounded-full transition-all transform hover:scale-105 shadow-lg shadow-sky-900/20 inline-block">
              Browse All Cars
            </Link>
            <Link href="/contact" className="px-10 py-4 border-2 border-white/20 hover:border-sky-400 text-white font-bold rounded-xl md:rounded-full transition-all inline-block">
              Contact Specialist
            </Link>
          </div>
        </div>
      </section>

      {/* Infinite Carousel Section */}
      <section className="py-8 bg-white overflow-hidden scroll-animate">
        <div className="mb-6 px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tighter">Featured Fleets</h2>
          <div className="h-1 w-20 bg-sky-400 mx-auto mt-2"></div>
        </div>

        <div className="carousel-container relative">
          <div className="animate-scroll-right gap-6">
            {/* Duplicate the array to create a seamless infinite loop */}
            {[...carDatabase, ...carDatabase].map((car, index) => (
              <div key={`${car.id}-${index}`} className="w-[350px] h-[320px]">
                <CarouselCard
                  id={car.id}
                  name={car.name}
                  price={car.price}
                  image={car.image}
                  category={car.category}
                  rating={car.rating}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
