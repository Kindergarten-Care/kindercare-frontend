import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ChartCard, SectionTitle } from '../styles';
import { mockAdmissionsData } from '../mockData';

const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export default function AdmissionsChart() {
  return (
    <ChartCard>
      <SectionTitle>Số lượng HS theo Khối</SectionTitle>
      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
          <BarChart data={mockAdmissionsData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={80} />
            <Tooltip />
            <Bar dataKey="students" radius={[0, 4, 4, 0]}>
              {mockAdmissionsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
