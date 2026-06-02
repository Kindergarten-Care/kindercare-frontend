import React from 'react';
import { Sidebar } from '@kindercare/ui';
import { TopAppBar } from '../../../../layout/TopAppBar';
import { SchoolYearView } from '../../../../views/SchoolYear/SchoolYearView';
import { SchoolYearService } from '../../../../services/SchoolYearService';

export default async function SchoolYearPage(): Promise<React.ReactElement> {
  const schoolYears = await SchoolYearService.getSchoolYears();

  return (
    <>
      <Sidebar activePath="/school-year" />
      <TopAppBar />
      <SchoolYearView schoolYears={schoolYears} />
    </>
  );
}
