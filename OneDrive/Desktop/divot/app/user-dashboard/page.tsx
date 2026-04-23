"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

interface Booking {
  id: number;
  carName: string;
  carImage: string;
  startDate: string;
  endDate: string;
  totalPrice: string;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  location: string;
}

interface FavoriteCar {
  id: number;
  name: string;
  price: string;
  image: string;
  category: 'buy' | 'rent';
  location: string;
}

export default function UserDashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'bookings' | 'favorites' | 'profile'>('bookings');

  if (!user) {
    router.push('/login');
    return null;
  }

  const mockBookings: Booking[] = [
    {
      id: 1,
      carName: 'Toyota Land Cruiser V8',
      carImage: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800',
      startDate: '2026-04-25',
      endDate: '2026-04-28',
      totalPrice: '450.000 FCFA',
      status: 'upcoming',
      location: 'Douala Airport'
    },
    {
      id: 2,
      carName: 'Mercedes GLE',
      carImage: 'https://images.pexels.com/photos/977003/pexels-photo-977003.jpeg?auto=compress&cs=tinysrgb&w=800',
      startDate: '2026-04-15',
      endDate: '2026-04-17',
      totalPrice: '360.000 FCFA',
      status: 'completed',
      location: 'Yaoundé City Center'
    },
    {
      id: 3,
      carName: 'BMW X5',
      carImage: 'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=800',
      startDate: '2026-04-22',
      endDate: '2026-04-24',
      totalPrice: '240.000 FCFA',
      status: 'active',
      location: 'Douala City Center'
    },
  ];

  const mockFavorites: FavoriteCar[] = [
    {
      id: 4,
      name: 'Range Rover Sport',
      price: '55.000.000 FCFA',
      image: 'https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'buy',
      location: 'Douala, Cameroon'
    },
    {
      id: 7,
      name: 'BMW X5',
      price: '120.000 FCFA/jour',
      image: 'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'rent',
      location: 'Douala, Cameroon'
    },
    {
      id: 6,
      name: 'Lexus LX 570',
      price: '85.000.000 FCFA',
      image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'buy',
      location: 'Douala, Cameroon'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-700';
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'completed':
        return 'bg-gray-100 text-gray-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const renderBookings = () => (
    <div className="space-y-4">
      {mockBookings.map((booking) => (
        <div key={booking.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={booking.carImage}
                alt={booking.carName}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-900">{booking.carName}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase mt-2 md:mt-0 ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                <div>
                  <span className="font-semibold">Pickup:</span> {booking.startDate}
                </div>
                <div>
                  <span className="font-semibold">Drop-off:</span> {booking.endDate}
                </div>
                <div>
                  <span className="font-semibold">Location:</span> {booking.location}
                </div>
                <div>
                  <span className="font-semibold">Total:</span> {booking.totalPrice}
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-semibold hover:bg-sky-700 transition-colors">
                  View Details
                </button>
                {booking.status === 'upcoming' && (
                  <button className="px-4 py-2 border border-red-500 text-red-500 rounded-lg text-sm font-semibold hover:bg-red-50 transition-colors">
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderFavorites = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockFavorites.map((car) => (
        <div key={car.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <div className="relative h-48">
            <Image
              src={car.image}
              alt={car.name}
              fill
              className="object-cover"
            />
            <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-lg">
              <svg className="w-5 h-5 text-red-500 fill-current" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-gray-900 mb-1">{car.name}</h3>
            <p className="text-sky-600 font-semibold mb-2">{car.price}</p>
            <div className="flex items-center text-gray-600 text-sm mb-4">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {car.location}
            </div>
            <Link href={`/cars/${car.id}`} className="block w-full text-center px-4 py-2 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 transition-colors">
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );

  const renderProfile = () => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h2>
      
      <form className="space-y-6">
        <div className="flex items-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
          </div>
          <div className="ml-6">
            <h3 className="text-xl font-bold text-gray-900">{user.name || 'User'}</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              defaultValue={user.name || ''}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              defaultValue={user.email || ''}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              placeholder="+237 XXX XXX XXX"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
            <input
              type="text"
              placeholder="Your address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        <button
          type="button"
          className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-4 rounded-xl font-bold hover:from-sky-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Save Changes
        </button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-sky-600">{mockBookings.length}</div>
            <div className="text-sm text-gray-600">Total Bookings</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-green-600">{mockBookings.filter(b => b.status === 'active').length}</div>
            <div className="text-sm text-gray-600">Active Rentals</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-blue-600">{mockFavorites.length}</div>
            <div className="text-sm text-gray-600">Favorites</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-purple-600">{mockBookings.filter(b => b.status === 'completed').length}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-6 py-4 font-semibold text-sm border-b-2 transition-colors ${
                  activeTab === 'bookings'
                    ? 'border-sky-500 text-sky-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                My Bookings
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`px-6 py-4 font-semibold text-sm border-b-2 transition-colors ${
                  activeTab === 'favorites'
                    ? 'border-sky-500 text-sky-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Favorites
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-4 font-semibold text-sm border-b-2 transition-colors ${
                  activeTab === 'profile'
                    ? 'border-sky-500 text-sky-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Profile
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'bookings' && renderBookings()}
            {activeTab === 'favorites' && renderFavorites()}
            {activeTab === 'profile' && renderProfile()}
          </div>
        </div>
      </div>
    </div>
  );
}
