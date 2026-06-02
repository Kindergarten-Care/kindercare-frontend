'use client';

import React, { useState } from 'react';
import {
  PageWrapper,
  MainContent,
  PageHeader,
  PageTitle,
  TabSection,
  ActionButton,
  ContentGrid
} from './styles';
import { PlusIcon } from '@kindercare/ui';
import { SchoolYearTabs } from './components/SchoolYearTabs';
import { SchoolYearCard } from './components/SchoolYearCard';
import { CreateYearCard } from './components/CreateYearCard';
import { FacilityTab } from './components/FacilityTab';
import { ClassCategoryTab } from './components/ClassCategoryTab';
import { SchoolYearModel } from '../../config/types/schoolYear';

interface SchoolYearViewProps {
  schoolYears: SchoolYearModel[];
}

export const SchoolYearView: React.FC<SchoolYearViewProps> = ({ schoolYears }) => {
  const [activeTab, setActiveTab] = useState('school-year');

  return (
    <PageWrapper>
      <MainContent>
        <PageHeader>
          <PageTitle>Quản lý Cơ sở dữ liệu Trường học</PageTitle>
          <TabSection>
            <SchoolYearTabs activeTabId={activeTab} onChange={setActiveTab} />
            {activeTab === 'school-year' && (
              <ActionButton>
                <PlusIcon size={16} /> Thêm Niên khóa
              </ActionButton>
            )}
            {activeTab === 'classes' && (
              <ActionButton>
                <PlusIcon size={16} /> Thêm Khối/Lớp
              </ActionButton>
            )}
            {activeTab === 'buildings' && (
              <ActionButton>
                <PlusIcon size={16} /> Thêm Cơ sở
              </ActionButton>
            )}
          </TabSection>
        </PageHeader>

        {activeTab === 'school-year' && (
          <ContentGrid>
            {schoolYears.map((year) => (
              <SchoolYearCard
                key={year.id}
                {...year}
                onEdit={(id) => console.log('Edit', id)}
                onSettings={(id) => console.log('Settings', id)}
                onViewDetails={(id) => console.log('View', id)}
              />
            ))}
            <CreateYearCard onClick={() => console.log('Create new year')} />
          </ContentGrid>
        )}

        {activeTab === 'buildings' && <FacilityTab />}
        {activeTab === 'classes' && <ClassCategoryTab />}
      </MainContent>
    </PageWrapper>
  );
};
