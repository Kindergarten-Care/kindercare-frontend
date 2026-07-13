'use client';

import React from 'react';
import { GradeDomainModel, ClassDomainModel } from '@/config/types/grade';
import {
  Sidebar,
  SidebarHeader,
  SidebarTitle,
  SidebarBody,
  GradeSection,
  GradeLabel,
  ClassItem,
} from '../styles';

interface ClassSidebarProps {
  grades: GradeDomainModel[];
  selectedClassId?: number;
  onSelectClass: (cls: ClassDomainModel) => void;
}

export default function ClassSidebar({ grades, selectedClassId, onSelectClass }: ClassSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarTitle>Danh sách Lớp học</SidebarTitle>
      </SidebarHeader>
      <SidebarBody>
        {grades.map(grade => (
          <GradeSection key={grade.gradeId}>
            <GradeLabel $muted>{grade.gradeName}</GradeLabel>
            {grade.classes.map(cls => (
              <ClassItem
                key={cls.classId}
                $active={selectedClassId === cls.classId}
                onClick={() => onSelectClass(cls)}
              >
                {cls.className} {cls.teacherCount !== undefined && `(${cls.teacherCount})`}
              </ClassItem>
            ))}
          </GradeSection>
        ))}
      </SidebarBody>
    </Sidebar>
  );
}
