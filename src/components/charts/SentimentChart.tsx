
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SentimentData } from "@/types/movie";

interface SentimentChartProps {
  data: SentimentData[];
}

const SentimentChart: React.FC<SentimentChartProps> = ({ data }) => {
  return (
    <Card className="bg-movie-card border-border h-full">
      <CardHeader>
        <CardTitle className="text-lg">Audience Sentiment Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#333" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ background: '#1E1E1E', border: 'none', borderRadius: '0.5rem' }}
                formatter={(value) => [`${value}%`, '']}
              />
              <Legend />
              <Bar dataKey="positive" name="Positive" stackId="a" fill="#10B981" />
              <Bar dataKey="neutral" name="Neutral" stackId="a" fill="#F59E0B" />
              <Bar dataKey="negative" name="Negative" stackId="a" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentChart;
