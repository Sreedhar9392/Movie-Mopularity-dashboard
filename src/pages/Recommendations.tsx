
import React from "react";
import Header from "@/components/Header";
import { useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Recommendations: React.FC = () => {
  return (
    <div className="flex h-screen bg-movie-dark">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center px-4 h-16 border-b border-border bg-movie-card">
          <SidebarTrigger />
          <Header />
        </div>
        
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Recommendations</h1>
          <p className="text-muted-foreground">Personalized movie recommendations will be displayed here.</p>
        </main>
      </div>
    </div>
  );
};

export default Recommendations;
