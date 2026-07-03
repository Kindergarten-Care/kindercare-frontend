import React from 'react';
import styled from 'styled-components';
import { useTeacherWorkHistory } from '@/hooks/useTeacherQueries';
import { Award, Briefcase, GraduationCap, PlayCircle, Clock } from 'lucide-react';
import { WorkHistoryDomainModel } from '@/config/types/profile';

const TimelineContainer = styled.div`
  position: relative;
  padding-left: 20px;
  
  &::before {
    content: '';
    position: absolute;
    left: 27px;
    top: 20px;
    bottom: 20px;
    width: 2px;
    background-color: #e5e7eb;
  }
`;

const TimelineItem = styled.div`
  position: relative;
  padding-left: 40px;
  margin-bottom: 32px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TimelineIcon = styled.div<{ $kind: string }>`
  position: absolute;
  left: -20px;
  top: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${props => {
    switch (props.$kind) {
      case 'up': return '#d1fae5';
      case 'role': return '#dbeafe';
      case 'cert': return '#fef3c7';
      case 'start': return '#f3f4f6';
      default: return '#f3f4f6';
    }
  }};
  color: ${props => {
    switch (props.$kind) {
      case 'up': return '#059669';
      case 'role': return '#2563eb';
      case 'cert': return '#d97706';
      case 'start': return '#4b5563';
      default: return '#4b5563';
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid #fff;
  z-index: 1;
`;

const TimelineContent = styled.div`
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const TimelineHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const TimelineTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const TimelineDate = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #6b7280;
  white-space: nowrap;
`;

const TimelineTag = styled.span`
  display: inline-block;
  background-color: #f3f4f6;
  color: #4b5563;
  font-size: 12px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 4px;
  margin-bottom: 8px;
`;

const TimelineDesc = styled.p`
  font-size: 14px;
  color: #4b5563;
  margin: 0;
  line-height: 1.5;
`;

const EmptyState = styled.div`
  text-align: center;
  color: #6b7280;
  padding: 32px 0;
`;

const getIconForKind = (kind: string) => {
  switch (kind) {
    case 'up': return <Award size={18} />;
    case 'role': return <Briefcase size={18} />;
    case 'cert': return <GraduationCap size={18} />;
    case 'start': return <PlayCircle size={18} />;
    default: return <Award size={18} />;
  }
};

export const HistoryTab: React.FC = () => {
  const { data: historyList, isLoading } = useTeacherWorkHistory();

  if (isLoading) {
    return <TimelineContainer>Đang tải lịch sử công tác...</TimelineContainer>;
  }

  if (!historyList || historyList.length === 0) {
    return <EmptyState>Chưa có dữ liệu lịch sử công tác.</EmptyState>;
  }

  return (
    <TimelineContainer>
      {historyList.map((item: WorkHistoryDomainModel) => {
        // Format BigInt timestamp to Date string
        const dateObj = new Date(Number(item.eventDate) * 1000);
        const dateStr = dateObj.toLocaleDateString('vi-VN', {
          year: 'numeric',
          month: 'long',
        });

        return (
          <TimelineItem key={item.historyId}>
            <TimelineIcon $kind={item.kind}>
              {getIconForKind(item.kind)}
            </TimelineIcon>
            <TimelineContent>
              <TimelineHeader>
                <div>
                  <TimelineTitle>{item.title}</TimelineTitle>
                  <TimelineTag>{item.tag}</TimelineTag>
                </div>
                <TimelineDate>
                  <Clock size={14} />
                  {dateStr}
                </TimelineDate>
              </TimelineHeader>
              <TimelineDesc>{item.description}</TimelineDesc>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </TimelineContainer>
  );
};
