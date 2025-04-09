
import React, { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart2, TrendingUp, Calendar, BarChart3, 
  PieChart, Globe, Heart, Users
} from "lucide-react";
import { 
  genreData, 
  sentimentData, 
  weeklyTrendData,
  boxOfficeData 
} from "@/data/mockData";
import GenreChart from "@/components/charts/GenreChart";
import SentimentChart from "@/components/charts/SentimentChart";
import TrendChart from "@/components/charts/TrendChart";
import BoxOfficeChart from "@/components/charts/BoxOfficeChart";

const Analytics: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Analytics cards data
  const analyticsCards = [
    {
      title: "Movies Analyzed",
      value: "2,547",
      icon: Film,
      color: "#10B981",
      change: 12.5
    },
    {
      title: "Monthly Trends",
      value: "+24.8%",
      icon: TrendingUp,
      color: "#8B5CF6",
      change: 8.3
    },
    {
      title: "Audience Reach",
      value: "15.2M",
      icon: Users,
      color: "#F59E0B",
      change: 5.4
    },
    {
      title: "Sentiment Score",
      value: "76.5%",
      icon: Heart,
      color: "#EF4444",
      change: -2.1
    }
  ];

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6 bg-movie-dark">
          <div className="mb-6">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <BarChart2 className="h-6 w-6 text-movie-accent" />
              Analytics Dashboard
            </h1>
            <p className="text-muted-foreground">Comprehensive movie data analytics and insights</p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {analyticsCards.map((card) => (
              <Card key={card.title} className="bg-movie-card border-border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">{card.title}</p>
                      <h3 className="text-2xl font-bold mt-1">{card.value}</h3>
                      
                      <div className="flex items-center mt-3">
                        <span className={`text-xs font-medium ${card.change >= 0 ? 'text-movie-green' : 'text-movie-red'}`}>
                          {card.change >= 0 ? '↑' : '↓'} {Math.abs(card.change)}%
                        </span>
                        <span className="text-xs text-muted-foreground ml-1">vs. last month</span>
                      </div>
                    </div>
                    
                    <div 
                      className="p-3 rounded-lg" 
                      style={{ backgroundColor: `${card.color}20` }}
                    >
                      <card.icon className="h-5 w-5" style={{ color: card.color }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Primary Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="bg-movie-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-movie-accent" />
                  Popularity Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <TrendChart data={weeklyTrendData} />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-movie-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-movie-accent" />
                  Box Office Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <BoxOfficeChart data={boxOfficeData} />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Secondary Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-movie-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-movie-accent" />
                  Genre Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <GenreChart data={genreData} />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-movie-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="h-5 w-5 text-movie-accent" />
                  Global Sentiment Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <SentimentChart data={sentimentData} />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

const Film = BarChart2;

export default Analytics;
