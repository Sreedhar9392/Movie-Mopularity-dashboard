
import React, { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Film, Filter, SortDesc } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MovieGrid from "@/components/MovieGrid";
import { trendingMovies } from "@/data/mockData";

const Movies: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter movies based on search term
  const filteredMovies = trendingMovies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
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
              <p className="text-muted-foreground">Browse and discover popular movies</p>
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
              
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="icon">
                <SortDesc className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Movies grid */}
          <MovieGrid movies={filteredMovies} />
        </main>
      </div>
    </div>
  );
};

export default Movies;
