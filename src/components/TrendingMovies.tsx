
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MovieCard from "@/components/MovieCard";
import { Link } from "react-router-dom";
import { TrendingUp, Globe } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

// Mock API call - replace with real API call later
import { trendingMovies } from "@/data/mockData";
import type { Movie } from "@/types/movie";

const fetchTrendingMovies = async (): Promise<Movie[]> => {
  // Simulating API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(trendingMovies);
    }, 1500);
  });
};

const TrendingMoviesSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {Array(4).fill(0).map((_, index) => (
      <div key={index} className="flex flex-col space-y-3">
        <Skeleton className="h-[300px] w-full rounded-md" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    ))}
  </div>
);

const TrendingMovies: React.FC = () => {
  const { data: movies, isLoading } = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: fetchTrendingMovies,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <TrendingUp className="h-5 w-5 text-movie-accent mr-2" />
            Trending Movies
          </h2>
          <HoverCard>
            <HoverCardTrigger>
              <Globe className="h-4 w-4 text-muted-foreground cursor-help" />
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Movie Trends</h4>
                <p className="text-sm text-muted-foreground">
                  These movies are trending based on global audience engagement and social media buzz.
                  Updated every 24 hours.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        <TrendingMoviesSkeleton />
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return null;
  }

  // Find the highest trending movie
  const highestTrending = movies.reduce((prev, current) => 
    prev.popularity > current.popularity ? prev : current
  );

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold flex items-center">
            <TrendingUp className="h-5 w-5 text-movie-accent mr-2" />
            Trending Movies
          </h2>
          <HoverCard>
            <HoverCardTrigger>
              <Globe className="h-4 w-4 text-muted-foreground cursor-help" />
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Movie Trends</h4>
                <p className="text-sm text-muted-foreground">
                  These movies are trending based on global audience engagement and social media buzz.
                  Updated every 24 hours.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        <Link to="/movies" className="text-movie-accent text-sm hover:underline">
          View all
        </Link>
      </div>

      <Carousel 
        opts={{ align: "start" }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {movies.map((movie) => (
            <CarouselItem key={movie.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
              <div className="relative">
                <Link to={`/movies/${movie.id}`}>
                  <MovieCard movie={movie} />
                  {movie.id === highestTrending.id && (
                    <div className="absolute top-2 left-2 bg-movie-accent text-white text-xs font-bold px-2 py-1 rounded-md animate-pulse">
                      Top Buzzing
                    </div>
                  )}
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden sm:block">
          <CarouselPrevious className="-left-4 bg-movie-card border-movie-accent" />
          <CarouselNext className="-right-4 bg-movie-card border-movie-accent" />
        </div>
      </Carousel>
    </div>
  );
};

export default TrendingMovies;
