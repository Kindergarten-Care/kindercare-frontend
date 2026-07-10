import styled from 'styled-components';

export const TabbedContainer = styled.div`
  background-color: #FFFFFF;
  border-radius: 16px;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.04);
  border: 1px solid #F3F4F6;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const TabsHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #E5E7EB;
  background-color: #F9FAFB;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TabButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 20px 24px;
  font-size: 16px;
  font-weight: 600;
  color: ${({ $active }) => ($active ? '#2563EB' : '#6B7280')};
  background-color: ${({ $active }) => ($active ? '#FFFFFF' : 'transparent')};
  border: none;
  border-bottom: 2px solid ${({ $active }) => ($active ? '#2563EB' : 'transparent')};
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    color: ${({ $active }) => ($active ? '#2563EB' : '#374151')};
    background-color: ${({ $active }) => ($active ? '#FFFFFF' : '#F3F4F6')};
  }
`;

export const TabContentArea = styled.div`
  padding: 32px;
  flex: 1;
`;
