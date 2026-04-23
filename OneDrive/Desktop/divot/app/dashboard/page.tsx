"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';

interface DashboardStats {
  totalCars: number;
  activeListings: number;
  pendingRequests: number;
  totalRevenue: string;
  monthlyViews: number;
  recentActivity: ActivityItem[];
}

interface ActivityItem {
  id: number;
  type: 'sale' | 'rent' | 'inquiry' | 'view';
  description: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'active';
}

interface CarListing {
  id: number;
  name: string;
  price: string;
  category: 'buy' | 'rent';
  status: 'active' | 'sold' | 'rented';
  views: number;
  inquiries: number;
  image: string;
  location: string;
}

const OwnerDashboard = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'analytics' | 'messages'>('overview');
  const [stats, setStats] = useState<DashboardStats>({
    totalCars: 0,
    activeListings: 0,
    pendingRequests: 0,
    totalRevenue: '0 FCFA',
    monthlyViews: 0,
    recentActivity: []
  });
  const [carListings, setCarListings] = useState<CarListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    // Simulate loading dashboard data
    const loadDashboardData = () => {
      setTimeout(() => {
        setStats({
          totalCars: 12,
          activeListings: 8,
          pendingRequests: 3,
          totalRevenue: '45.750.000 FCFA',
          monthlyViews: 1247,
          recentActivity: [
            { id: 1, type: 'inquiry', description: 'New inquiry for Toyota Land Cruiser', timestamp: '2 hours ago', status: 'pending' },
            { id: 2, type: 'sale', description: 'Range Rover Sport sold', timestamp: '5 hours ago', status: 'completed' },
            { id: 3, type: 'view', description: 'Mercedes GLE viewed 15 times', timestamp: '1 day ago', status: 'active' },
            { id: 4, type: 'rent', description: 'Toyota Hilux rented for 3 days', timestamp: '2 days ago', status: 'completed' },
          ]
        });

        setCarListings([
          {
            id: 1,
            name: 'Range Rover Sport',
            price: '55.000.000 FCFA',
            category: 'buy',
            status: 'active',
            views: 234,
            inquiries: 12,
            image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop',
            location: 'Douala, Cameroon'
          },
          {
            id: 2,
            name: 'Toyota Land Cruiser',
            price: '150.000 FCFA/jour',
            category: 'rent',
            status: 'active',
            views: 189,
            inquiries: 8,
            image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=800&auto=format&fit=crop',
            location: 'Yaoundé, Cameroon'
          },
          {
            id: 3,
            name: 'Mercedes GLE',
            price: '85.000.000 FCFA',
            category: 'buy',
            status: 'sold',
            views: 156,
            inquiries: 15,
            image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800&auto=format&fit=crop',
            location: 'Douala, Cameroon'
          },
          {
            id: 4,
            name: 'Toyota Hilux',
            price: '85.000 FCFA/jour',
            category: 'rent',
            status: 'rented',
            views: 98,
            inquiries: 6,
            image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop',
            location: 'Bafoussam, Cameroon'
          }
        ]);

        setLoading(false);
      }, 1000);
    };

    loadDashboardData();
  }, [user, router]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'sold':
      case 'rented':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'sale':
        return 'https://img.icons8.com/ios-filled/20/10b981/money.png';
      case 'rent':
        return 'https://img.icons8.com/ios-filled/20/3b82f6/car.png';
      case 'inquiry':
        return 'https://img.icons8.com/ios-filled/20/f59e0b/message.png';
      case 'view':
        return 'https://img.icons8.com/ios-filled/20/8b5cf6/eye.png';
      default:
        return 'https://img.icons8.com/ios-filled/20/6b7280/info.png';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Owner Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/sell" className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
                Add New Car
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {user?.name?.charAt(0) || 'O'}
                </div>
                <span className="text-gray-700">{user?.name || 'Owner'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {['overview', 'listings', 'analytics', 'messages'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-sky-500 text-sky-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-sky-100 rounded-lg p-3">
                    <img src="https://img.icons8.com/ios-filled/24/0ea5e9/car.png" alt="Cars" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Cars</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalCars}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 rounded-lg p-3">
                    <img src="https://img.icons8.com/ios-filled/24/10b981/checkmark.png" alt="Active" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Listings</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeListings}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-100 rounded-lg p-3">
                    <img src="https://img.icons8.com/ios-filled/24/f59e0b/time.png" alt="Pending" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.pendingRequests}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-100 rounded-lg p-3">
                    <img src="https://img.icons8.com/ios-filled/24/8b5cf6/money.png" alt="Revenue" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalRevenue}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {stats.recentActivity.map((activity) => (
                  <div key={activity.id} className="px-6 py-4 flex items-center">
                    <img src={getActivityIcon(activity.type)} alt={activity.type} className="w-5 h-5" />
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                      <p className="text-sm text-gray-500">{activity.timestamp}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(activity.status)}`}>
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'listings' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">My Car Listings</h2>
              <Link href="/sell" className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
                Add New Listing
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inquiries</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {carListings.map((car) => (
                      <tr key={car.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img className="h-10 w-10 rounded-lg object-cover" src={car.image} alt={car.name} />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{car.name}</div>
                              <div className="text-sm text-gray-500">{car.location}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{car.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(car.status)}`}>
                            {car.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{car.views}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{car.inquiries}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-sky-600 hover:text-sky-900 mr-3">Edit</button>
                          <button className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Analytics Overview</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Views</h3>
                <div className="flex items-end justify-between h-32">
                  {[65, 59, 80, 81, 56, 55, 70].map((height, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div 
                        className="w-8 bg-sky-500 rounded-t"
                        style={{ height: `${height}%` }}
                      ></div>
                      <span className="text-xs text-gray-500 mt-2">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Sales</span>
                    <span className="text-sm font-medium text-gray-900">35.500.000 FCFA</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Rentals</span>
                    <span className="text-sm font-medium text-gray-900">10.250.000 FCFA</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Services</span>
                    <span className="text-sm font-medium text-gray-900">2.000.000 FCFA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Messages & Inquiries</h2>
            
            <div className="bg-white rounded-lg shadow">
              <div className="divide-y divide-gray-200">
                <div className="p-6 hover:bg-gray-50">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center text-white font-semibold">
                        JD
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">John Doe</h3>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Hi, I'm interested in the Toyota Land Cruiser. Is it still available?</p>
                      <div className="mt-3">
                        <button className="text-sm text-sky-600 hover:text-sky-900 font-medium">Reply</button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 hover:bg-gray-50">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                        SM
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">Sarah Miller</h3>
                        <p className="text-xs text-gray-500">5 hours ago</p>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Can you tell me more about the Range Rover Sport? What's the mileage?</p>
                      <div className="mt-3">
                        <button className="text-sm text-sky-600 hover:text-sky-900 font-medium">Reply</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
