
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import MovieCard from "@/components/MovieCard";
import MovieGrid from "@/components/MovieGrid";
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  Globe, 
  Filter, 
  Calendar, 
  MapPin, 
  Tag, 
  ChevronDown, 
  ChevronUp,
  X
} from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

// Mock API call - replace with real API call later
import { trendingMovies } from "@/data/mockData";
import type { Movie } from "@/types/movie";

interface TrendFilters {
  genres: string[];
  region: string;
  releaseWindow: string;
}

const fetchTrendingMovies = async (
  period: string = "weekly",
  limit: number = 30,
  filters?: TrendFilters
): Promise<Movie[]> => {
  // Simulating API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...trendingMovies];
      
      // Apply filters if any
      if (filters) {
        if (filters.genres.length > 0) {
          filtered = filtered.filter(movie => 
            movie.genre.some(g => filters.genres.includes(g))
          );
        }
        
        // Additional filtering logic would go here
        // For region, release window, etc.
      }
      
      // Slice to get the requested number of movies
      resolve(filtered.slice(0, limit));
    }, 1500);
  });
};

const genreOptions = [
  "Action", "Adventure", "Animation", "Comedy", "Crime", 
  "Documentary", "Drama", "Fantasy", "Horror", "Sci-Fi", "Thriller"
];

const regionOptions = ["Global", "North America", "Europe", "Asia", "Latin America"];
const releaseWindowOptions = ["All Time", "This Year", "Last 90 Days", "Last 30 Days", "Upcoming"];

const TrendingMoviesSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
    {Array(10).fill(0).map((_, index) => (
      <div key={index} className="flex flex-col space-y-3">
        <Skeleton className="h-[300px] w-full rounded-md" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    ))}
  </div>
);

