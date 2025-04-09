
import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useWatchlist } from "@/contexts/WatchlistContext";
import MovieGrid from "@/components/MovieGrid";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const Watchlist: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { watchlist } = useWatchlist();
  const navigate = useNavigate();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6 bg-movie-dark">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Bookmark className="h-6 w-6 text-movie-accent" />
                My Watchlist
              </h1>
              <p className="text-muted-foreground">Movies you've saved to watch later</p>
            </div>
          </div>
          
          {watchlist.length > 0 ? (
            <MovieGrid movies={watchlist} />
          ) : (
            <Alert className="bg-secondary border-none mb-4">
              <AlertTitle>Your watchlist is empty</AlertTitle>
              <AlertDescription className="flex flex-col gap-4">
                <p>Browse movies and click the bookmark icon to add them to your watchlist.</p>
                <Button 
                  variant="default" 
                  onClick={() => navigate('/movies')} 
                  className="w-fit"
                >
                  Browse Movies
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </main>
      </div>
    </div>
  );
};

export default Watchlist;
