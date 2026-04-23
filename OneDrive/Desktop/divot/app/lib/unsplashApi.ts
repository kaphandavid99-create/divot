// Unsplash API utility for fetching car images
// Note: You need to get an API key from https://unsplash.com/developers

const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || '';

interface UnsplashPhoto {
  id: string;
  urls: {
    regular: string;
    small: string;
    full: string;
  };
  description: string;
  alt_description: string;
}

interface UnsplashResponse {
  results: UnsplashPhoto[];
  total: number;
  total_pages: number;
}

/**
 * Search for car images on Unsplash
 * @param query - Search query (e.g., "car", "SUV", "luxury car")
 * @param perPage - Number of results to return (max 30)
 */
export async function searchCarImages(query: string = 'car', perPage: number = 10): Promise<UnsplashPhoto[]> {
  if (!UNSPLASH_ACCESS_KEY) {
    console.warn('Unsplash API key not set. Using mock data.');
    return [];
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&client_id=${UNSPLASH_ACCESS_KEY}`,
      {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.statusText}`);
    }

    const data: UnsplashResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching from Unsplash:', error);
    return [];
  }
}

/**
 * Get a random car image from Unsplash
 */
export async function getRandomCarImage(): Promise<string | null> {
  const photos = await searchCarImages('luxury car', 1);
  return photos.length > 0 ? photos[0].urls.regular : null;
}

/**
 * Get car images by type (SUV, sedan, sports car, etc.)
 */
export async function getCarImagesByType(type: string): Promise<string[]> {
  const photos = await searchCarImages(type, 10);
  return photos.map(photo => photo.urls.regular);
}
