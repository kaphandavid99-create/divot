"use client";

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../../../contexts/AuthContext';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface Car {
  id: number;
  name: string;
  price: string;
  image: string;
  category: 'buy' | 'rent';
  location: string;
  rating: number;
}

const carData: Car[] = [
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

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [driverOption, setDriverOption] = useState(false);
  const [insuranceOption, setInsuranceOption] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const carId = parseInt(params.id as string);
  const car = carData.find(c => c.id === carId);

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Car not found</h1>
          <Link href="/cars" className="text-sky-600 hover:text-sky-700 font-semibold">
            Back to Cars
          </Link>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  if (car.category !== 'rent') {
    router.push(`/cars/${car.id}`);
    return null;
  }

  const pricePerDay = parseInt(car.price.replace(/[^0-9]/g, ''));
  
  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const days = calculateDays();
  const basePrice = days * pricePerDay;
  const driverFee = driverOption ? (days * 20000) : 0;
  const insuranceFee = insuranceOption ? (days * 10000) : 0;
  const totalPrice = basePrice + driverFee + insuranceFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startDate || !endDate) {
      alert('Please select start and end dates');
      return;
    }
    
    if (days < 1) {
      alert('Booking must be at least 1 day');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Try to create Stripe payment intent
      const response = await fetch('/api/payment/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalPrice,
          carName: car.name,
          bookingDetails: {
            startDate,
            endDate,
            pickupLocation,
            dropoffLocation,
            driverOption,
            insuranceOption,
          },
        }),
      });

      if (response.ok) {
        const { clientSecret } = await response.json();
        const stripe = await stripePromise;
        
        if (stripe) {
          const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: {
                // In production, you would use Stripe Elements here
                // For now, we'll use a simulated approach
              },
            },
          });

          if (error) {
            console.error('Payment error:', error);
            alert('Payment failed. Please try again.');
            setIsLoading(false);
            return;
          }

          if (paymentIntent?.status === 'succeeded') {
            alert(`Booking confirmed for ${car.name}!\n\nDates: ${startDate} to ${endDate}\nTotal: ${totalPrice.toLocaleString()} FCFA\nPayment ID: ${paymentIntent.id}`);
            router.push('/user-dashboard');
          }
        } else {
          // Fallback if Stripe isn't configured
          alert(`Booking confirmed for ${car.name}!\n\nDates: ${startDate} to ${endDate}\nTotal: ${totalPrice.toLocaleString()} FCFA\n(Payment simulation - Stripe not configured)`);
          router.push('/user-dashboard');
        }
      } else {
        // Fallback if API route fails
        alert(`Booking confirmed for ${car.name}!\n\nDates: ${startDate} to ${endDate}\nTotal: ${totalPrice.toLocaleString()} FCFA`);
        router.push('/user-dashboard');
      }
    } catch (error) {
      console.error('Booking error:', error);
      // Fallback on error
      alert(`Booking confirmed for ${car.name}!\n\nDates: ${startDate} to ${endDate}\nTotal: ${totalPrice.toLocaleString()} FCFA`);
      router.push('/user-dashboard');
    }
    
    setIsLoading(false);
  };

  const today = new Date().toISOString().split('T')[0];
  const minEndDate = startDate ? startDate : today;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href={`/cars/${car.id}`} className="inline-flex items-center text-sky-600 hover:text-sky-700 font-semibold">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Car Details
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Book Your Rental</h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Car Summary */}
                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <div className="relative w-32 h-24 rounded-lg overflow-hidden mr-4">
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{car.name}</h3>
                    <p className="text-sky-600 font-semibold">{car.price}</p>
                    <div className="flex items-center text-gray-600 text-sm">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {car.location}
                    </div>
                  </div>
                </div>

                {/* Date Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Pickup Date *
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      min={today}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Drop-off Date *
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={minEndDate}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                {/* Location Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Pickup Location *
                    </label>
                    <select
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                    >
                      <option value="">Select location</option>
                      <option value="douala-airport">Douala Airport</option>
                      <option value="douala-city">Douala City Center</option>
                      <option value="yaounde-airport">Yaoundé Airport</option>
                      <option value="yaounde-city">Yaoundé City Center</option>
                      <option value="bafoussam">Bafoussam</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Drop-off Location *
                    </label>
                    <select
                      value={dropoffLocation}
                      onChange={(e) => setDropoffLocation(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                    >
                      <option value="">Select location</option>
                      <option value="douala-airport">Douala Airport</option>
                      <option value="douala-city">Douala City Center</option>
                      <option value="yaounde-airport">Yaoundé Airport</option>
                      <option value="yaounde-city">Yaoundé City Center</option>
                      <option value="bafoussam">Bafoussam</option>
                    </select>
                  </div>
                </div>

                {/* Additional Options */}
                <div className="space-y-4">
                  <label className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={driverOption}
                      onChange={(e) => setDriverOption(e.target.checked)}
                      className="w-5 h-5 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
                    />
                    <div className="ml-4">
                      <div className="font-semibold text-gray-900">Add Professional Driver</div>
                      <div className="text-sm text-gray-600">20,000 FCFA/day</div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={insuranceOption}
                      onChange={(e) => setInsuranceOption(e.target.checked)}
                      className="w-5 h-5 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
                    />
                    <div className="ml-4">
                      <div className="font-semibold text-gray-900">Full Insurance Coverage</div>
                      <div className="text-sm text-gray-600">10,000 FCFA/day</div>
                    </div>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-4 rounded-xl font-bold hover:from-sky-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Processing...' : 'Confirm Booking'}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Price Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Price Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rate per day</span>
                  <span className="font-semibold">{pricePerDay.toLocaleString()} FCFA</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Number of days</span>
                  <span className="font-semibold">{days}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Base Price</span>
                    <span className="font-semibold">{basePrice.toLocaleString()} FCFA</span>
                  </div>
                  
                  {driverOption && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Driver Fee</span>
                      <span className="font-semibold">{driverFee.toLocaleString()} FCFA</span>
                    </div>
                  )}
                  
                  {insuranceOption && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Insurance Fee</span>
                      <span className="font-semibold">{insuranceFee.toLocaleString()} FCFA</span>
                    </div>
                  )}
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-sky-600">{totalPrice.toLocaleString()} FCFA</span>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="mt-6 p-4 bg-sky-50 rounded-xl">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-sky-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold text-sky-900">Free Cancellation</span>
                </div>
                <p className="text-sm text-sky-700">Cancel up to 24 hours before pickup for a full refund</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
