import React from 'react';
import { KPIGrid, KPICard, KPIValue, KPILabel, KPISubtext } from '../styles';
import { mockKPIData } from '../mockData';

export default function KPICards() {
  const cards = Object.values(mockKPIData);

  return (
    <KPIGrid>
      {cards.map((card, index) => (
        <KPICard key={index}>
          <KPIValue>{card.value}</KPIValue>
          <KPILabel>{card.label}</KPILabel>
          <KPISubtext>{card.subtext}</KPISubtext>
        </KPICard>
      ))}
    </KPIGrid>
  );
}
