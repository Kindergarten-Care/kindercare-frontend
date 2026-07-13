import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { InvoiceDto } from '@/config/types/finance';
import { SectionTitle } from '../styles';
import {
  DonutCard, DonutSubtitle, DonutWrap, DonutCenter, DonutCenterValue, DonutCenterLabel,
  DonutLegend, DonutLegendItem, DonutLegendDot, DonutLegendText, DonutLegendAmount,
} from './RevenueStatusDonutChart.styles';

interface Props {
  invoices: InvoiceDto[];
}

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)} đ`;

function toNumber(value: unknown): number {
  const n = typeof value === 'number' ? value : parseFloat(String(value));
  return Number.isFinite(n) ? n : 0;
}

export default function RevenueStatusDonutChart({ invoices }: Props) {
  const { paidRevenue, unpaidRevenue, paidPercent, data } = useMemo(() => {
    let paid = 0;
    let unpaid = 0;
    invoices.forEach(inv => {
      const amount = toNumber(inv.totalAmount);
      if (inv.paymentStatus === 'Paid') paid += amount;
      else unpaid += amount;
    });
    const total = paid + unpaid;
    const percent = total > 0 ? Math.round((paid / total) * 100) : 0;
    return {
      paidRevenue: paid,
      unpaidRevenue: unpaid,
      paidPercent: percent,
      data: [
        { name: 'Đã thu', value: paid, color: '#16a34a' },
        { name: 'Chưa thu', value: unpaid, color: '#f87171' },
      ].filter(d => d.value > 0),
    };
  }, [invoices]);

  return (
    <DonutCard>
      <SectionTitle style={{ marginBottom: 4 }}>Trạng thái hóa đơn</SectionTitle>
      <DonutSubtitle>Tỷ lệ đã thu trên tổng giá trị hóa đơn</DonutSubtitle>

      <DonutWrap>
        {data.length === 0 ? (
          <DonutCenter style={{ position: 'static' }}>
            <DonutCenterLabel>Chưa có dữ liệu</DonutCenterLabel>
          </DonutCenter>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={62}
                  outerRadius={82}
                  paddingAngle={data.length > 1 ? 3 : 0}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <DonutCenter>
              <DonutCenterValue>{paidPercent}%</DonutCenterValue>
              <DonutCenterLabel>đã thu</DonutCenterLabel>
            </DonutCenter>
          </>
        )}
      </DonutWrap>

      <DonutLegend>
        <DonutLegendItem>
          <DonutLegendDot $color="#16a34a" />
          <DonutLegendText>Đã thu</DonutLegendText>
          <DonutLegendAmount>{formatVND(paidRevenue)}</DonutLegendAmount>
        </DonutLegendItem>
        <DonutLegendItem>
          <DonutLegendDot $color="#f87171" />
          <DonutLegendText>Chưa thu</DonutLegendText>
          <DonutLegendAmount>{formatVND(unpaidRevenue)}</DonutLegendAmount>
        </DonutLegendItem>
      </DonutLegend>
    </DonutCard>
  );
}
