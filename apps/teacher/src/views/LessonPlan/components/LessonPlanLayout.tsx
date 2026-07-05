'use client';

import React, { useState } from 'react';
import { LessonPlanSidebar } from './LessonPlanSidebar';
import * as S from './LayoutStyles';

interface LessonPlanLayoutProps {
  children: React.ReactNode;
}

export const LessonPlanLayout: React.FC<LessonPlanLayoutProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <S.LayoutWrapper>
      <LessonPlanSidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={handleToggleCollapse}
      />
      <S.MainContent $collapsed={isCollapsed}>
        {children}
      </S.MainContent>
    </S.LayoutWrapper>
  );
};
