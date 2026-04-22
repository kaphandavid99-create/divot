"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return parts[0][0] + parts[parts.length - 1][0];
    }
    return parts[0][0];
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Buy', href: '/buy' },
    { name: 'Rent', href: '/rent' },
    { name: 'Sell', href: '/sell' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .navbar-animate {
          animation: slideDown 0.6s ease-out;
        }
        .mobile-menu-animate {
          animation: scaleIn 0.3s ease-out;
        }
        .nav-link {
          position: relative;
          overflow: hidden;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #38bdf8, #818cf8);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .glow-button {
          box-shadow: 0 0 20px rgba(56, 189, 248, 0.3);
          transition: all 0.3s ease;
        }
        .glow-button:hover {
          box-shadow: 0 0 30px rgba(56, 189, 248, 0.5), 0 0 60px rgba(56, 189, 248, 0.3);
        }
      `}</style>
      <nav className={`sticky top-0 z-[100] transition-all duration-500 ${
        scrolled 
          ? 'bg-black/95 backdrop-blur-xl shadow-2xl shadow-sky-500/10 border-b-2 border-sky-400' 
          : 'bg-black/90 backdrop-blur-xl border-b-2 border-sky-400'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center navbar-animate">
            {/* Logo */}
            <div className="flex-1 flex items-center">
              <Link href="/" className="flex items-center group">
                <Image
                  src="/divot.png"
                  alt="Divot Logo"
                  height={45}
                  width={140}
                  priority
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex justify-center space-x-1 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="nav-link px-4 py-2 text-gray-300 hover:text-white font-medium transition-all duration-300 rounded-lg hover:bg-white/5"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex flex-1 justify-end items-center space-x-3">
              {user ? (
                <div className="flex items-center space-x-3">
                  <Link 
                    href="/dashboard" 
                    className="px-4 py-2 text-sky-400 font-semibold border border-sky-400/50 rounded-lg hover:bg-sky-400/10 hover:border-sky-400 transition-all duration-300"
                  >
                    Dashboard
                  </Link>
                  <div className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-sky-500/10 to-purple-500/10 rounded-lg border border-sky-500/30">
                    <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-sky-500/30">
                      {getInitials(user?.name).toUpperCase()}
                    </div>
                    <span className="text-gray-200 text-sm font-medium">Welcome, {user?.name?.split(' ')[0] || 'User'}</span>
                  </div>
                  <button 
                    onClick={logout}
                    type="button" 
                    className="px-4 py-2 text-red-400 font-semibold border border-red-400/50 rounded-lg hover:bg-red-400/10 hover:border-red-400 transition-all duration-300"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="px-5 py-2.5 text-sky-400 font-semibold border border-sky-400/50 rounded-xl hover:bg-sky-400/10 hover:border-sky-400 transition-all duration-300"
                  >
                    Login
                  </Link>
                  <Link 
                    href="/signup" 
                    className="glow-button px-5 py-2.5 bg-gradient-to-r from-sky-500 via-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-sky-600 hover:via-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-300 hover:text-white focus:outline-none transition-colors duration-300 rounded-lg hover:bg-white/10"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1.5">
                  <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                  <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] md:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Mobile Menu */}
            <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 shadow-2xl shadow-sky-500/20 mobile-menu-animate relative z-[95]">
              <div className="px-4 pt-4 pb-6 space-y-2">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block px-4 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-gradient-to-r from-sky-500/10 to-purple-500/10 rounded-xl transition-all duration-300 border border-transparent hover:border-sky-500/30"
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 flex flex-col space-y-3 border-t border-white/10">
                  {user ? (
                    <>
                      <div className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-sky-500/10 to-purple-500/10 rounded-xl border border-sky-500/30">
                        <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-sky-500/30">
                          {getInitials(user?.name).toUpperCase()}
                        </div>
                        <div>
                          <span className="text-gray-200 text-sm font-semibold block">Welcome back</span>
                          <span className="text-gray-400 text-xs">{user?.name || 'User'}</span>
                        </div>
                      </div>
                      <Link 
                        href="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-3 text-sky-400 font-semibold border border-sky-400/50 rounded-xl text-center hover:bg-sky-400/10 transition-all duration-300"
                      >
                        Dashboard
                      </Link>
                      <button 
                        type="button" 
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }} 
                        className="w-full px-4 py-3 text-red-400 font-semibold border border-red-400/50 rounded-xl hover:bg-red-400/10 transition-all duration-300"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        href="/login" 
                        onClick={() => setIsOpen(false)}
                        className="w-full px-4 py-3 text-sky-400 font-semibold border border-sky-400/50 rounded-xl text-center hover:bg-sky-400/10 transition-all duration-300"
                      >
                        Login
                      </Link>
                      <Link 
                        href="/signup" 
                        onClick={() => setIsOpen(false)}
                        className="w-full px-4 py-3 bg-gradient-to-r from-sky-500 via-blue-600 to-purple-600 text-white font-semibold rounded-xl text-center hover:from-sky-600 hover:via-blue-700 hover:to-purple-700 transition-all duration-300"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;
