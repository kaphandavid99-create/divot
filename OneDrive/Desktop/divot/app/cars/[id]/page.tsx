"use client";

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';

interface Car {
  id: number;
  name: string;
  price: string;
  image: string;
  images?: string[];
  category: 'buy' | 'rent';
  location: string;
  rating: number;
  description: string;
  specifications?: {
    year: number;
    mileage: string;
    fuel: string;
    transmission: string;
    seats: number;
    color: string;
    engine: string;
  };
  interiorImages?: string[];
  dashboardImage?: string;
  engineImage?: string;
}

const carData: Car[] = [
  { 
    id: 1, 
    name: 'Toyota Land Cruiser V8', 
    price: '150.000 FCFA/jour', 
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800', 
    category: 'rent', 
    location: 'Douala, Cameroon', 
    rating: 4.8,
    description: 'The Toyota Land Cruiser V8 is a legendary off-road SUV known for its reliability, power, and luxury. Perfect for both urban driving and adventurous terrain.',
    specifications: {
      year: 2022,
      mileage: '45,000 km',
      fuel: 'Diesel',
      transmission: 'Automatic',
      seats: 7,
      color: 'White',
      engine: '4.5L V8'
    }
  },
  { 
    id: 2, 
    name: 'Toyota Hilux 4x4', 
    price: '85.000 FCFA/jour', 
    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800', 
    category: 'rent', 
    location: 'Yaoundé, Cameroon', 
    rating: 4.6,
    description: 'The Toyota Hilux 4x4 is a rugged pickup truck built for tough conditions. Ideal for construction sites, farm work, or outdoor adventures.',
    specifications: {
      year: 2023,
      mileage: '20,000 km',
      fuel: 'Diesel',
      transmission: 'Manual',
      seats: 5,
      color: 'Black',
      engine: '2.8L Turbo Diesel'
    }
  },
  { 
    id: 3, 
    name: 'Mercedes GLE', 
    price: '180.000 FCFA/jour', 
    image: 'https://images.pexels.com/photos/977003/pexels-photo-977003.jpeg?auto=compress&cs=tinysrgb&w=800', 
    category: 'rent', 
    location: 'Douala, Cameroon', 
    rating: 4.9,
    description: 'The Mercedes GLE combines luxury, comfort, and performance. Features advanced technology and premium interior materials.',
    specifications: {
      year: 2023,
      mileage: '15,000 km',
      fuel: 'Petrol',
      transmission: 'Automatic',
      seats: 5,
      color: 'Silver',
      engine: '3.0L V6'
    }
  },
  { 
    id: 4, 
    name: 'Range Rover Sport', 
    price: '55.000.000 FCFA', 
    image: 'https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=800', 
    category: 'buy', 
    location: 'Douala, Cameroon', 
    rating: 4.7,
    description: 'The Range Rover Sport is the ultimate luxury SUV. Combines British elegance with exceptional off-road capabilities.',
    specifications: {
      year: 2022,
      mileage: '35,000 km',
      fuel: 'Petrol',
      transmission: 'Automatic',
      seats: 5,
      color: 'Black',
      engine: '3.0L V6'
    },
    interiorImages: [
      'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1547498/pexels-photo-1547498.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    dashboardImage: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800',
    engineImage: 'https://images.pexels.com/photos/1268612/pexels-photo-1268612.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  { 
    id: 5, 
    name: 'Toyota Prado V6', 
    price: '38.500.000 FCFA', 
    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800', 
    category: 'buy', 
    location: 'Yaoundé, Cameroon', 
    rating: 4.5,
    description: 'The Toyota Prado V6 is a reliable and comfortable SUV perfect for family use and long-distance travel.',
    specifications: {
      year: 2021,
      mileage: '60,000 km',
      fuel: 'Petrol',
      transmission: 'Automatic',
      seats: 7,
      color: 'White',
      engine: '4.0L V6'
    },
    interiorImages: [
      'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1547498/pexels-photo-1547498.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    dashboardImage: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800',
    engineImage: 'https://images.pexels.com/photos/1268612/pexels-photo-1268612.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  { 
    id: 6, 
    name: 'Lexus LX 570', 
    price: '85.000.000 FCFA', 
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800', 
    category: 'buy', 
    location: 'Douala, Cameroon', 
    rating: 4.8,
    description: 'The Lexus LX 570 offers unmatched luxury and performance. Features premium leather interior and advanced safety features.',
    specifications: {
      year: 2022,
      mileage: '25,000 km',
      fuel: 'Petrol',
      transmission: 'Automatic',
      seats: 7,
      color: 'Black',
      engine: '5.7L V8'
    },
    interiorImages: [
      'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1547498/pexels-photo-1547498.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    dashboardImage: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800',
    engineImage: 'https://images.pexels.com/photos/1268612/pexels-photo-1268612.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  { 
    id: 7, 
    name: 'BMW X5', 
    price: '120.000 FCFA/jour', 
    image: 'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=800', 
    category: 'rent', 
    location: 'Douala, Cameroon', 
    rating: 4.7,
    description: 'The BMW X5 is a sporty luxury SUV with excellent driving dynamics and cutting-edge technology.',
    specifications: {
      year: 2023,
      mileage: '18,000 km',
      fuel: 'Petrol',
      transmission: 'Automatic',
      seats: 5,
      color: 'Blue',
      engine: '3.0L Twin-Turbo'
    }
  },
  { 
    id: 8, 
    name: 'Audi Q7', 
    price: '140.000 FCFA/jour', 
    image: 'https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=800', 
    category: 'rent', 
    location: 'Yaoundé, Cameroon', 
    rating: 4.6,
    description: 'The Audi Q7 offers a perfect blend of luxury, space, and technology. Ideal for families and business travelers.',
    specifications: {
      year: 2022,
      mileage: '30,000 km',
      fuel: 'Diesel',
      transmission: 'Automatic',
      seats: 7,
      color: 'Gray',
      engine: '3.0L TDI'
    }
  },
  { 
    id: 9, 
    name: 'Toyota Camry', 
    price: '25.000.000 FCFA', 
    image: 'https://images.pexels.com/photos/627678/pexels-photo-627678.jpeg?auto=compress&cs=tinysrgb&w=800', 
    category: 'buy', 
    location: 'Douala, Cameroon', 
    rating: 4.4,
    description: 'The Toyota Camry is a reliable and fuel-efficient sedan perfect for daily commuting and city driving.',
    specifications: {
      year: 2021,
      mileage: '50,000 km',
      fuel: 'Petrol',
      transmission: 'Automatic',
      seats: 5,
      color: 'Silver',
      engine: '2.5L'
    }
  },
  { 
    id: 10, 
    name: 'Mercedes C-Class', 
    price: '32.000.000 FCFA', 
    image: 'https://images.pexels.com/photos/977003/pexels-photo-977003.jpeg?auto=compress&cs=tinysrgb&w=800', 
    category: 'buy', 
    location: 'Bafoussam, Cameroon', 
    rating: 4.5,
    description: 'The Mercedes C-Class is a compact luxury sedan with elegant styling and advanced safety features.',
    specifications: {
      year: 2022,
      mileage: '40,000 km',
      fuel: 'Petrol',
      transmission: 'Automatic',
      seats: 5,
      color: 'White',
      engine: '2.0L Turbo'
    },
    interiorImages: [
      'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1547498/pexels-photo-1547498.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    dashboardImage: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800',
    engineImage: 'https://images.pexels.com/photos/1268612/pexels-photo-1268612.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  { 
    id: 11, 
    name: 'Volkswagen Tiguan', 
    price: '95.000 FCFA/jour', 
    image: 'https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=800', 
    category: 'rent', 
    location: 'Douala, Cameroon', 
    rating: 4.5,
    description: 'The Volkswagen Tiguan is a compact SUV with spacious interior and modern technology features.',
    specifications: {
      year: 2022,
      mileage: '35,000 km',
      fuel: 'Petrol',
      transmission: 'Automatic',
      seats: 5,
      color: 'White',
      engine: '2.0L TSI'
    }
  },
  { 
    id: 12, 
    name: 'Honda CR-V', 
    price: '28.000.000 FCFA', 
    image: 'https://images.pexels.com/photos/627678/pexels-photo-627678.jpeg?auto=compress&cs=tinysrgb&w=800', 
    category: 'buy', 
    location: 'Yaoundé, Cameroon', 
    rating: 4.3,
    description: 'The Honda CR-V is a reliable compact SUV with excellent fuel economy and spacious interior.',
    specifications: {
      year: 2021,
      mileage: '55,000 km',
      fuel: 'Petrol',
      transmission: 'Automatic',
      seats: 5,
      color: 'Gray',
      engine: '1.5L Turbo'
    },
    interiorImages: [
      'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1547498/pexels-photo-1547498.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    dashboardImage: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800',
    engineImage: 'https://images.pexels.com/photos/1268612/pexels-photo-1268612.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
];

export default function CarDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [reviews, setReviews] = useState([
    { id: 1, user: 'John Doe', rating: 5, comment: 'Excellent car! Very clean and well-maintained. The rental process was smooth and hassle-free.', date: '2026-04-15' },
    { id: 2, user: 'Sarah M.', rating: 4, comment: 'Great vehicle overall. Minor issue with the AC but it was resolved quickly. Would rent again.', date: '2026-04-10' },
    { id: 3, user: 'Emmanuel K.', rating: 5, comment: 'Perfect for our family trip. Spacious, comfortable, and reliable. Highly recommended!', date: '2026-04-05' },
  ]);
  
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

  const handleFavoriteToggle = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    setIsFavorite(!isFavorite);
  };

  const handleRentOrBuy = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    if (car.category === 'rent') {
      router.push(`/cars/${car.id}/book`);
    } else {
      alert(`Purchase inquiry for ${car.name}. A representative will contact you shortly.`);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push('/login');
      return;
    }
    
    const review = {
      id: reviews.length + 1,
      user: user.name || 'Anonymous',
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };
    
    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: '' });
    setShowReviewForm(false);
    alert('Thank you for your review!');
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/cars" className="inline-flex items-center text-sky-600 hover:text-sky-700 font-semibold">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Vehicles
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="relative h-96 bg-gray-200 rounded-2xl overflow-hidden mb-4">
              <Image
                src={car.image}
                alt={car.name}
                fill
                className="object-cover"
                priority
              />
              <button
                onClick={handleFavoriteToggle}
                className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <svg className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {[car.image, car.image, car.image, car.image].map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative h-24 rounded-xl overflow-hidden border-2 transition-colors ${
                    selectedImage === idx ? 'border-sky-500' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${car.name} ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Description */}
            <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed">{car.description}</p>
            </div>

            {/* Specifications */}
            <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                {car.specifications && Object.entries(car.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 capitalize">{key}</span>
                    <span className="font-semibold text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interior, Dashboard & Engine Images */}
            {(car.interiorImages || car.dashboardImage || car.engineImage) && (
              <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Views</h2>
                
                {/* Interior Images */}
                {car.interiorImages && car.interiorImages.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Interior</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {car.interiorImages.map((img, idx) => (
                        <div key={idx} className="relative h-48 rounded-xl overflow-hidden">
                          <Image
                            src={img}
                            alt={`${car.name} interior ${idx + 1}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dashboard Image */}
                {car.dashboardImage && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Dashboard</h3>
                    <div className="relative h-64 rounded-xl overflow-hidden">
                      <Image
                        src={car.dashboardImage}
                        alt={`${car.name} dashboard`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                )}

                {/* Engine Image */}
                {car.engineImage && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Engine</h3>
                    <div className="relative h-64 rounded-xl overflow-hidden">
                      <Image
                        src={car.engineImage}
                        alt={`${car.name} engine`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Reviews Section */}
            <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Reviews & Ratings</h2>
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="px-4 py-2 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 transition-colors"
                >
                  Write a Review
                </button>
              </div>

              {/* Review Form */}
              {showReviewForm && (
                <form onSubmit={handleSubmitReview} className="mb-6 p-4 bg-gray-50 rounded-xl">
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="text-3xl transition-colors"
                        >
                          <svg
                            className={`w-8 h-8 ${star <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Review</label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none resize-none"
                      placeholder="Share your experience with this vehicle..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 transition-colors"
                    >
                      Submit Review
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                          {review.user.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{review.user}</div>
                          <div className="flex items-center">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <div className="mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  car.category === 'buy' ? 'bg-green-100 text-green-700' : 'bg-sky-100 text-sky-700'
                }`}>
                  {car.category === 'buy' ? 'For Sale' : 'For Rent'}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">{car.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {renderStars(car.rating)}
                </div>
                <span className="ml-2 text-gray-600">({car.rating})</span>
              </div>

              <div className="flex items-center text-gray-600 mb-6">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {car.location}
              </div>

              <div className="border-t border-gray-200 pt-6 mb-6">
                <div className="text-3xl font-bold text-sky-600 mb-1">{car.price}</div>
                {car.category === 'rent' && (
                  <p className="text-gray-600 text-sm">per day</p>
                )}
              </div>

              <button
                onClick={handleRentOrBuy}
                className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-4 rounded-xl font-bold hover:from-sky-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl mb-4"
              >
                {user ? (car.category === 'buy' ? 'Purchase Now' : 'Book Now') : 'Login to ' + (car.category === 'buy' ? 'Purchase' : 'Book')}
              </button>

              <button
                onClick={handleFavoriteToggle}
                className={`w-full py-4 rounded-xl font-bold transition-all duration-300 border-2 ${
                  isFavorite 
                    ? 'border-red-500 text-red-500 bg-red-50 hover:bg-red-100' 
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>

              {/* Contact Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
                <div className="space-y-2">
                  <a href="tel:+237123456789" className="flex items-center text-sky-600 hover:text-sky-700">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +237 123 456 789
                  </a>
                  <a href="mailto:info@divot.cm" className="flex items-center text-sky-600 hover:text-sky-700">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    info@divot.cm
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
