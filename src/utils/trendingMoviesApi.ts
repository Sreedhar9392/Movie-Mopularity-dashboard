
import { Movie } from "@/types/movie";
import { trendingMovies } from "@/data/mockData";

// Simple in-memory cache
interface CacheEntry {
  timestamp: number;
  data: Movie[];
}

interface CacheStore {
  [key: string]: CacheEntry;
}

// Cache duration in milliseconds (30 minutes)
const CACHE_DURATION = 30 * 60 * 1000;
const cache: CacheStore = {};

// User preferences mock (would normally come from a database)
const mockUserPreferences: Record<string, string[]> = {
  "user1": ["Action", "Sci-Fi"],
  "user2": ["Drama", "Comedy"],
  "user3": ["Horror", "Thriller"]
};

/**
 * Get trending movies with filtering, caching, and personalization
 */
export async function getTrendingMovies({
  page = 1,
  pageSize = 10,
  releaseYear,
  releaseDateStart,
  releaseDateEnd,
  userId,
  period = "weekly"
}: {
  page?: number;
  pageSize?: number;
  releaseYear?: number;
  releaseDateStart?: string;
  releaseDateEnd?: string;
  userId?: string;
  period?: string;
}): Promise<{
  movies: Movie[];
  cacheStatus: "HIT" | "MISS";
  personalizationApplied: boolean;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}> {
  // Create cache key based on parameters
  const cacheKey = JSON.stringify({
    page,
    pageSize,
    releaseYear,
    releaseDateStart,
    releaseDateEnd,
    period
  });

  // Check cache
  let cacheStatus: "HIT" | "MISS" = "MISS";
  if (cache[cacheKey] && Date.now() - cache[cacheKey].timestamp < CACHE_DURATION) {
    console.log("Cache hit for", cacheKey);
    cacheStatus = "HIT";
    const cachedMovies = cache[cacheKey].data;
    
    // Apply personalization if userId is provided
    const personalizedMovies = userId ? applyPersonalization(cachedMovies, userId) : cachedMovies;
    
    return {
      movies: personalizedMovies,
      cacheStatus,
      personalizationApplied: !!userId,
      pagination: calculatePagination(personalizedMovies.length, page, pageSize)
    };
  }

  // Simulate API fetch delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Apply filters to trending movies
  let filteredMovies = [...trendingMovies];

  // Filter by release year if provided
  if (releaseYear) {
    filteredMovies = filteredMovies.filter(movie => {
      const movieYear = new Date(movie.releaseDate).getFullYear();
      return movieYear === releaseYear;
    });
  }

  // Filter by date range if provided
  if (releaseDateStart && releaseDateEnd) {
    const startDate = new Date(releaseDateStart).getTime();
    const endDate = new Date(releaseDateEnd).getTime();
    
    filteredMovies = filteredMovies.filter(movie => {
      const movieDate = new Date(movie.releaseDate).getTime();
      return movieDate >= startDate && movieDate <= endDate;
    });
  }

  // Store in cache
  cache[cacheKey] = {
    timestamp: Date.now(),
    data: filteredMovies
  };

  // Apply personalization if userId is provided
  const personalizationApplied = !!userId;
  const personalizedMovies = userId ? applyPersonalization(filteredMovies, userId) : filteredMovies;

  // Calculate pagination
  const { currentPage, totalPages, totalItems } = calculatePagination(
    personalizedMovies.length,
    page,
    pageSize
  );

  // Return paginated results
  const startIdx = (page - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, personalizedMovies.length);
  const paginatedMovies = personalizedMovies.slice(startIdx, endIdx);

  return {
    movies: paginatedMovies,
    cacheStatus,
    personalizationApplied,
    pagination: {
      currentPage,
      totalPages,
      totalItems
    }
  };
}

/**
 * Apply personalization based on user preferences
 */
function applyPersonalization(movies: Movie[], userId: string): Movie[] {
  const userGenres = mockUserPreferences[userId] || [];
  
  if (userGenres.length === 0) {
    return movies;
  }

  // Sort movies by matching user's preferred genres
  return [...movies].sort((a, b) => {
    const aMatchCount = a.genre.filter(g => userGenres.includes(g)).length;
    const bMatchCount = b.genre.filter(g => userGenres.includes(g)).length;
    
    // Sort by number of matching genres (descending)
    return bMatchCount - aMatchCount;
  });
}

/**
 * Calculate pagination metadata
 */
function calculatePagination(totalItems: number, currentPage: number, pageSize: number) {
  return {
    currentPage,
    totalPages: Math.ceil(totalItems / pageSize),
    totalItems
  };
}

/**
 * Clear the entire cache or a specific entry
 */
export function clearCache(cacheKey?: string) {
  if (cacheKey) {
    delete cache[cacheKey];
  } else {
    Object.keys(cache).forEach(key => delete cache[key]);
  }
}
