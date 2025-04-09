
import React from "react";
import { Movie } from "@/types/movie";
import { Card } from "@/components/ui/card";
import { TrendingUp, Star } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Card className="overflow-hidden bg-movie-card border-border h-full flex flex-col">
      <div className="relative">
        <img src={movie.posterUrl} alt={movie.title} className="w-full aspect-[2/3] object-cover" />
        <div className="absolute top-2 right-2 bg-black/70 rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="h-3 w-3 text-movie-yellow" fill="currentColor" />
          <span className="text-xs font-medium">{movie.rating.toFixed(1)}</span>
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-white line-clamp-1">{movie.title}</h3>
        
        <div className="flex items-center gap-2 mt-1 mb-2">
          <div className="text-xs text-muted-foreground">
            {new Date(movie.releaseDate).getFullYear()}
          </div>
          <div className="h-1 w-1 bg-muted-foreground rounded-full"></div>
          <div className="text-xs text-muted-foreground line-clamp-1">
            {movie.genre.join(", ")}
          </div>
        </div>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1">
            <TrendingUp className={`h-4 w-4 ${movie.popularity > 85 ? 'text-movie-green' : 'text-movie-blue'}`} />
            <span className="text-sm font-medium">{movie.popularity}%</span>
          </div>
          
          <div className="flex items-center gap-1">
            <span className={`inline-block w-2 h-2 rounded-full 
              ${movie.sentimentScore >= 80 ? 'bg-movie-green' : 
                movie.sentimentScore >= 60 ? 'bg-movie-yellow' : 'bg-movie-red'}`}>
            </span>
            <span className="text-xs text-muted-foreground">Sentiment</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MovieCard;
