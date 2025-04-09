
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendData } from "@/types/movie";

interface TrendChartProps {
  data: TrendData[];
}

const TrendChart: React.FC<TrendChartProps> = ({ data }) => {
  return (
    <Card className="bg-movie-card border-border h-full">
      <CardHeader>
        <CardTitle className="text-lg">Weekly Search Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ background: '#1E1E1E', border: 'none', borderRadius: '0.5rem' }}
                formatter={(value) => [`${value}%`, 'Search volume']}
              />
              <Line
                type="monotone"
                dataKey="value"
                name="Search volume"
                stroke="#8B5CF6"
                strokeWidth={3}
                dot={{ r: 6, stroke: '#8B5CF6', strokeWidth: 2, fill: '#1E1E1E' }}
                activeDot={{ r: 8, stroke: '#8B5CF6', strokeWidth: 2, fill: '#8B5CF6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendChart;
