
import React from "react";
import Header from "@/components/Header";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Users, PieChart, BarChart, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GenreData } from "@/types/movie";
import GenreChart from "@/components/charts/GenreChart";

// Sample audience data
const ageGroups: GenreData[] = [
  { name: "13-17", value: 8, color: "#9B87F5" },
  { name: "18-24", value: 27, color: "#8B5CF6" },
  { name: "25-34", value: 35, color: "#D946EF" },
  { name: "35-44", value: 20, color: "#0EA5E9" },
  { name: "45+", value: 10, color: "#F97316" },
];

const genderDistribution: GenreData[] = [
  { name: "Male", value: 52, color: "#0EA5E9" },
  { name: "Female", value: 45, color: "#D946EF" },
  { name: "Non-binary", value: 3, color: "#F97316" },
];

const regionData: GenreData[] = [
  { name: "North America", value: 42, color: "#9B87F5" },
  { name: "Europe", value: 30, color: "#0EA5E9" },
  { name: "Asia", value: 18, color: "#F97316" },
  { name: "Latin America", value: 7, color: "#8B5CF6" },
  { name: "Other", value: 3, color: "#D946EF" },
];

const Audiences: React.FC = () => {
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
            <Users className="h-6 w-6 text-movie-accent" />
            Audience Demographics
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-movie-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center">
                  <BarChart className="h-4 w-4 mr-2 text-movie-accent" />
                  Age Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[220px]">
                  <GenreChart data={ageGroups} />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-movie-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center">
                  <PieChart className="h-4 w-4 mr-2 text-movie-accent" />
                  Gender Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[220px]">
                  <GenreChart data={genderDistribution} />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-movie-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-movie-accent" />
                  Regional Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[220px]">
                  <GenreChart data={regionData} />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="engagement" className="mb-6">
            <TabsList>
              <TabsTrigger value="engagement">Engagement Metrics</TabsTrigger>
              <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
              <TabsTrigger value="preferences">Content Preferences</TabsTrigger>
            </TabsList>
            <TabsContent value="engagement" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-movie-card border-border">
                  <CardHeader>
                    <CardTitle className="text-base">Average Watch Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold mb-2">118 <span className="text-base font-normal text-muted-foreground">minutes</span></div>
                    <p className="text-sm text-muted-foreground">+7% compared to last month</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-movie-card border-border">
                  <CardHeader>
                    <CardTitle className="text-base">Completion Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold mb-2">72% <span className="text-base font-normal text-green-500">↑</span></div>
                    <p className="text-sm text-muted-foreground">3% increase in full movie views</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-movie-card border-border">
                  <CardHeader>
                    <CardTitle className="text-base">Monthly Active Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold mb-2">1.2M <span className="text-base font-normal text-green-500">↑</span></div>
                    <p className="text-sm text-muted-foreground">15% year-over-year growth</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-movie-card border-border">
                  <CardHeader>
                    <CardTitle className="text-base">Social Shares</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold mb-2">285K <span className="text-base font-normal text-green-500">↑</span></div>
                    <p className="text-sm text-muted-foreground">22% increase in sharing activity</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="sentiment" className="pt-6">
              <div className="bg-movie-card p-6 rounded-lg border border-border">
                <p className="text-muted-foreground text-center">Sentiment analysis data coming soon</p>
              </div>
            </TabsContent>
            <TabsContent value="preferences" className="pt-6">
              <div className="bg-movie-card p-6 rounded-lg border border-border">
                <p className="text-muted-foreground text-center">Content preference data coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Audiences;
