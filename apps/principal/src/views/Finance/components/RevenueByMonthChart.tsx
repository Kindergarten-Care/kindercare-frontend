import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { InvoiceDto } from '@/config/types/finance';
import { ChartCard, SectionTitle } from '../styles';

interface Props {
  invoices: InvoiceDto[];
}

const formatVND = (n: number) => new Intl.NumberFormat('vi-VN').format(n);

function sortByMonthKey(a: string, b: string) {
  const [ma, ya] = a.split('-').map(Number);
  const [mb, yb] = b.split('-').map(Number);
  return ya === yb ? ma - mb : ya - yb;
}

export default function RevenueByMonthChart({ invoices }: Props) {
  const data = useMemo(() => {
    const map = new Map<string, { month: string; paid: number; unpaid: number }>();
    invoices.forEach(inv => {
      const key = inv.billingMonth || 'Khác';
      if (!map.has(key)) {
        map.set(key, { month: key, paid: 0, unpaid: 0 });
      }
      const entry = map.get(key)!;
      if (inv.paymentStatus === 'Paid') {
        entry.paid += inv.totalAmount;
      } else {
        entry.unpaid += inv.totalAmount;
      }
    });
    return Array.from(map.values()).sort((a, b) => sortByMonthKey(a.month, b.month));
  }, [invoices]);

  return (
    <ChartCard>
      <SectionTitle>Doanh thu theo tháng</SectionTitle>
      <div style={{ width: '100%', height: 260 }}>
        {data.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#9ca3af', paddingTop: 100 }}>Chưa có dữ liệu</div>
        ) : (
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => formatVND(v)} width={80} />
              <Tooltip formatter={(value) => `${formatVND(Number(value))} đ`} />
              <Legend />
              <Bar dataKey="paid" name="Đã thu" fill="#16a34a" radius={[4, 4, 0, 0]} />
              <Bar dataKey="unpaid" name="Chưa thu" fill="#f87171" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </ChartCard>
  );
}
