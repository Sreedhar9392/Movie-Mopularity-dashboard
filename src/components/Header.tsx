
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";

const Header: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate('/movies');
    }
  };

  return (
    <header className="w-full py-4 px-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-border">
      <div>
        <Link to="/">
          <h1 className="text-2xl font-bold text-gradient">Movie Pulse</h1>
        </Link>
        <p className="text-sm text-muted-foreground">Real-time movie analytics dashboard</p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search movies..." 
            className="pl-9 bg-secondary border-none w-[200px] lg:w-[300px]" 
            onKeyDown={handleSearch}
          />
        </div>
        
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-full hover:bg-secondary transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-movie-red rounded-full"></span>
          </button>
          
          <div className="w-8 h-8 rounded-full bg-movie-accent grid place-items-center">
            <User className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
