'use client';

import React from 'react';
import { OverviewContainer, ChartsGrid } from './styles';
import KPICards from './components/KPICards';
import FinancialChart from './components/FinancialChart';
import HRChart from './components/HRChart';
import AdmissionsChart from './components/AdmissionsChart';
import ActionableInsights from './components/ActionableInsights';

export default function OverviewView() {
  return (
    <OverviewContainer>
      <KPICards />
      
      <ChartsGrid>
        <FinancialChart />
        <HRChart />
        <AdmissionsChart />
      </ChartsGrid>

      <ActionableInsights />
    </OverviewContainer>
  );
}
