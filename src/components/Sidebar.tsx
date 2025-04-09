
import React from "react";
import { Home, BarChart2, TrendingUp, Users, Film, Heart, Calendar, Settings, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active }) => {
  return (
    <li>
      <a
        href="#"
        className={cn(
          "flex items-center gap-4 px-4 py-3 rounded-lg transition-colors",
          active ? "bg-secondary text-white" : "text-muted-foreground hover:bg-secondary hover:text-white"
        )}
      >
        <Icon size={20} />
        <span>{label}</span>
      </a>
    </li>
  );
};

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
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
            <NavItem icon={Home} label="Dashboard" active />
            <NavItem icon={BarChart2} label="Analytics" />
            <NavItem icon={TrendingUp} label="Trends" />
            <NavItem icon={Film} label="Movies" />
            <NavItem icon={Users} label="Audiences" />
            <NavItem icon={Heart} label="Watchlist" />
            <NavItem icon={Calendar} label="Release Calendar" />
            <NavItem icon={Settings} label="Settings" />
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
