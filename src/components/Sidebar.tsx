
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BarChart2, TrendingUp, Users, Film, Heart, Calendar, Settings, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, to, active }) => {
  return (
    <li>
      <Link
        to={to}
        className={cn(
          "flex items-center gap-4 px-4 py-3 rounded-lg transition-colors",
          active ? "bg-secondary text-white" : "text-muted-foreground hover:bg-secondary hover:text-white"
        )}
      >
        <Icon size={20} />
        <span>{label}</span>
      </Link>
    </li>
  );
};

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
      
      <aside 
        className={cn(
          "fixed lg:static top-0 left-0 z-50 h-full w-64 bg-movie-card border-r border-border transition-transform duration-300 lg:transform-none",
          isOpen ? "transform-none" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-movie-accent flex items-center justify-center text-white font-bold">
              M
            </div>
            <span className="font-bold text-xl">MoviePulse</span>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden">
            <X size={20} />
          </button>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-1">
            <NavItem 
              icon={Home} 
              label="Dashboard" 
              to="/" 
              active={location.pathname === '/'} 
            />
            <NavItem 
              icon={Film} 
              label="Movies" 
              to="/movies" 
              active={location.pathname === '/movies' || location.pathname.startsWith('/movies/')} 
            />
            <NavItem 
              icon={BarChart2} 
              label="Analytics" 
              to="/analytics" 
              active={location.pathname === '/analytics'} 
            />
            <NavItem icon={TrendingUp} label="Trends" to="#" />
            <NavItem icon={Users} label="Audiences" to="#" />
            <NavItem icon={Heart} label="Watchlist" to="#" />
            <NavItem icon={Calendar} label="Release Calendar" to="#" />
            <NavItem icon={Settings} label="Settings" to="#" />
          </ul>
        </nav>
      </aside>
      
      <button 
        onClick={toggleSidebar}
        className="lg:hidden fixed bottom-4 left-4 z-30 p-3 bg-movie-accent rounded-full shadow-lg"
      >
        <Menu size={24} className="text-white" />
      </button>
    </>
  );
};

export default Sidebar;
