
import React from "react";
import Header from "@/components/Header";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Film, TrendingUp, Star, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { GenreData, BoxOfficeData } from "@/types/movie";
import GenreChart from "@/components/charts/GenreChart";
import BoxOfficeChart from "@/components/charts/BoxOfficeChart";

// Sample genre popularity data
const genrePopularity: GenreData[] = [
  { name: "Action", value: 28, color: "#F97316" },
  { name: "Drama", value: 22, color: "#9B87F5" },
  { name: "Comedy", value: 18, color: "#0EA5E9" },
  { name: "Sci-Fi", value: 12, color: "#8B5CF6" },
  { name: "Horror", value: 10, color: "#D946EF" },
  { name: "Other", value: 10, color: "#6E59A5" },
];

// Sample box office data
const boxOfficeData: BoxOfficeData[] = [
  { name: "Action", domestic: 850, international: 1250 },
  { name: "Comedy", domestic: 620, international: 780 },
  { name: "Drama", domestic: 450, international: 650 },
  { name: "Sci-Fi", domestic: 720, international: 1180 },
  { name: "Horror", domestic: 380, international: 420 },
];

const genreList = [
  { name: "Action", count: 285, trend: "up" },
  { name: "Adventure", count: 187, trend: "up" },
  { name: "Animation", count: 105, trend: "stable" },
  { name: "Comedy", count: 312, trend: "down" },
  { name: "Crime", count: 144, trend: "up" },
  { name: "Documentary", count: 98, trend: "up" },
  { name: "Drama", count: 427, trend: "stable" },
  { name: "Family", count: 92, trend: "down" },
  { name: "Fantasy", count: 118, trend: "up" },
  { name: "History", count: 67, trend: "down" },
  { name: "Horror", count: 173, trend: "up" },
  { name: "Music", count: 54, trend: "stable" },
  { name: "Mystery", count: 126, trend: "up" },
  { name: "Romance", count: 198, trend: "down" },
  { name: "Science Fiction", count: 136, trend: "up" },
  { name: "Thriller", count: 215, trend: "up" },
  { name: "War", count: 48, trend: "down" },
  { name: "Western", count: 32, trend: "stable" },
];

const Genres: React.FC = () => {
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
            <Film className="h-6 w-6 text-movie-accent" />
            Genre Analytics
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-movie-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-movie-accent" />
                  Genre Popularity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <GenreChart data={genrePopularity} />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-movie-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-movie-accent" />
                  Box Office by Genre (Millions USD)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <BoxOfficeChart data={boxOfficeData} />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All Genres</TabsTrigger>
              <TabsTrigger value="trending">Trending Genres</TabsTrigger>
              <TabsTrigger value="emerging">Emerging Genres</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {genreList.map((genre) => (
                  <Card key={genre.name} className="bg-movie-card border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{genre.name}</h3>
                        {genre.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                        {genre.trend === "down" && <TrendingUp className="h-4 w-4 text-red-500 transform rotate-180" />}
                        {genre.trend === "stable" && <div className="h-4 w-4 rounded-full bg-yellow-500/50"></div>}
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-secondary/30">
                          {genre.count} movies
                        </Badge>
                        <Star className="h-3.5 w-3.5 text-movie-accent" fill="currentColor" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="trending" className="pt-6">
              <div className="bg-movie-card p-6 rounded-lg border border-border">
                <p className="text-muted-foreground text-center">Trending genres analysis coming soon</p>
              </div>
            </TabsContent>
            <TabsContent value="emerging" className="pt-6">
              <div className="bg-movie-card p-6 rounded-lg border border-border">
                <p className="text-muted-foreground text-center">Emerging genres analysis coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Genres;
