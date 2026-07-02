import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { X, FileText, Pill, List, Calendar, Filter } from 'lucide-react';
import { TaskItem, TaskListWidget } from './TaskListWidget';

interface RequestListModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  type: 'leave' | 'medical' | 'all';
  tasks: TaskItem[];
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const popUp = keyframes`
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.2s ease;
  padding: 20px;
`;

const ModalBox = styled.div`
  background: #ffffff;
  width: 100%;
  max-width: 580px;
  max-height: 85vh;
  border-radius: 24px;
  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.18);
  overflow: hidden;
  animation: ${popUp} 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-bottom: 1px solid #F3F4F6;
  flex-shrink: 0;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const HeaderIconBox = styled.div<{ $type: 'leave' | 'medical' }>`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: ${props => props.$type === 'leave' ? '#7E22CE' : '#BE185D'};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: #111827;
`;

const Subtitle = styled.span`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
  margin-top: 2px;
`;

const CloseBtn = styled.button`
  background: #fff;
  border: 1px solid #E5E7EB;
  cursor: pointer;
  color: #6B7280;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 14px;
  transition: all 0.15s;

  &:hover {
    background: #F3F4F6;
    color: #1F2937;
  }
`;

const FilterSection = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px 32px;
  border-bottom: 1px solid #F3F4F6;
  background: #F9FAFB;
  flex-wrap: wrap;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #D1D5DB;
  font-size: 14px;
  color: #374151;
  background: #fff;
  outline: none;
  cursor: pointer;
  &:hover {
    border-color: #9CA3AF;
  }
`;

const Content = styled.div`
  padding: 24px 32px;
  overflow-y: auto;
  flex: 1;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #E5E7EB;
    border-radius: 4px;
  }
  
  /* Reset background border from TaskListWidget */
  & > section {
    border: none;
    box-shadow: none;
    padding: 0;
  }
  
  & > section > div:first-child {
    display: none; /* Ẩn cái HeaderRow mặc định của TaskListWidget đi */
  }
`;

export const RequestListModal: React.FC<RequestListModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  subtitle, 
  type, 
  tasks 
}) => {
  const [filterType, setFilterType] = useState<'all' | 'leave' | 'medical'>('all');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');

  // Reset filter when opened with a specific type
  React.useEffect(() => {
    if (isOpen) {
      setFilterType(type);
      setDateFilter('all');
    }
  }, [isOpen, type]);

  if (!isOpen) return null;

  // Compute filtered tasks
  const filteredTasks = tasks.filter(task => {
    if (type !== 'all') {
      if (type === 'leave' && task.tag !== 'Đơn phép') return false;
      if (type === 'medical' && task.tag !== 'Y tế') return false;
    } else {
      if (filterType === 'leave' && task.tag !== 'Đơn phép') return false;
      if (filterType === 'medical' && task.tag !== 'Y tế') return false;
    }

    // 2. Filter by Date
    if (dateFilter !== 'all' && task.createdAt) {
      const taskDate = new Date(task.createdAt);
      const today = new Date();
      
      if (dateFilter === 'today') {
        if (taskDate.toDateString() !== today.toDateString()) return false;
      } 
      else if (dateFilter === 'week') {
        const firstDay = new Date(today.setDate(today.getDate() - today.getDay() + 1));
        firstDay.setHours(0, 0, 0, 0);
        if (taskDate < firstDay) return false;
      }
      else if (dateFilter === 'month') {
        if (taskDate.getMonth() !== today.getMonth() || taskDate.getFullYear() !== today.getFullYear()) return false;
      }
    }
    
    return true;
  });

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={e => e.stopPropagation()}>
        <Header>
          <HeaderLeft>
            <HeaderIconBox $type={type === 'all' ? 'leave' : type} style={type === 'all' ? { background: '#2563EB' } : {}}>
              {type === 'all' ? <List size={22} strokeWidth={2.5} /> : (type === 'leave' ? <FileText size={22} strokeWidth={2.5} /> : <Pill size={22} strokeWidth={2.5} />)}
            </HeaderIconBox>
            <HeaderText>
              <Title>{title}</Title>
              <Subtitle>{subtitle} ({filteredTasks.length})</Subtitle>
            </HeaderText>
          </HeaderLeft>
          <CloseBtn onClick={onClose}>
            <X size={20} strokeWidth={2} />
          </CloseBtn>
        </Header>
        
        <FilterSection>
          {type === 'all' && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Filter size={16} color="#6B7280" />
                <span style={{ fontSize: '14px', color: '#4B5563', fontWeight: 500 }}>Lọc theo:</span>
              </div>
              
              <FilterSelect value={filterType} onChange={(e) => setFilterType(e.target.value as any)}>
                <option value="all">Tất cả loại đơn</option>
                <option value="leave">Đơn xin nghỉ</option>
                <option value="medical">Dặn dò y tế</option>
              </FilterSelect>
            </>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: type === 'all' ? '12px' : '0' }}>
            {type !== 'all' && <Filter size={16} color="#6B7280" />}
            <Calendar size={16} color="#6B7280" />
            {type !== 'all' && <span style={{ fontSize: '14px', color: '#4B5563', fontWeight: 500 }}>Lọc thời gian:</span>}
          </div>

          <FilterSelect value={dateFilter} onChange={(e) => setDateFilter(e.target.value as any)}>
            <option value="all">Mọi thời gian</option>
            <option value="today">Hôm nay</option>
            <option value="week">Tuần này</option>
            <option value="month">Tháng này</option>
          </FilterSelect>
        </FilterSection>

        <Content>
          {filteredTasks.length > 0 ? (
            <TaskListWidget tasks={filteredTasks} />
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#9CA3AF' }}>
              Không có đơn từ nào phù hợp với bộ lọc hiện tại.
            </div>
          )}
        </Content>
      </ModalBox>
    </Overlay>
  );
};
