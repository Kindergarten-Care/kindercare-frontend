import React from 'react';
import styled from 'styled-components';
import { useTeacherClasses } from '@/hooks/useTeacherQueries';

const ClassGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
`;

const ClassCard = styled.div`
  background: linear-gradient(135deg, #34D399, #005A36);
  border-radius: 16px;
  padding: 24px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 140px;
  box-shadow: 0 4px 12px rgba(0, 90, 54, 0.15);
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    right: -20px;
    bottom: -20px;
    width: 120px;
    height: 120px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }
`;

const ClassName = styled.h3`
  font-size: 20px;
  font-weight: 800;
  margin: 0 0 4px 0;
  z-index: 1;
`;

const ClassCode = styled.span`
  font-size: 13px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 10px;
  border-radius: 8px;
  display: inline-block;
  margin-bottom: 12px;
  z-index: 1;
`;

const ClassStats = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 14px;
  font-weight: 600;
  z-index: 1;
`;

export const WorkTab: React.FC = () => {
  const { data: classList, isLoading } = useTeacherClasses();

  if (isLoading) return <div>Đang tải thông tin lớp học...</div>;
  if (!classList || classList.length === 0) return <div>Không có lớp học nào được phân công.</div>;

  return (
    <ClassGrid>
      {classList.map((c: any, i: number) => (
        <ClassCard key={i}>
          <div>
            <ClassCode>M{c.classId}</ClassCode>
            <ClassName>{c.className}</ClassName>
          </div>
          <ClassStats>
            <span>👥 {c.studentCount} học sinh</span>
            <span>🏫 {c.room || `Phòng học cơ sở`}</span>
          </ClassStats>
        </ClassCard>
      ))}
    </ClassGrid>
  );
};
