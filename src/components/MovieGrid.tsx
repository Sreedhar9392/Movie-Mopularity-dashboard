
import React from "react";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types/movie";
import { Link } from "react-router-dom";

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

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {movies.map((movie, index) => (
        <Link key={movie.id} to={`/movies/${movie.id}`}>
          <div className="relative">
            <MovieCard movie={movie} />
            {showRank && index === 0 && (
              <div className="absolute top-2 left-2 bg-movie-accent text-white text-xs font-bold px-2 py-1 rounded-md animate-pulse">
                Top Buzzing
              </div>
            )}
            {showRank && index > 0 && index < 10 && (
              <div className="absolute top-2 left-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded-md">
                #{index + 1}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MovieGrid;
