'use client';

import React, { useState } from 'react';
import { TabsContainer, TabItem } from './styles';

export interface Tab {
  id: string;
  label: string;
}

export interface SchoolYearTabsProps {
  tabs?: Tab[];
  activeTabId?: string;
  onChange?: (id: string) => void;
}

const defaultTabs: Tab[] = [
  { id: 'school-year', label: 'Niên khóa' },
  { id: 'buildings', label: 'Cơ sở & Tòa nhà' },
  { id: 'classes', label: 'Danh mục Khối/Lớp' }
];

export function SchoolYearTabs({ 
  tabs = defaultTabs,
  activeTabId = 'school-year',
  onChange
}: SchoolYearTabsProps): React.ReactElement {
  const [activeId, setActiveId] = useState(activeTabId);

  const handleTabClick = (id: string) => {
    setActiveId(id);
    if (onChange) onChange(id);
  };

  return (
    <TabsContainer>
      {tabs.map((tab) => (
        <TabItem 
          key={tab.id} 
          $active={activeId === tab.id}
          onClick={() => handleTabClick(tab.id)}
        >
          {tab.label}
        </TabItem>
      ))}
    </TabsContainer>
  );
}
