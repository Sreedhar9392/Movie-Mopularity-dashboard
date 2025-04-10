
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WatchlistProvider } from "@/contexts/WatchlistContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import PrivateRoute from "@/components/auth/PrivateRoute";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Analytics from "./pages/Analytics";
import Watchlist from "./pages/Watchlist";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

// New pages
import Trends from "./pages/Trends";
import Audiences from "./pages/Audiences";
import ReleaseCalendar from "./pages/ReleaseCalendar";
import Recommendations from "./pages/Recommendations";
import Genres from "./pages/Genres";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <WatchlistProvider>
        <TooltipProvider>
          <SidebarProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/movies/:id" element={<MovieDetails />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/trends" element={<Trends />} />
                <Route path="/audiences" element={<Audiences />} />
                <Route path="/calendar" element={<ReleaseCalendar />} />
                <Route path="/recommendations" element={<Recommendations />} />
                <Route path="/genres" element={<Genres />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/watchlist" element={
                  <PrivateRoute>
                    <Watchlist />
                  </PrivateRoute>
                } />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/signup" element={<Signup />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </SidebarProvider>
        </TooltipProvider>
      </WatchlistProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
