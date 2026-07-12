import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { InvoiceDto } from '@/config/types/finance';
import { ChartCard, SectionTitle } from '../styles';

const STATUS_COLORS: Record<string, string> = {
  Paid: '#16a34a',
  Unpaid: '#f87171',
  Overdue: '#ef4444',
};

interface Props {
  invoices: InvoiceDto[];
}

export default function InvoiceStatusChart({ invoices }: Props) {
  const data = useMemo(() => {
    const counts = new Map<string, number>();
    invoices.forEach(inv => {
      counts.set(inv.paymentStatus, (counts.get(inv.paymentStatus) || 0) + 1);
    });
    return Array.from(counts.entries()).map(([name, value]) => ({
      name,
      value,
      color: STATUS_COLORS[name] || '#9ca3af',
    }));
  }, [invoices]);

  return (
    <ChartCard>
      <SectionTitle>Trạng thái hóa đơn</SectionTitle>
      <div style={{ width: '100%', height: 260 }}>
        {data.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#9ca3af', paddingTop: 100 }}>Chưa có dữ liệu</div>
        ) : (
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} hóa đơn`, name]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </ChartCard>
  );
}
