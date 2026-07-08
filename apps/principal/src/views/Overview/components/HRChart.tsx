import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartCard, SectionTitle } from '../styles';
import { mockHRData } from '../mockData';

export default function HRChart() {
  return (
    <ChartCard>
      <SectionTitle>Phân công Lớp học</SectionTitle>
      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
          <BarChart data={mockHRData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Nhà trẻ" stackId="a" fill="#3b82f6" />
            <Bar dataKey="Mầm" stackId="a" fill="#10b981" />
            <Bar dataKey="Chồi" stackId="a" fill="#f59e0b" />
            <Bar dataKey="Lá" stackId="a" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
