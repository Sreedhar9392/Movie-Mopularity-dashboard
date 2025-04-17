
import React from "react";
import { Movie } from "@/types/movie";
import { Card } from "@/components/ui/card";
import { TrendingUp, Star, Bookmark, BookmarkCheck } from "lucide-react";
import { useWatchlist } from "@/contexts/WatchlistContext";

interface MovieCardProps {
  movie: Movie;
  rank?: number; // Optional rank for displaying top trending movies
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, rank }) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(movie.id);

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <Card className="overflow-hidden bg-movie-card border-border h-full flex flex-col hover:border-movie-accent transition-colors cursor-pointer group">
      <div className="relative">
        <img src={movie.posterUrl} alt={movie.title} className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300" />
        
        {/* Top Buzzing or Rank Badge */}
        {rank === 1 && (
          <div className="absolute top-2 left-2 bg-movie-accent text-white text-xs font-bold px-2 py-1 rounded-md animate-pulse">
            Top Buzzing
          </div>
        )}
        {rank && rank > 1 && rank <= 3 && (
          <div className="absolute top-2 left-2 bg-movie-accent/80 text-white text-xs font-bold px-2 py-1 rounded-md">
            #{rank} Trending
          </div>
        )}
        {rank && rank > 3 && rank <= 10 && (
          <div className="absolute top-2 left-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded-md">
            #{rank}
          </div>
        )}
        
        <div className="absolute top-2 right-2 flex gap-2">
          <div className="bg-black/70 rounded-full px-2 py-1 flex items-center gap-1">
            <Star className="h-3 w-3 text-movie-yellow" fill="currentColor" />
            <span className="text-xs font-medium">{movie.rating.toFixed(1)}</span>
          </div>
          
          <button 
            onClick={handleWatchlistClick}
            className={`p-1.5 rounded-full transition-colors ${
              inWatchlist 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-black/70 text-white hover:bg-black/90'
            }`}
            aria-label={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
          >
            {inWatchlist ? (
              <BookmarkCheck className="h-3.5 w-3.5" />
            ) : (
              <Bookmark className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
        
        {/* Hover overlay with additional info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
          <div className="text-xs text-white/80 mb-1">
            <span className="inline-block mr-2 border border-white/40 rounded px-1">
              {new Date(movie.releaseDate).getFullYear()}
            </span>
            {movie.genre.slice(0, 2).join(", ")}
            {movie.genre.length > 2 && "..."}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded">
              <TrendingUp className={`h-3 w-3 ${movie.popularity > 85 ? 'text-movie-green' : 'text-movie-blue'}`} />
              <span className="text-xs font-medium text-white">{movie.popularity}%</span>
            </div>
            
            <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded">
              <span className={`inline-block w-2 h-2 rounded-full 
                ${movie.sentimentScore >= 80 ? 'bg-movie-green' : 
                  movie.sentimentScore >= 60 ? 'bg-movie-yellow' : 'bg-movie-red'}`}>
              </span>
              <span className="text-xs text-white">Sentiment</span>
            </div>
          </div>
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
