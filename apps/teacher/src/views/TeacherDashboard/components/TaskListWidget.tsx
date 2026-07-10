import React from 'react';
import styled from 'styled-components';

export interface TaskItem {
  id: string;
  name: string;
  initial: string;
  color: string;
  tag: string;
  tagStyle?: React.CSSProperties;
  sub: string;
  btn: string;
  btnColor: string;
  btnBorder: string;
  action: (e: React.MouseEvent) => void;
  onRowClick?: () => void;
  rowStyle?: React.CSSProperties;
  createdAt?: number;
  avatarUrl?: string;
}

interface TaskListProps {
  tasks: TaskItem[];
  onViewAll?: () => void;
}

const Section = styled.section`
  background: #fff;
  border: 1px solid #E6EEE9;
  border-radius: 22px;
  box-shadow: 0 8px 30px -16px rgba(0, 90, 54, 0.16);
  padding: 20px;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`;

const Title = styled.span`
  font-size: 17px;
  font-weight: 800;
  letter-spacing: -.01em;
  color: #1F2937;
`;

const ViewAllLink = styled.button`
  font-size: 12.5px;
  font-weight: 700;
  color: #005A36;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    text-decoration: underline;
  }
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TaskRow = styled.div<{ $clickable?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};
  transition: background 0.15s;
  padding: 4px;
  margin: -4px;
  border-radius: 12px;
  
  &:hover {
    background: ${props => props.$clickable ? '#F3F4F6' : 'transparent'};
  }
`;

const Avatar = styled.span<{ $bg: string; $imgUrl?: string }>`
  flex: none;
  width: 42px;
  height: 42px;
  border-radius: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 15px;
  color: ${props => props.$imgUrl ? 'transparent' : '#374151'};
  background: ${props => props.$imgUrl ? `url(${props.$imgUrl}) center/cover no-repeat` : props.$bg};
`;

const InfoCol = styled.div`
  flex: 1;
  min-width: 0;
`;

const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const TaskName = styled.span`
  font-weight: 700;
  font-size: 13.5px;
  color: #1F2937;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TaskSub = styled.div`
  font-size: 11.5px;
  color: #9CA3AF;
  font-weight: 500;
  margin-top: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TagBadge = styled.span`
  white-space: nowrap;
  flex-shrink: 0;
`;

const ActionBtn = styled.button<{ $color: string; $border: string }>`
  flex: none;
  height: 32px;
  padding: 0 13px;
  border-radius: 10px;
  border: 1px solid ${props => props.$border};
  background: #fff;
  color: ${props => props.$color};
  font-family: inherit;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #005A36 !important;
    color: #fff !important;
    border-color: #005A36 !important;
  }
`;

const EmptyState = styled.div`
  padding: 18px;
  border-radius: 14px;
  background: #E6F3ED;
  border: 1px dashed #C7E3D5;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: #005A36;
`;

export const TaskListWidget: React.FC<TaskListProps> = ({ tasks, onViewAll }) => {
  if (!tasks || tasks.length === 0) return null;

  return (
    <Section>
      <HeaderRow>
        <Title>Đơn cần xử lý</Title>
        {onViewAll && <ViewAllLink onClick={onViewAll}>Xem tất cả</ViewAllLink>}
      </HeaderRow>
      <TaskList>
        {tasks.map(task => (
          <TaskRow 
            key={task.id} 
            $clickable={!!task.onRowClick}
            onClick={() => task.onRowClick && task.onRowClick()}
            style={task.rowStyle}
          >
            <Avatar $bg={task.color} $imgUrl={task.avatarUrl}>
              {!task.avatarUrl && task.initial}
            </Avatar>
            <InfoCol>
              <NameRow>
                <TaskName>{task.name}</TaskName>
                <TagBadge style={task.tagStyle}>{task.tag}</TagBadge>
              </NameRow>
              <TaskSub>{task.sub}</TaskSub>
            </InfoCol>
            <ActionBtn 
              $color={task.btnColor} 
              $border={task.btnBorder} 
              onClick={(e) => {
                e.stopPropagation();
                task.action(e);
              }}
            >
              {task.btn}
            </ActionBtn>
          </TaskRow>
        ))}
        {tasks.length === 0 && (
          <EmptyState>
            ✅ Đã xử lý hết việc hôm nay!
          </EmptyState>
        )}
      </TaskList>
    </Section>
  );
};
