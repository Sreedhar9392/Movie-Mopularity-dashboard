
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  iconColor?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  change, 
  icon: Icon,
  iconColor = "#8B5CF6"
}) => {
  return (
    <Card className="bg-movie-card border-border h-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            
            <div className="flex items-center mt-3">
              <span className={`text-xs font-medium ${change >= 0 ? 'text-movie-green' : 'text-movie-red'}`}>
                {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">vs. last week</span>
            </div>
          </div>
          
          <div 
            className="p-3 rounded-lg" 
            style={{ backgroundColor: `${iconColor}20` }}
          >
            <Icon className="h-5 w-5" style={{ color: iconColor }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
