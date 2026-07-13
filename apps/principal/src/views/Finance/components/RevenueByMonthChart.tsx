import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { InvoiceDto } from '@/config/types/finance';
import { ChartCard, SectionTitle } from '../styles';
import { ChartSubtitle } from './RevenueByMonthChart.styles';

interface Props {
  invoices: InvoiceDto[];
  monthsToShow?: number;
}

const formatVND = (n: number) => new Intl.NumberFormat('vi-VN').format(n);

function toNumber(value: unknown): number {
  const n = typeof value === 'number' ? value : parseFloat(String(value));
  return Number.isFinite(n) ? n : 0;
}

function monthKeyToSortValue(key: string): number {
  const [m, y] = key.split('-').map(Number);
  return y * 12 + m;
}

export default function RevenueByMonthChart({ invoices, monthsToShow = 6 }: Props) {
  const data = useMemo(() => {
    const map = new Map<string, { month: string; paid: number; unpaid: number }>();
    invoices.forEach(inv => {
      const key = inv.billingMonth || 'Khác';
      if (!map.has(key)) {
        map.set(key, { month: key, paid: 0, unpaid: 0 });
      }
      const entry = map.get(key)!;
      const amount = toNumber(inv.totalAmount);
      if (inv.paymentStatus === 'Paid') {
        entry.paid += amount;
      } else {
        entry.unpaid += amount;
      }
    });
    return Array.from(map.values())
      .sort((a, b) => monthKeyToSortValue(a.month) - monthKeyToSortValue(b.month))
      .slice(-monthsToShow);
  }, [invoices, monthsToShow]);

  return (
    <ChartCard>
      <SectionTitle style={{ marginBottom: 4 }}>Doanh thu theo tháng</SectionTitle>
      <ChartSubtitle>Đã thu &amp; còn phải thu {monthsToShow} tháng gần nhất (triệu đồng)</ChartSubtitle>
      <div style={{ width: '100%', height: 240 }}>
        {data.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#9ca3af', paddingTop: 100 }}>Chưa có dữ liệu</div>
        ) : (
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => formatVND(Number(v) / 1_000_000)} width={40} />
              <Tooltip formatter={(value) => `${formatVND(Number(value))} đ`} />
              <Legend />
              <Bar dataKey="paid" name="Đã thu" stackId="revenue" fill="#16a34a" radius={[0, 0, 0, 0]} />
              <Bar dataKey="unpaid" name="Chưa thu" stackId="revenue" fill="#fca5a5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </ChartCard>
  );
}
