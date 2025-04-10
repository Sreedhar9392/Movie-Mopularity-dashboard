
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Film, Filter, SortDesc, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MovieGrid from "@/components/MovieGrid";
import { Movie } from "@/types/movie";
import { getTrendingMovies } from "@/utils/trendingMoviesApi";
import { useToast } from "@/hooks/use-toast";

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 10 }, (_, i) => currentYear - i);

const Movies: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [period, setPeriod] = useState("weekly");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [releaseYear, setReleaseYear] = useState<number | undefined>(undefined);
  const [cacheStatus, setCacheStatus] = useState<"HIT" | "MISS">("MISS");
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        // Simulate a user ID for personalization (in a real app, this would come from auth)
        const userId = "user1"; 
        
        const response = await getTrendingMovies({
          page,
          pageSize: 30,
          releaseYear,
          period,
          userId
        });
        
        setMovies(response.movies);
        setTotalPages(response.pagination.totalPages);
        setCacheStatus(response.cacheStatus);
        
        if (response.cacheStatus === "HIT") {
          toast({
            title: "Using cached data",
            description: "Displaying cached trending movies for faster performance",
            duration: 3000,
          });
        }
        
        if (response.personalizationApplied) {
          toast({
            title: "Personalized for you",
            description: "Movies have been sorted based on your preferences",
            duration: 3000,
          });
        }
      } catch (error) {
        console.error("Failed to fetch trending movies:", error);
        toast({
          title: "Error",
          description: "Failed to load trending movies. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMovies();
  }, [page, releaseYear, period, toast]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleYearChange = (value: string) => {
    setReleaseYear(value === "all" ? undefined : parseInt(value));
    setPage(1); // Reset to page 1 when changing filters
  };
  
  const handlePeriodChange = (value: string) => {
    setPeriod(value);
    setPage(1); // Reset to page 1 when changing period
  };

  // Filter movies based on search term
  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Movies loading state
  const MoviesSkeleton = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {Array(12).fill(0).map((_, index) => (
        <div key={index} className="flex flex-col space-y-3">
          <Skeleton className="h-[300px] w-full rounded-md" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6 bg-movie-dark">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Film className="h-6 w-6 text-movie-accent" />
                Movies Library
              </h1>
              <p className="text-muted-foreground">
                Browse and discover popular movies
                {cacheStatus === "HIT" && (
                  <span className="ml-2 px-1.5 py-0.5 text-xs bg-green-900 text-green-300 rounded-md">
                    Cached
                  </span>
                )}
              </p>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none md:w-[300px]">
                <Input 
                  placeholder="Search movies..." 
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-3 bg-secondary border-none"
                />
              </div>
              
              <Select onValueChange={handleYearChange} defaultValue="all">
                <SelectTrigger className="w-[130px]">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {yearOptions.map(year => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="icon">
                <SortDesc className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Period tabs */}
          <Tabs defaultValue={period} className="mb-6" onValueChange={handlePeriodChange}>
            <TabsList>
              <TabsTrigger value="daily">Daily Trends</TabsTrigger>
              <TabsTrigger value="weekly">Weekly Trends</TabsTrigger>
              <TabsTrigger value="anticipated">Most Anticipated</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Movies grid */}
          {isLoading ? (
            <MoviesSkeleton />
          ) : (
            <>
              <MovieGrid movies={filteredMovies} showRank />
              
              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <Button 
                    variant="outline" 
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  
                  <span className="text-sm text-muted-foreground">
                    Page {page} of {totalPages}
                  </span>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Movies;
