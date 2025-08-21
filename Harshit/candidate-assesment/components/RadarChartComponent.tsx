import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface RadarChartProps {
  data: { category: string; score: number }[];
}

const RadarChartComponent: React.FC<RadarChartProps> = ({ data }) => {
  return (
    <div className="w-full h-64 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-indigo-500/10 rounded-2xl blur-xl"></div>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <defs>
            <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#667eea" stopOpacity={0.8}/>
              <stop offset="50%" stopColor="#764ba2" stopOpacity={0.6}/>
              <stop offset="100%" stopColor="#f093fb" stopOpacity={0.4}/>
            </linearGradient>
          </defs>
          <PolarGrid
            stroke="rgba(102, 126, 234, 0.3)"
            strokeWidth={2}
            gridType="polygon"
          />
          <PolarAngleAxis
            dataKey="category"
            tick={{ fill: 'currentColor', fontSize: 14, fontWeight: 600 }}
            className="text-gray-600 dark:text-gray-100"
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 10]}
            tickCount={6}
            stroke="rgba(102, 126, 234, 0.2)"
            tick={{ fill: '#9ca3af', fontSize: 12 }}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="url(#radarGradient)"
            fill="url(#radarGradient)"
            fillOpacity={0.4}
            strokeWidth={3}
            dot={{ fill: '#667eea', strokeWidth: 2, stroke: '#fff', r: 4 }}
          />
          <Tooltip
            contentStyle={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(102, 126, 234, 0.3)',
              borderRadius: '16px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151'
            }}
            labelStyle={{ color: '#667eea', fontWeight: '700' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChartComponent;