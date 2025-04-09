
import React from "react";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types/movie";

interface MovieGridProps {
  movies: Movie[];
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies }) => {
  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No movies found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
