
import React from "react";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types/movie";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";

interface MovieGridProps {
  movies: Movie[];
  showRank?: boolean;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, showRank = false }) => {
  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No movies found</p>
      </div>
    );
  }

  // Format the release date to display year
  const formatReleaseDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.getFullYear().toString();
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {movies.map((movie, index) => (
        <div key={movie.id} className="group">
          <Link to={`/movies/${movie.id}`}>
            <div className="relative">
              <MovieCard movie={movie} rank={showRank ? index + 1 : undefined} />
              
              {/* Release Year Badge */}
              <div className="absolute bottom-2 right-2 flex items-center bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                <CalendarDays className="h-3 w-3 mr-1" />
                {formatReleaseDate(movie.releaseDate)}
              </div>
            </div>
          </Link>
          
          {/* Display the first 2 genres as badges */}
          <div className="mt-2 flex flex-wrap gap-1">
            {movie.genre.slice(0, 2).map((genre, genreIndex) => (
              <Badge 
                key={genreIndex} 
                variant="outline" 
                className="text-xs py-0 px-2 bg-movie-card/50"
              >
                {genre}
              </Badge>
            ))}
            {movie.genre.length > 2 && (
              <Badge variant="outline" className="text-xs py-0 px-2 bg-movie-card/50">
                +{movie.genre.length - 2}
              </Badge>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;
