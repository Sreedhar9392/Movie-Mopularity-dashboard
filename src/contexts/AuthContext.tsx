
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on initial mount
  useEffect(() => {
    const storedUser = localStorage.getItem("movieUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error loading user from localStorage:", error);
        localStorage.removeItem("movieUser");
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call with localStorage
      const users = JSON.parse(localStorage.getItem("movieUsers") || "[]");
      const foundUser = users.find((u: any) => u.email === email);
      
      if (!foundUser) {
        toast({
          title: "Login failed",
          description: "User not found. Please check your email.",
          variant: "destructive",
        });
        return false;
      }
      
      // In a real app, you would use bcrypt.compare
      if (foundUser.password !== password) {
        toast({
          title: "Login failed",
          description: "Incorrect password. Please try again.",
          variant: "destructive",
        });
        return false;
      }
      
      // Create user object (excluding password)
      const authenticatedUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
      };
      
      // Store user in state and localStorage
      setUser(authenticatedUser);
      localStorage.setItem("movieUser", JSON.stringify(authenticatedUser));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${foundUser.name}!`,
      });
      
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  // Signup function
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call with localStorage
      const users = JSON.parse(localStorage.getItem("movieUsers") || "[]");
      
      // Check if email already exists
      if (users.some((u: any) => u.email === email)) {
        toast({
          title: "Signup failed",
          description: "Email already exists. Please use a different email or login.",
          variant: "destructive",
        });
        return false;
      }
      
      // Create new user
      const newUser = {
        id: `user_${Date.now()}`,
        name,
        email,
        password, // In a real app, you would hash this with bcrypt
      };
      
      // Store user in localStorage
      users.push(newUser);
      localStorage.setItem("movieUsers", JSON.stringify(users));
      
      // Create user object (excluding password)
      const authenticatedUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      };
      
      // Store user in state and localStorage
      setUser(authenticatedUser);
      localStorage.setItem("movieUser", JSON.stringify(authenticatedUser));
      
      toast({
        title: "Signup successful",
        description: `Welcome to Movie Pulse, ${name}!`,
      });
      
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Signup failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("movieUser");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        login, 
        signup, 
        logout,
        isAuthenticated: !!user 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
