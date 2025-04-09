
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Movie } from "@/types/movie";
import { toast } from "@/hooks/use-toast";

interface WatchlistContextType {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  // Load watchlist from localStorage on initial mount
  useEffect(() => {
    const savedWatchlist = localStorage.getItem("movieWatchlist");
    if (savedWatchlist) {
      try {
        setWatchlist(JSON.parse(savedWatchlist));
      } catch (error) {
        console.error("Error loading watchlist from localStorage:", error);
        localStorage.removeItem("movieWatchlist");
      }
    }
  }, []);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("movieWatchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie: Movie) => {
    setWatchlist(prev => {
      // Check if the movie is already in the watchlist
      if (prev.some(m => m.id === movie.id)) {
        return prev;
      }
      toast({
        title: "Added to watchlist",
        description: `${movie.title} has been added to your watchlist.`,
        duration: 2000,
      });
      return [...prev, movie];
    });
  };

  const removeFromWatchlist = (movieId: number) => {
    setWatchlist(prev => {
      const movie = prev.find(m => m.id === movieId);
      if (movie) {
        toast({
          title: "Removed from watchlist",
          description: `${movie.title} has been removed from your watchlist.`,
          duration: 2000,
        });
      }
      return prev.filter(m => m.id !== movieId);
    });
  };

  const isInWatchlist = (movieId: number) => {
    return watchlist.some(movie => movie.id === movieId);
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
};