const TrendingMovies: React.FC = () => {
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");
  const [displayLimit, setDisplayLimit] = useState<number>(10);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [period, setPeriod] = useState<string>("weekly");
  const [filters, setFilters] = useState<TrendFilters>({
    genres: [],
    region: "Global",
    releaseWindow: "All Time"
  });
  const { toast } = useToast();

  const { data: movies, isLoading, isError } = useQuery({
    queryKey: ["trendingMovies", period, displayLimit, filters],
    queryFn: () => fetchTrendingMovies(period, displayLimit, filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  const handleShowMore = () => {
    setDisplayLimit(prev => prev + 10);
    toast({
      title: "Loading more movies",
      description: "Fetching the next 10 trending movies...",
      duration: 2000,
    });
  };
  
  const toggleGenre = (genre: string) => {
    setFilters(prev => {
      if (prev.genres.includes(genre)) {
        return {
          ...prev,
          genres: prev.genres.filter(g => g !== genre)
        };
      } else {
        return {
          ...prev,
          genres: [...prev.genres, genre]
        };
      }
    });
  };
  
  const setRegion = (region: string) => {
    setFilters(prev => ({
      ...prev,
      region
    }));
  };
  
  const setReleaseWindow = (window: string) => {
    setFilters(prev => ({
      ...prev,
      releaseWindow: window
    }));
  };
  
  const clearFilters = () => {
    setFilters({
      genres: [],
      region: "Global",
      releaseWindow: "All Time"
    });
    toast({
      title: "Filters cleared",
      description: "Showing all trending movies",
      duration: 2000,
    });
  };

  if (isError) {
    return (
      <div className="p-8 text-center bg-movie-card rounded-lg border border-red-500">
        <p className="text-red-400 mb-2">Unable to load trending movies</p>
        <Button 
          variant="outline" 
          onClick={() => window.location.reload()}
          className="mx-auto"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="mb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
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
        
        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex items-center gap-1"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filters
            {showFilters ? 
              <ChevronUp className="h-3 w-3 ml-1" /> : 
              <ChevronDown className="h-3 w-3 ml-1" />
            }
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <Tag className="h-4 w-4" />
                View
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuCheckboxItem 
                checked={viewMode === "carousel"} 
                onCheckedChange={() => setViewMode("carousel")}
              >
                Carousel View
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={viewMode === "grid"} 
                onCheckedChange={() => setViewMode("grid")}
              >
                Grid View
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link to="/movies" className="text-movie-accent text-sm hover:underline">
            View all
          </Link>
        </div>
      </div>
      
      {/* Tabs for time periods */}
      <Tabs defaultValue={period} className="mb-6" onValueChange={setPeriod}>
        <TabsList>
          <TabsTrigger value="daily">Daily Trends</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Trends</TabsTrigger>
          <TabsTrigger value="anticipated">Most Anticipated</TabsTrigger>
        </TabsList>
        <TabsContent value="daily" className="mt-0"></TabsContent>
        <TabsContent value="weekly" className="mt-0"></TabsContent>
        <TabsContent value="anticipated" className="mt-0"></TabsContent>
      </Tabs>
      
      {/* Filters section */}
      {showFilters && (
        <div className="bg-movie-card rounded-lg p-4 mb-6 border border-border animate-fade-in">
          <div className="flex flex-wrap justify-between items-center mb-4">
            <h3 className="text-sm font-medium">Refine Results</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters} 
              className="text-xs"
            >
              <X className="h-3 w-3 mr-1" /> Clear All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Genre Filter */}
            <div>
              <label className="text-xs text-muted-foreground mb-2 flex items-center">
                <Tag className="h-3 w-3 mr-1" /> Genres
              </label>
              <div className="flex flex-wrap gap-1 mt-1">
                {genreOptions.slice(0, 8).map(genre => (
                  <Badge 
                    key={genre}
                    variant={filters.genres.includes(genre) ? "default" : "outline"}
                    className="cursor-pointer text-xs"
                    onClick={() => toggleGenre(genre)}
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Region Filter */}
            <div>
              <label className="text-xs text-muted-foreground mb-2 flex items-center">
                <MapPin className="h-3 w-3 mr-1" /> Region
              </label>
              <div className="flex flex-wrap gap-1 mt-1">
                {regionOptions.map(region => (
                  <Badge 
                    key={region}
                    variant={filters.region === region ? "default" : "outline"}
                    className="cursor-pointer text-xs"
                    onClick={() => setRegion(region)}
                  >
                    {region}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Release Window Filter */}
            <div>
              <label className="text-xs text-muted-foreground mb-2 flex items-center">
                <Calendar className="h-3 w-3 mr-1" /> Release Window
              </label>
              <div className="flex flex-wrap gap-1 mt-1">
                {releaseWindowOptions.map(window => (
                  <Badge 
                    key={window}
                    variant={filters.releaseWindow === window ? "default" : "outline"}
                    className="cursor-pointer text-xs"
                    onClick={() => setReleaseWindow(window)}
                  >
                    {window}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Applied Filters display */}
      {(filters.genres.length > 0 || filters.region !== "Global" || filters.releaseWindow !== "All Time") && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.genres.map(genre => (
            <Badge key={genre} variant="secondary" className="flex items-center gap-1">
              {genre}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => toggleGenre(genre)}
              />
            </Badge>
          ))}
          
          {filters.region !== "Global" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {filters.region}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => setRegion("Global")}
              />
            </Badge>
          )}
          
          {filters.releaseWindow !== "All Time" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {filters.releaseWindow}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => setReleaseWindow("All Time")}
              />
            </Badge>
          )}
        </div>
      )}

      {isLoading ? (
        <TrendingMoviesSkeleton />
      ) : movies && movies.length > 0 ? (
        <>
          {/* Movie Display - Conditional based on viewMode */}
          {viewMode === "carousel" ? (
            <Carousel 
              opts={{ align: "start" }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {movies.map((movie, index) => (
                  <CarouselItem key={movie.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                    <div className="relative">
                      <Link to={`/movies/${movie.id}`}>
                        <MovieCard movie={movie} />
                        {index === 0 && (
                          <div className="absolute top-2 left-2 bg-movie-accent text-white text-xs font-bold px-2 py-1 rounded-md animate-pulse">
                            Top Buzzing
                          </div>
                        )}
                        {index > 0 && index < 10 && (
                          <div className="absolute top-2 left-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded-md">
                            #{index + 1}
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
          ) : (
            <ScrollArea className="h-[900px] rounded-md">
              <MovieGrid movies={movies} showRank />
            </ScrollArea>
          )}
          
          {/* Show More button */}
          {displayLimit < 30 && (
            <div className="flex justify-center mt-8">
              <Button onClick={handleShowMore} variant="outline" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                Show More Trending Movies
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 bg-movie-card rounded-lg">
          <p className="text-muted-foreground text-lg">No trending movies found</p>
          <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters</p>
          <Button onClick={clearFilters} variant="outline" className="mt-4">
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default TrendingMovies;
