
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, Star, TrendingUp, Heart, Share2, 
  Calendar, Clock, Ticket, BarChart3
} from "lucide-react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trendingMovies } from "@/data/mockData";
import SentimentChart from "@/components/charts/SentimentChart";
import TrendChart from "@/components/charts/TrendChart";
import { sentimentData, weeklyTrendData } from "@/data/mockData";

const MovieDetails: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams();
  
  // Find movie by id
  const movie = trendingMovies.find(m => m.id.toString() === id);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!movie) {
    return (
      <div className="flex h-screen items-center justify-center bg-movie-dark">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Movie not found</h2>
          <Link to="/movies">
            <Button>Back to Movies</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6 bg-movie-dark">
          {/* Back button */}
          <Link to="/movies" className="inline-flex items-center gap-1 text-muted-foreground hover:text-white mb-6">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to movies</span>
          </Link>
          
          {/* Movie header */}
          <div className="flex flex-col lg:flex-row gap-8 mb-8">
            {/* Poster */}
            <div className="lg:w-1/3">
              <img 
                src={movie.posterUrl} 
                alt={movie.title} 
                className="w-full rounded-lg shadow-lg aspect-[2/3] object-cover"
              />
            </div>
            
            {/* Movie info */}
            <div className="lg:w-2/3">
              <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-movie-yellow" fill="currentColor" />
                  <span className="font-bold">{movie.rating.toFixed(1)}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-5 w-5 text-movie-accent" />
                  <span>{movie.popularity}% Popularity</span>
                </div>
                
                <div className="px-2 py-1 bg-secondary rounded text-xs">
                  {new Date(movie.releaseDate).getFullYear()}
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-muted-foreground mb-4">
                  A stunning and thrilling cinematic experience that pushes the boundaries of 
                  storytelling with breathtaking visuals and compelling performances. 
                  Critics and audiences alike praise this groundbreaking film.
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {movie.genre.map((g) => (
                    <span key={g} className="px-3 py-1 bg-secondary rounded-full text-xs">
                      {g}
                    </span>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <p className="text-muted-foreground text-sm">Release Date</p>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-movie-accent" />
                      <span>{new Date(movie.releaseDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-muted-foreground text-sm">Runtime</p>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-movie-accent" />
                      <span>2h 15m</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-muted-foreground text-sm">Box Office</p>
                    <div className="flex items-center gap-1">
                      <Ticket className="h-4 w-4 text-movie-accent" />
                      <span>${(movie.boxOffice / 1000000).toFixed(1)}M</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-muted-foreground text-sm">Sentiment</p>
                    <div className="flex items-center gap-1">
                      <BarChart3 className="h-4 w-4 text-movie-accent" />
                      <span>{movie.sentimentScore}% Positive</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Button className="gap-2">
                    <Heart className="h-4 w-4" />
                    <span>Favorite</span>
                  </Button>
                  
                  <Button variant="outline" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Analytics charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-movie-card border-border">
              <CardContent className="pt-6">
                <h2 className="text-lg font-bold mb-4">Popularity Trend</h2>
                <div className="h-[300px]">
                  <TrendChart data={weeklyTrendData} />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-movie-card border-border">
              <CardContent className="pt-6">
                <h2 className="text-lg font-bold mb-4">Audience Sentiment</h2>
                <div className="h-[300px]">
                  <SentimentChart data={sentimentData} />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MovieDetails;
