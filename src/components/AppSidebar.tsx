
import { useLocation, Link } from "react-router-dom";
import { 
  BarChart2, 
  TrendingUp, 
  Users, 
  Heart, 
  Calendar, 
  Award, 
  Film, 
  Settings,
  HomeIcon
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarMenuBadge,
  SidebarFooter
} from "@/components/ui/sidebar";

// Menu items configuration
const mainMenuItems = [
  { 
    title: "Dashboard", 
    path: "/", 
    icon: HomeIcon 
  },
  { 
    title: "Movies", 
    path: "/movies", 
    icon: Film 
  },
  { 
    title: "Analytics", 
    path: "/analytics", 
    icon: BarChart2
  },
  { 
    title: "Trends", 
    path: "/trends", 
    icon: TrendingUp,
    badge: "New"
  },
  { 
    title: "Audiences", 
    path: "/audiences", 
    icon: Users 
  },
  { 
    title: "Watchlist", 
    path: "/watchlist", 
    icon: Heart 
  },
  { 
    title: "Release Calendar", 
    path: "/calendar", 
    icon: Calendar 
  },
];

const extendedMenuItems = [
  { 
    title: "Recommendations", 
    path: "/recommendations", 
    icon: Award 
  },
  { 
    title: "Genres", 
    path: "/genres", 
    icon: Film 
  },
  { 
    title: "Settings", 
    path: "/settings", 
    icon: Settings 
  },
];

export function AppSidebar() {
  const location = useLocation();
  
  return (
    <Sidebar data-variant="sidebar" className="border-r border-border">
      <SidebarRail />
      
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="h-8 w-8 rounded bg-movie-accent flex items-center justify-center text-white font-bold">
            M
          </div>
          <span className="font-bold text-xl">MoviePulse</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      location.pathname === item.path || 
                      (item.path !== '/' && location.pathname.startsWith(item.path))
                    }
                    tooltip={item.title}
                  >
                    <Link to={item.path}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.badge && (
                    <SidebarMenuBadge className="bg-movie-accent">
                      {item.badge}
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Explore</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {extendedMenuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      location.pathname === item.path || 
                      (item.path !== '/' && location.pathname.startsWith(item.path))
                    }
                    tooltip={item.title}
                  >
                    <Link to={item.path}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="px-3 py-2">
          <div className="rounded-md bg-muted p-2 text-xs text-muted-foreground">
            <p>MoviePulse v1.0</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
