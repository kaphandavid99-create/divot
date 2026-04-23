import Image from 'next/image';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface CarouselCardProps {
  id: number;
  name: string;
  price: string;
  image: string;
  category: 'buy' | 'rent';
  rating: number;
}

const CarouselCard = ({ id, name, price, image, category, rating }: CarouselCardProps) => {
  const { user } = useAuth();
  const router = useRouter();

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-gradient">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#d1d5db" />
            </linearGradient>
          </defs>
          <path fill="url(#half-gradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 fill-gray-300 text-gray-300" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group h-full flex flex-col">
      {/* Image Container */}
      <div className="relative h-36 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          placeholder="empty"
          unoptimized
        />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold">
          {category === 'rent' ? 'Daily Rental' : 'For Sale'}
        </div>
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <svg className="w-3 h-3 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {rating}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Car Name */}
        <h3 className="text-lg font-bold text-black mb-3">{name}</h3>
        
        {/* Rating Stars */}
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {renderStars(rating)}
          </div>
          <span className="ml-2 text-sm text-gray-500">({rating})</span>
        </div>

        {/* Price and Action */}
        <div className="flex justify-between items-center mt-auto">
          <div>
            <span className="text-sky-500 font-extrabold text-lg">{price}</span>
            {category === 'rent' && <span className="text-gray-500 text-sm block">per day</span>}
          </div>
          <button 
            onClick={() => {
              if (user) {
                // Handle rent/purchase action
                alert(`${category === 'buy' ? 'Purchase' : 'Rent'} request for ${name} - This would open a booking/purchase form`);
              } else {
                router.push('/login');
              }
            }}
            className="text-black font-bold text-sm hover:text-sky-500 transition-colors flex items-center gap-1"
          >
            {user ? (category === 'buy' ? 'Purchase' : 'Rent') : 'Login to ' + (category === 'buy' ? 'Purchase' : 'Rent')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;
