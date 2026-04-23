// Mock car database with realistic Cameroon market pricing
export interface Car {
  id: number;
  name: string;
  make: string;
  model: string;
  year: number;
  price: string;
  category: 'buy' | 'rent';
  location: string;
  rating: number;
  image: string;
  description: string;
  features: string[];
}

export const carDatabase: Car[] = [
  {
    id: 1,
    name: 'Range Rover Sport',
    make: 'Land Rover',
    model: 'Range Rover Sport',
    year: 2022,
    price: '55.000.000 FCFA',
    category: 'buy',
    location: 'Douala, Cameroon',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop',
    description: 'Luxury SUV with premium features, perfect for both city and off-road adventures.',
    features: ['4WD', 'Leather Interior', 'Navigation', 'Sunroof', 'Premium Sound']
  },
  {
    id: 2,
    name: 'Toyota Land Cruiser',
    make: 'Toyota',
    model: 'Land Cruiser',
    year: 2021,
    price: '150.000 FCFA/day',
    category: 'rent',
    location: 'Yaoundé, Cameroon',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&auto=format&fit=crop',
    description: 'Reliable and powerful off-road vehicle, ideal for exploration.',
    features: ['4WD', '7 Seats', 'Off-road Capability', 'Cruise Control', 'Bluetooth']
  },
  {
    id: 3,
    name: 'Toyota Corolla',
    make: 'Toyota',
    model: 'Corolla',
    year: 2020,
    price: '18.500.000 FCFA',
    category: 'buy',
    location: 'Douala, Cameroon',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop',
    description: 'Fuel-efficient sedan perfect for daily commuting.',
    features: ['Automatic', 'Air Conditioning', 'Bluetooth', 'Backup Camera', 'Fuel Efficient']
  },
  {
    id: 4,
    name: 'Hyundai Santa Fe',
    make: 'Hyundai',
    model: 'Santa Fe',
    year: 2022,
    price: '25.000.000 FCFA',
    category: 'buy',
    location: 'Douala, Cameroon',
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&auto=format&fit=crop',
    description: 'Family-friendly SUV with ample space and modern features.',
    features: ['7 Seats', 'AWD', 'Touch Screen', 'Apple CarPlay', 'Android Auto']
  },
  {
    id: 5,
    name: 'Lexus LX 570',
    make: 'Lexus',
    model: 'LX 570',
    year: 2021,
    price: '85.000.000 FCFA',
    category: 'buy',
    location: 'Douala, Cameroon',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop',
    description: 'Ultra-luxury SUV with premium comfort and performance.',
    features: ['V8 Engine', 'Premium Leather', 'Massage Seats', 'Advanced Safety', 'Premium Audio']
  },
  {
    id: 6,
    name: 'Toyota Hilux',
    make: 'Toyota',
    model: 'Hilux',
    year: 2022,
    price: '85.000 FCFA/day',
    category: 'rent',
    location: 'Bafoussam, Cameroon',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop',
    description: 'Durable pickup truck for work and adventure.',
    features: ['4WD', 'Double Cab', 'Towing Capacity', 'Durable Build', 'Manual Transmission']
  },
  {
    id: 23,
    name: 'Toyota Yaris',
    make: 'Toyota',
    model: 'Yaris',
    year: 2021,
    price: '25.000 FCFA/day',
    category: 'rent',
    location: 'Douala, Cameroon',
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&auto=format&fit=crop',
    description: 'Compact and economical city car.',
    features: ['Automatic', 'Air Conditioning', 'Bluetooth', 'Fuel Efficient', 'Easy Parking']
  },
  {
    id: 24,
    name: 'Mercedes C-Class',
    make: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2022,
    price: '120.000 FCFA/day',
    category: 'rent',
    location: 'Douala, Cameroon',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop',
    description: 'Premium luxury sedan for business and special occasions.',
    features: ['Leather Interior', 'Navigation', 'Premium Sound', 'Sunroof', 'Apple CarPlay']
  },
  {
    id: 25,
    name: 'BMW X3',
    make: 'BMW',
    model: 'X3',
    year: 2022,
    price: '110.000 FCFA/day',
    category: 'rent',
    location: 'Yaoundé, Cameroon',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop',
    description: 'Luxury SUV with dynamic performance.',
    features: ['xDrive AWD', 'M Sport Package', 'Navigation', 'Panoramic Roof', 'Harman Kardon Audio']
  },
  {
    id: 26,
    name: 'Toyota Rav4',
    make: 'Toyota',
    model: 'RAV4',
    year: 2021,
    price: '65.000 FCFA/day',
    category: 'rent',
    location: 'Bafoussam, Cameroon',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&auto=format&fit=crop',
    description: 'Versatile compact SUV for family trips.',
    features: ['AWD', '7 Seats', 'Toyota Safety Sense', 'Bluetooth', 'Backup Camera']
  },
  {
    id: 27,
    name: 'Honda Civic',
    make: 'Honda',
    model: 'Civic',
    year: 2022,
    price: '40.000 FCFA/day',
    category: 'rent',
    location: 'Douala, Cameroon',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&auto=format&fit=crop',
    description: 'Stylish sedan with modern features.',
    features: ['Automatic', 'Honda Sensing', 'Apple CarPlay', 'Android Auto', 'LED Headlights']
  },
  {
    id: 7,
    name: 'Mercedes GLE',
    make: 'Mercedes-Benz',
    model: 'GLE',
    year: 2023,
    price: '75.000.000 FCFA',
    category: 'buy',
    location: 'Douala, Cameroon',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop',
    description: 'Premium luxury SUV with cutting-edge technology.',
    features: ['MBUX System', 'Air Suspension', 'Premium Leather', '360 Camera', 'Executive Package']
  },
  {
    id: 8,
    name: 'BMW X5',
    make: 'BMW',
    model: 'X5',
    year: 2022,
    price: '65.000.000 FCFA',
    category: 'buy',
    location: 'Yaoundé, Cameroon',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop',
    description: 'Sports activity vehicle with dynamic performance.',
    features: ['xDrive AWD', 'M Sport Package', 'Navigation', 'HUD Display', 'Premium Sound']
  },
  {
    id: 9,
    name: 'Ford Mustang',
    make: 'Ford',
    model: 'Mustang',
    year: 2021,
    price: '35.000.000 FCFA',
    category: 'buy',
    location: 'Douala, Cameroon',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=800&auto=format&fit=crop',
    description: 'Iconic American muscle car with thrilling performance.',
    features: ['V8 Engine', 'Manual Transmission', 'Sport Mode', 'Brembo Brakes', 'Performance Exhaust']
  },
  {
    id: 10,
    name: 'Toyota Prado V6',
    make: 'Toyota',
    model: 'Prado',
    year: 2021,
    price: '38.500.000 FCFA',
    category: 'buy',
    location: 'Yaoundé, Cameroon',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=800&auto=format&fit=crop',
    description: 'Reliable SUV perfect for family and business.',
    features: ['V6 Engine', '7 Seats', '4WD', 'Premium Interior', 'Advanced Safety']
  },
  {
    id: 11,
    name: 'Nissan Altima',
    make: 'Nissan',
    model: 'Altima',
    year: 2022,
    price: '22.000.000 FCFA',
    category: 'buy',
    location: 'Douala, Cameroon',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&auto=format&fit=crop',
    description: 'Sleek sedan with modern technology and comfort.',
    features: ['CVT Transmission', 'ProPilot Assist', 'Apple CarPlay', 'Remote Start', 'LED Headlights']
  },
  {
    id: 12,
    name: 'Honda CR-V',
    make: 'Honda',
    model: 'CR-V',
    year: 2022,
    price: '28.000.000 FCFA',
    category: 'buy',
    location: 'Bamenda, Cameroon',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&auto=format&fit=crop',
    description: 'Compact SUV with excellent fuel economy and versatility.',
    features: ['Honda Sensing', 'AWD', 'Magic Seat', 'Apple CarPlay', 'Android Auto']
  },
  {
    id: 13,
    name: 'Audi Q7',
    make: 'Audi',
    model: 'Q7',
    year: 2022,
    price: '72.000.000 FCFA',
    category: 'buy',
    location: 'Douala, Cameroon',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&auto=format&fit=crop',
    description: 'Luxury SUV with three rows of seating and advanced technology.',
    features: ['Quattro AWD', 'MMI Navigation', 'Bang & Olufsen Audio', 'Virtual Cockpit', 'Adaptive Air Suspension']
  },
  {
    id: 14,
    name: 'Volkswagen Tiguan',
    make: 'Volkswagen',
    model: 'Tiguan',
    year: 2021,
    price: '32.000.000 FCFA',
    category: 'buy',
    location: 'Yaoundé, Cameroon',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&auto=format&fit=crop',
    description: 'Versatile compact SUV with German engineering.',
    features: ['4MOTION AWD', 'Digital Cockpit', 'App-Connect', 'Adaptive Cruise Control', 'Lane Assist']
  },
  {
    id: 15,
    name: 'Mercedes C-Class',
    make: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2023,
    price: '45.000.000 FCFA',
    category: 'buy',
    location: 'Douala, Cameroon',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop',
    description: 'Executive sedan with premium luxury and performance.',
    features: ['MBUX System', 'Burmeister Audio', 'Executive Rear Seat', 'Wireless Charging', 'Night Vision']
  },
  {
    id: 16,
    name: 'Toyota Rav4',
    make: 'Toyota',
    model: 'RAV4',
    year: 2022,
    price: '30.000.000 FCFA',
    category: 'buy',
    location: 'Bafoussam, Cameroon',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&auto=format&fit=crop',
    description: 'Reliable compact SUV perfect for urban and adventure driving.',
    features: ['AWD', 'Toyota Safety Sense', 'Panoramic Roof', 'JBL Audio', 'Wireless Charging']
  },
  {
    id: 17,
    name: 'BMW 3 Series',
    make: 'BMW',
    model: '3 Series',
    year: 2022,
    price: '42.000.000 FCFA',
    category: 'buy',
    location: 'Douala, Cameroon',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop',
    description: 'Sports sedan with dynamic performance and luxury.',
    features: ['xDrive AWD', 'Live Cockpit Professional', 'Harman Kardon Audio', 'M Sport Package', 'Parking Assistant']
  },
  {
    id: 18,
    name: 'Ford Explorer',
    make: 'Ford',
    model: 'Explorer',
    year: 2021,
    price: '35.000.000 FCFA',
    category: 'buy',
    location: 'Yaoundé, Cameroon',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop',
    description: 'Spacious SUV perfect for family adventures.',
    features: ['4WD', '3 Rows of Seating', 'SYNC 3 Infotainment', 'Ford Co-Pilot360', 'Panoramic Vista Roof']
  },
  {
    id: 19,
    name: 'Lexus ES',
    make: 'Lexus',
    model: 'ES',
    year: 2023,
    price: '38.000.000 FCFA',
    category: 'buy',
    location: 'Douala, Cameroon',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop',
    description: 'Luxury sedan with exceptional comfort and reliability.',
    features: ['FWD', 'Mark Levinson Audio', 'Lexus Safety System+', 'Heated & Ventilated Seats', 'Head-Up Display']
  },
  {
    id: 20,
    name: 'Mazda CX-5',
    make: 'Mazda',
    model: 'CX-5',
    year: 2022,
    price: '26.000.000 FCFA',
    category: 'buy',
    location: 'Bamenda, Cameroon',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&auto=format&fit=crop',
    description: 'Stylish compact SUV with premium interior.',
    features: ['AWD', 'i-Activsense Safety', 'Mazda Connect', 'Bose Audio', 'Leather Interior']
  },
  {
    id: 21,
    name: 'Toyota Camry',
    make: 'Toyota',
    model: 'Camry',
    year: 2023,
    price: '24.000.000 FCFA',
    category: 'buy',
    location: 'Douala, Cameroon',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&auto=format&fit=crop',
    description: 'Reliable sedan with modern styling and efficiency.',
    features: ['Hybrid Option', 'Toyota Safety Sense 2.5+', 'Apple CarPlay', 'Android Auto', 'JBL Audio']
  },
  {
    id: 22,
    name: 'Hyundai Tucson',
    make: 'Hyundai',
    model: 'Tucson',
    year: 2022,
    price: '27.000.000 FCFA',
    category: 'buy',
    location: 'Yaoundé, Cameroon',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&auto=format&fit=crop',
    description: 'Modern compact SUV with bold design.',
    features: ['HTRAC AWD', '10.25-inch Touchscreen', 'Blind-Spot View Monitor', 'Remote Start', 'Surround View Monitor']
  }
];

// Hero section car images (rotating)
export const heroCarImages = [
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop'
];

// Helper functions
export const getCarsByCategory = (category: 'buy' | 'rent') => {
  return carDatabase.filter(car => car.category === category);
};

export const getCarById = (id: number) => {
  return carDatabase.find(car => car.id === id);
};

export const searchCars = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return carDatabase.filter(car => 
    car.name.toLowerCase().includes(lowerQuery) ||
    car.make.toLowerCase().includes(lowerQuery) ||
    car.model.toLowerCase().includes(lowerQuery) ||
    car.location.toLowerCase().includes(lowerQuery)
  );
};

export const getCarsByLocation = (location: string) => {
  return carDatabase.filter(car => 
    car.location.toLowerCase().includes(location.toLowerCase())
  );
};
