
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BoxOfficeData } from "@/types/movie";

interface BoxOfficeChartProps {
  data: BoxOfficeData[];
}

const BoxOfficeChart: React.FC<BoxOfficeChartProps> = ({ data }) => {
  return (
    <Card className="bg-movie-card border-border h-full">
      <CardHeader>
        <CardTitle className="text-lg">Box Office Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ background: '#1E1E1E', border: 'none', borderRadius: '0.5rem' }}
                formatter={(value) => [`$${value}M`, '']}
              />
              <Legend />
              <Bar dataKey="domestic" name="Domestic" fill="#3B82F6" />
              <Bar dataKey="international" name="International" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoxOfficeChart;
