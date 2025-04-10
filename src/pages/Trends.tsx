
import React from "react";
import Header from "@/components/Header";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import TrendingMovies from "@/components/TrendingMovies";
import { TrendingUp, BarChart2, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendData } from "@/types/movie";
import TrendChart from "@/components/charts/TrendChart";

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

const Trends: React.FC = () => {
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                  <TrendingUp className="h-4 w-4 mr-2 text-movie-accent" />
                  Popularity Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[180px]">
                  <div className="text-5xl font-bold text-movie-accent">87%</div>
                  <div className="text-sm text-muted-foreground ml-2">+12% this week</div>
                </div>
              </CardContent>
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
                <p className="text-muted-foreground text-center">Upcoming releases data coming soon</p>
              </div>
            </TabsContent>
            <TabsContent value="buzz" className="pt-6">
              <div className="bg-movie-card p-6 rounded-lg border border-border">
                <p className="text-muted-foreground text-center">Social media buzz analysis coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Trends;
