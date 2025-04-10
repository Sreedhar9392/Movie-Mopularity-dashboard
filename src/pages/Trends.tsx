
import React, { useState } from "react";
import Header from "@/components/Header";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import TrendingMovies from "@/components/TrendingMovies";
import { TrendingUp, BarChart2, Activity, Calendar, Users, Twitter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendData, SentimentData } from "@/types/movie";
import TrendChart from "@/components/charts/TrendChart";
import SentimentChart from "@/components/charts/SentimentChart";
import { Slider } from "@/components/ui/slider";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

// Sample trend data
const weeklyTrends: TrendData[] = [
  { name: "Mon", value: 65 },
  { name: "Tue", value: 75 },
  { name: "Wed", value: 85 },
  { name: "Thu", value: 70 },
  { name: "Fri", value: 90 },
  { name: "Sat", value: 100 },
  { name: "Sun", value: 95 },
];

const monthlyTrends: TrendData[] = [
  { name: "Week 1", value: 78 },
  { name: "Week 2", value: 82 },
  { name: "Week 3", value: 68 },
  { name: "Week 4", value: 92 },
];

// Sample sentiment data
const sentimentData: SentimentData[] = [
  { name: "Action Movies", positive: 65, neutral: 25, negative: 10 },
  { name: "Comedy", positive: 75, neutral: 15, negative: 10 },
  { name: "Drama", positive: 45, neutral: 30, negative: 25 },
  { name: "Sci-Fi", positive: 55, neutral: 35, negative: 10 },
  { name: "Horror", positive: 30, neutral: 30, negative: 40 },
];

// Mock API call for real-time sentiment
const fetchRealtimeSentiment = async (): Promise<{ score: number; change: number }> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Random score between 60-90
      const score = Math.floor(Math.random() * 30) + 60;
      // Random change between -5 and +5
      const change = Math.floor(Math.random() * 10) - 5;
      resolve({ score, change });
    }, 1500);
  });
};

const Trends: React.FC = () => {
  const [sentimentView, setSentimentView] = useState<"genres" | "trending">("genres");
  const [engagementLevel, setEngagementLevel] = useState<number[]>([70]);
  const { toast } = useToast();
  
  const { data: realtimeSentiment, isLoading } = useQuery({
    queryKey: ["realtimeSentiment"],
    queryFn: fetchRealtimeSentiment,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 15000, // Consider data stale after 15 seconds
  });

  const handleEngagementChange = (value: number[]) => {
    setEngagementLevel(value);
    toast({
      title: "Engagement threshold updated",
      description: `Movies with engagement above ${value[0]}% will be highlighted`,
      duration: 2000,
    });
  };

  return (
    <div className="flex h-screen bg-movie-dark">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center px-4 h-16 border-b border-border bg-movie-card">
          <SidebarTrigger />
          <Header />
        </div>
        
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-movie-accent" />
            Movie Trends
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="bg-movie-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center">
                  <Activity className="h-4 w-4 mr-2 text-movie-accent" />
                  Weekly Engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[180px]">
                  <TrendChart data={weeklyTrends} />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-movie-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center">
                  <BarChart2 className="h-4 w-4 mr-2 text-movie-accent" />
                  Monthly Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[180px]">
                  <TrendChart data={monthlyTrends} />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-movie-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center">
                  <Twitter className="h-4 w-4 mr-2 text-movie-accent" />
                  Real-time Sentiment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[180px]">
                  {isLoading ? (
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="h-16 w-16 bg-movie-card rounded-full mb-2"></div>
                      <div className="h-4 w-20 bg-movie-card rounded"></div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="text-5xl font-bold text-movie-accent">
                        {realtimeSentiment?.score}%
                      </div>
                      <div className={`text-sm ${realtimeSentiment?.change && realtimeSentiment.change > 0 
                          ? 'text-movie-green' 
                          : realtimeSentiment?.change && realtimeSentiment.change < 0 
                            ? 'text-movie-red' 
                            : 'text-muted-foreground'}`}>
                        {realtimeSentiment?.change && realtimeSentiment.change > 0 ? '+' : ''}
                        {realtimeSentiment?.change}% this hour
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-8">
            <Card className="bg-movie-card border-border">
              <CardHeader className="pb-2">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <CardTitle className="text-base font-medium flex items-center">
                    <Users className="h-4 w-4 mr-2 text-movie-accent" />
                    Audience Sentiment
                  </CardTitle>
                  <div className="flex items-center space-x-2 mt-2 md:mt-0">
                    <button 
                      className={`px-3 py-1 text-xs rounded-full ${sentimentView === 'genres' 
                        ? 'bg-movie-accent text-white' 
                        : 'bg-secondary hover:bg-secondary/80'}`}
                      onClick={() => setSentimentView('genres')}
                    >
                      By Genre
                    </button>
                    <button 
                      className={`px-3 py-1 text-xs rounded-full ${sentimentView === 'trending' 
                        ? 'bg-movie-accent text-white' 
                        : 'bg-secondary hover:bg-secondary/80'}`}
                      onClick={() => setSentimentView('trending')}
                    >
                      Trending Movies
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <SentimentChart data={sentimentData} />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-6">
            <Card className="bg-movie-card border-border p-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Engagement Threshold</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    Set minimum engagement level for highlighted movies
                  </p>
                </div>
                <div className="w-full md:w-1/2 flex items-center gap-4">
                  <Slider
                    value={engagementLevel}
                    onValueChange={handleEngagementChange}
                    max={100}
                    step={5}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-12 text-center">
                    {engagementLevel[0]}%
                  </span>
                </div>
              </div>
            </Card>
          </div>
          
          <Tabs defaultValue="trending" className="mb-6">
            <TabsList>
              <TabsTrigger value="trending">Trending Movies</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming Releases</TabsTrigger>
              <TabsTrigger value="buzz">Social Buzz</TabsTrigger>
            </TabsList>
            <TabsContent value="trending" className="pt-6">
              <TrendingMovies />
            </TabsContent>
            <TabsContent value="upcoming" className="pt-6">
              <div className="bg-movie-card p-6 rounded-lg border border-border">
                <div className="flex items-center mb-4">
                  <Calendar className="h-5 w-5 text-movie-accent mr-2" />
                  <h3 className="text-lg font-medium">Upcoming Releases</h3>
                </div>
                <p className="text-muted-foreground text-center">
                  Calendar view of upcoming releases coming soon
                </p>
              </div>
            </TabsContent>
            <TabsContent value="buzz" className="pt-6">
              <div className="bg-movie-card p-6 rounded-lg border border-border">
                <div className="flex items-center mb-4">
                  <Twitter className="h-5 w-5 text-movie-accent mr-2" />
                  <h3 className="text-lg font-medium">Social Media Buzz</h3>
                </div>
                <p className="text-muted-foreground text-center">
                  Real-time social media sentiment analysis coming soon
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Trends;
