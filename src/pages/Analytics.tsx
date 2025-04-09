
import React, { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import StatsCard from "@/components/StatsCard";
import GenreChart from "@/components/charts/GenreChart";
import SentimentChart from "@/components/charts/SentimentChart";
import TrendChart from "@/components/charts/TrendChart";
import BoxOfficeChart from "@/components/charts/BoxOfficeChart";
import TrendingMovies from "@/components/TrendingMovies";
import { Checkbox } from "@/components/ui/checkbox";
import { Film, TrendingUp, DollarSign, Users } from "lucide-react";

import { 
  genreData, 
  sentimentData, 
  weeklyTrendData,
  boxOfficeData 
} from "@/data/mockData";

const Analytics: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showTrends, setShowTrends] = useState(true);
  const [showGenres, setShowGenres] = useState(true);
  const [showSentiment, setShowSentiment] = useState(true);
  const [showBoxOffice, setShowBoxOffice] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6 bg-movie-dark">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">Analytics Dashboard</h2>
              <p className="text-muted-foreground">Comprehensive movie industry insights and trends</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <Checkbox id="trends" checked={showTrends} onCheckedChange={() => setShowTrends(!showTrends)} />
                <label htmlFor="trends" className="text-sm cursor-pointer">Show Trends</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="genres" checked={showGenres} onCheckedChange={() => setShowGenres(!showGenres)} />
                <label htmlFor="genres" className="text-sm cursor-pointer">Show Genres</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="sentiment" checked={showSentiment} onCheckedChange={() => setShowSentiment(!showSentiment)} />
                <label htmlFor="sentiment" className="text-sm cursor-pointer">Show Sentiment</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="boxOffice" checked={showBoxOffice} onCheckedChange={() => setShowBoxOffice(!showBoxOffice)} />
                <label htmlFor="boxOffice" className="text-sm cursor-pointer">Show Box Office</label>
              </div>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatsCard 
              title="Trending Movies" 
              value="24,532" 
              change={12.5} 
              icon={TrendingUp} 
              iconColor="#8B5CF6"
            />
            <StatsCard 
              title="Box Office" 
              value="$845M" 
              change={-3.2} 
              icon={DollarSign}
              iconColor="#3B82F6"
            />
            <StatsCard 
              title="Release Count" 
              value="384" 
              change={5.7} 
              icon={Film}
              iconColor="#10B981"
            />
            <StatsCard 
              title="Active Users" 
              value="1.2M" 
              change={8.1} 
              icon={Users}
              iconColor="#F59E0B"
            />
          </div>
          
          {/* Trending Movies Carousel - NEW */}
          {showTrends && <TrendingMovies />}
          
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {showTrends && <TrendChart data={weeklyTrendData} />}
            {showBoxOffice && <BoxOfficeChart data={boxOfficeData} />}
          </div>
          
          {/* Analysis Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {showGenres && <GenreChart data={genreData} />}
            {showSentiment && <SentimentChart data={sentimentData} />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
