
import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MovieCard from "@/components/MovieCard";
import StatsCard from "@/components/StatsCard";
import GenreChart from "@/components/charts/GenreChart";
import SentimentChart from "@/components/charts/SentimentChart";
import TrendChart from "@/components/charts/TrendChart";
import BoxOfficeChart from "@/components/charts/BoxOfficeChart";
import { Film, TrendingUp, DollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

import { 
  trendingMovies, 
  genreData, 
  sentimentData, 
  weeklyTrendData,
  boxOfficeData 
} from "@/data/mockData";

const Index: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6 bg-movie-dark">
          <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatsCard 
              title="Trending Movies" 
              value="24,532" 
              change={12.5} 
              icon={TrendingUp} 
              iconColor="#8B5CF6"
            />
            <StatsCard 
              title="Box Office" 
              value="$845M" 
              change={-3.2} 
              icon={DollarSign}
              iconColor="#3B82F6"
            />
            <StatsCard 
              title="Release Count" 
              value="384" 
              change={5.7} 
              icon={Film}
              iconColor="#10B981"
            />
            <StatsCard 
              title="Active Users" 
              value="1.2M" 
              change={8.1} 
              icon={Users}
              iconColor="#F59E0B"
            />
          </div>
          
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <TrendChart data={weeklyTrendData} />
            <BoxOfficeChart data={boxOfficeData} />
          </div>
          
          {/* Trending Movies */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Trending Movies</h2>
              <Link to="/movies" className="text-movie-accent text-sm hover:underline">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {trendingMovies.slice(0, 6).map((movie) => (
                <Link key={movie.id} to={`/movies/${movie.id}`}>
                  <MovieCard movie={movie} />
                </Link>
              ))}
            </div>
          </div>
          
          {/* Analysis Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <GenreChart data={genreData} />
            <SentimentChart data={sentimentData} />
          </div>
          
          {/* Analytics CTA */}
          <div className="bg-movie-card border border-border rounded-lg p-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-xl font-bold">Detailed Analytics</h3>
              <p className="text-muted-foreground">Explore comprehensive movie analytics and insights</p>
            </div>
            <Link to="/analytics">
              <Button>View Analytics</Button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
