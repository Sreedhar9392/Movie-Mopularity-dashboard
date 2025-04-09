
import React from "react";
import { Link } from "react-router-dom";
import { Film } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  heading: string;
  subheading: React.ReactNode;
  sideContent: {
    title: string;
    description: string;
  };
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  heading,
  subheading,
  sideContent,
}) => {
  return (
    <div className="flex min-h-screen bg-movie-dark">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex justify-center">
            <Link to="/" className="flex items-center gap-2">
              <Film className="h-8 w-8 text-movie-accent" />
              <h1 className="text-2xl font-bold text-gradient">Movie Pulse</h1>
            </Link>
          </div>
          
          <div className="mt-10">
            <h2 className="mt-6 text-2xl font-bold tracking-tight">
              {heading}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {subheading}
            </p>
          </div>

          <div className="mt-10">
            {children}
          </div>
        </div>
      </div>
      
      <div className="hidden lg:block relative w-0 flex-1 bg-gradient-to-br from-movie-dark to-movie-accent/20">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center p-12">
          <div className="max-w-2xl text-center">
            <h2 className="text-4xl font-bold mb-6">{sideContent.title}</h2>
            <p className="text-xl mb-8">{sideContent.description}</p>
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div 
                  key={i} 
                  className="aspect-[2/3] rounded-lg bg-gradient-to-br from-movie-card/80 to-movie-accent/30 animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
